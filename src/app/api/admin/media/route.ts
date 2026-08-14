import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Map asset IDs to actual public file paths
const ASSET_MAP: Record<string, string> = {
  hero_ship: 'hero_ship_oceanis.jpg',
  maritime_transport: 'maritime_transport_card.jpg',
  integral_logistics: 'integral_logistics_card.jpg',
  background_video: 'charger_boat.mp4',
};

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'greylion2026';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = formData.get('password') as string;
    const assetId = formData.get('assetId') as string;
    const file = formData.get('file') as File | null;

    // 1. Authenticate Request
    if (!password || password !== DEFAULT_PASSWORD) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // 2. Validate assetId
    const filename = ASSET_MAP[assetId];
    if (!filename) {
      return NextResponse.json({ error: 'ID de recurso no válido' }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No se ha subido ningún archivo' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 3. Write locally (always do this if filesystem is writable)
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, filename);

    try {
      await fs.promises.writeFile(filePath, buffer);
      console.log(`Saved file locally to: ${filePath}`);
    } catch (err: any) {
      console.error('Failed to write local file (read-only filesystem likely):', err.message);
    }

    // 4. Git Push Sincronización
    const isDev = process.env.NODE_ENV === 'development';
    
    // Check if GitHub API variables are configured (for serverless/Vercel environments)
    const ghToken = process.env.GITHUB_TOKEN;
    const ghRepo = process.env.GITHUB_REPOSITORY; // format: owner/repo
    const ghBranch = process.env.GITHUB_BRANCH || 'master';

    let syncStatus = 'No git sync triggered';

    if (isDev) {
      // Local Git Flow
      try {
        // Find if git is initialized
        const gitStatus = await execPromise('git rev-parse --is-inside-work-tree');
        if (gitStatus.stdout.trim() === 'true') {
          // Determine current branch
          const branchResult = await execPromise('git rev-parse --abbrev-ref HEAD');
          const currentBranch = branchResult.stdout.trim();
          
          await execPromise('git add public/');
          await execPromise(`git commit -m "chore: update media asset '${assetId}' from admin panel"`);
          await execPromise(`git push origin ${currentBranch}`);
          
          syncStatus = `Commited and pushed locally to branch '${currentBranch}'`;
        }
      } catch (gitErr: any) {
        console.error('Local Git Sync Error:', gitErr.message);
        syncStatus = `Local Git failed: ${gitErr.message}`;
      }
    } else if (ghToken && ghRepo) {
      // Production Vercel Flow using GitHub REST API
      try {
        const repoPath = `public/${filename}`;
        const base64Content = buffer.toString('base64');
        
        // A. Fetch current file SHA if it exists (required by Github API to update)
        let sha: string | undefined;
        const getShaUrl = `https://api.github.com/repos/${ghRepo}/contents/${repoPath}?ref=${ghBranch}`;
        
        const getRes = await fetch(getShaUrl, {
          headers: {
            Authorization: `token ${ghToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (getRes.ok) {
          const data = await getRes.json();
          sha = data.sha;
        }

        // B. Put the file content
        const putUrl = `https://api.github.com/repos/${ghRepo}/contents/${repoPath}`;
        const putBody = {
          message: `chore: update media asset '${assetId}' from admin panel`,
          content: base64Content,
          branch: ghBranch,
          ...(sha ? { sha } : {}),
        };

        const putRes = await fetch(putUrl, {
          method: 'PUT',
          headers: {
            Authorization: `token ${ghToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(putBody),
        });

        if (!putRes.ok) {
          const errText = await putRes.text();
          throw new Error(`GitHub API error: ${putRes.status} - ${errText}`);
        }

        syncStatus = `Updated directly on GitHub repository '${ghRepo}' on branch '${ghBranch}' via API. Vercel deployment triggered!`;
      } catch (ghErr: any) {
        console.error('GitHub API Sync Error:', ghErr.message);
        syncStatus = `GitHub API sync failed: ${ghErr.message}`;
      }
    } else {
      syncStatus = 'File saved locally. (Configure GITHUB_TOKEN and GITHUB_REPOSITORY for automatic cloud git-commit on Vercel)';
    }

    return NextResponse.json({
      success: true,
      message: 'Recurso actualizado con éxito',
      syncStatus,
    });
  } catch (error: any) {
    console.error('Media upload API error:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}
