import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const IGNORED_PATHS = [
  'node_modules',
  '.next',
  'api',
  'admin', // Ignore admin panel files so we don't scan their own source
];

// Recursive helper to list all TSX/TS/JSX/JS files in a directory
async function scanDirectory(dir: string): Promise<string[]> {
  let results: string[] = [];
  const list = await fs.promises.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.stat(filePath);
    if (stat && stat.isDirectory()) {
      if (IGNORED_PATHS.some(p => filePath.includes(path.sep + p + path.sep) || filePath.endsWith(path.sep + p))) {
        continue;
      }
      results = results.concat(await scanDirectory(filePath));
    } else {
      const ext = path.extname(filePath);
      if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

export async function GET(req: NextRequest) {
  try {
    const srcDir = path.join(process.cwd(), 'src');
    const files = await scanDirectory(srcDir);
    
    // Regex to find string literals starting with / and ending with image/video extensions
    const mediaRegex = /['"](\/[a-zA-Z0-9_\-\/]+\.(?:png|jpg|jpeg|gif|svg|mp4|webm|mov|ogg))['"]/g;
    
    // Regex to find DynamicMedia assetId references, e.g. assetId="hero_ship"
    const assetIdRegex = /assetId=['"]([a-zA-Z0-9_\-]+)['"]/g;

    const detectedAssets: Array<{
      filePath: string;
      relativePath: string;
      originalPath: string;
      type: 'image' | 'video';
      line: number;
      context: string;
      isAssetId?: boolean;
    }> = [];

    // Set to avoid duplicates within the same line of the same file
    const seen = new Set<string>();

    for (const file of files) {
      const content = await fs.promises.readFile(file, 'utf8');
      const lines = content.split('\n');
      const relativePath = path.relative(process.cwd(), file).replace(/\\/g, '/');

      lines.forEach((lineText, index) => {
        const lineNum = index + 1;
        
        // 1. Scan for hardcoded file paths
        let match;
        mediaRegex.lastIndex = 0;
        while ((match = mediaRegex.exec(lineText)) !== null) {
          const originalPath = match[1];
          // Skip favicon, local PDF certs or similar system assets if any
          if (originalPath.endsWith('.pdf') || originalPath.includes('favicon.ico')) {
            continue;
          }
          
          const uniqueKey = `${relativePath}:${lineNum}:${originalPath}`;
          if (!seen.has(uniqueKey)) {
            seen.add(uniqueKey);
            const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(originalPath);
            detectedAssets.push({
              filePath: file.replace(/\\/g, '/'),
              relativePath,
              originalPath,
              type: isVideo ? 'video' : 'image',
              line: lineNum,
              context: lineText.trim(),
            });
          }
        }

        // 2. Scan for DynamicMedia assetId properties
        let idMatch;
        assetIdRegex.lastIndex = 0;
        while ((idMatch = assetIdRegex.exec(lineText)) !== null) {
          const assetId = idMatch[1];
          const uniqueKey = `${relativePath}:${lineNum}:${assetId}`;
          if (!seen.has(uniqueKey)) {
            seen.add(uniqueKey);
            
            // Map assetId to its default type if possible, or guess based on ID name
            const isVideo = /bg_|video/i.test(assetId);
            detectedAssets.push({
              filePath: file.replace(/\\/g, '/'),
              relativePath,
              originalPath: assetId,
              type: isVideo ? 'video' : 'image',
              line: lineNum,
              context: lineText.trim(),
              isAssetId: true,
            });
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      assets: detectedAssets,
    });
  } catch (error: any) {
    console.error('Error scanning codebase:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Error al escanear el código fuente',
    }, { status: 500 });
  }
}
