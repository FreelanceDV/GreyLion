import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { put, del } from '@vercel/blob';

const execPromise = promisify(exec);

const BASE_NAMES: Record<string, string> = {
  hero_ship: 'hero_ship_oceanis',
  maritime_transport: 'maritime_transport_card',
  integral_logistics: 'integral_logistics_card',
  background_video: 'charger_boat',
};

const MIME_MAP: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'video/mp4': '.mp4',
  'video/quicktime': '.mov',
  'video/webm': '.webm',
  'video/ogg': '.ogg',
};

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'greylion2026';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = formData.get('password') as string;
    const assetId = formData.get('assetId') as string;
    const file = formData.get('file') as File | null;
    const urlInput = formData.get('url') as string | null;

    // 1. Authenticate Request
    if (!password || password !== DEFAULT_PASSWORD) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // 2. Validate assetId
    const baseName = BASE_NAMES[assetId];
    if (!baseName) {
      return NextResponse.json({ error: 'ID de recurso no válido' }, { status: 400 });
    }

    if (!file && !urlInput) {
      return NextResponse.json({ error: 'Debe proporcionar un archivo local o un enlace URL' }, { status: 400 });
    }

    const publicDir = path.join(process.cwd(), 'public');
    const configPath = path.join(publicDir, 'media_config.json');

    // Load existing config
    let config: Record<string, string> = {};
    try {
      const configData = await fs.promises.readFile(configPath, 'utf8');
      config = JSON.parse(configData);
    } catch (err) {
      config = {
        hero_ship: '/hero_ship_oceanis.jpg',
        maritime_transport: '/maritime_transport_card.jpg',
        integral_logistics: '/integral_logistics_card.jpg',
        background_video: '/charger_boat.mp4',
      };
    }

    const oldUrl = config[assetId];
    let oldFilename = '';
    if (oldUrl && !oldUrl.startsWith('http') && oldUrl.startsWith('/')) {
      oldFilename = oldUrl.replace(/^\//, '');
    }

    let newFilename = '';
    let buffer: Buffer | null = null;
    let finalPathValue = '';

    if (file) {
      // Handle file upload
      const mimeType = file.type || '';
      const ext = MIME_MAP[mimeType] || path.extname(file.name) || '.jpg';
      newFilename = `${baseName}${ext}`;
      buffer = Buffer.from(await file.arrayBuffer());
      finalPathValue = `/${newFilename}`;

      // Delete old file locally if different
      if (oldFilename && oldFilename !== newFilename) {
        const oldFilePath = path.join(publicDir, oldFilename);
        if (fs.existsSync(oldFilePath)) {
          try {
            await fs.promises.unlink(oldFilePath);
            console.log(`Deleted old asset file: ${oldFilePath}`);
          } catch (e: any) {
            console.error('Failed to delete old file locally:', e.message);
          }
        }
      }

      // Write new file locally
      const filePath = path.join(publicDir, newFilename);
      try {
        await fs.promises.writeFile(filePath, buffer);
        console.log(`Saved file locally to: ${filePath}`);
      } catch (err: any) {
        console.error('Failed to write local file (read-only filesystem likely):', err.message);
      }
    } else if (urlInput) {
      // Handle direct URL reference
      finalPathValue = urlInput.trim();

      // Delete old local file if switching from local file to external URL
      if (oldFilename) {
        const oldFilePath = path.join(publicDir, oldFilename);
        if (fs.existsSync(oldFilePath)) {
          try {
            await fs.promises.unlink(oldFilePath);
            console.log(`Deleted old file after switching to URL: ${oldFilePath}`);
          } catch (e: any) {
            console.error('Failed to delete old file locally:', e.message);
          }
        }
      }
    }

    // Update config entry and write locally
    config[assetId] = finalPathValue;
    const updatedConfigContent = JSON.stringify(config, null, 2);
    try {
      await fs.promises.writeFile(configPath, updatedConfigContent);
      console.log('Updated media_config.json locally');
    } catch (err: any) {
      console.error('Failed to write config locally:', err.message);
    }

    // 5. Git/Vercel Blob Synchronization
    const isDev = process.env.NODE_ENV === 'development';
    const isBlobActive = !!process.env.BLOB_READ_WRITE_TOKEN;
    const ghToken = process.env.GITHUB_TOKEN;
    const ghRepo = process.env.GITHUB_REPOSITORY; // owner/repo
    const ghBranch = process.env.GITHUB_BRANCH || 'master';

    let syncStatus = 'No sync triggered';

    if (isBlobActive) {
      // Vercel Blob Instant Sync (No Git commits, no Vercel rebuilds!)
      try {
        // A. Delete the old Vercel Blob file if it has changed (e.g. extension changed or overwritten)
        if (oldUrl && oldUrl.startsWith('http') && oldUrl !== finalPathValue) {
          if (oldUrl.includes('public.blob.vercel-storage.com')) {
            try {
              const oldUrlClean = oldUrl.split('?')[0];
              await del(oldUrlClean);
              console.log(`Deleted old Vercel Blob file: ${oldUrlClean}`);
            } catch (delErr: any) {
              console.error('Failed to delete old Vercel Blob file:', delErr.message);
            }
          }
        }

        // B. Upload updated media_config.json
        await put('media_config.json', updatedConfigContent, {
          access: 'public',
          addRandomSuffix: false,
          contentType: 'application/json',
          cacheControlMaxAge: 0,
        });
        syncStatus = 'Actualizado instantáneamente en la nube Vercel Blob (sin redespliegue).';
      } catch (blobErr: any) {
        console.error('Vercel Blob config upload failed:', blobErr.message);
        syncStatus = `Error al guardar configuración en Vercel Blob: ${blobErr.message}`;
      }
    } else if (isDev) {
      // Local Git Flow
      try {
        const gitStatus = await execPromise('git rev-parse --is-inside-work-tree');
        if (gitStatus.stdout.trim() === 'true') {
          const branchResult = await execPromise('git rev-parse --abbrev-ref HEAD');
          const currentBranch = branchResult.stdout.trim();
          
          await execPromise('git add public/');
          await execPromise(`git commit -m "chore: update media asset '${assetId}' to ${file ? 'uploaded file' : 'external URL'}"`);
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
        const configFilePath = 'public/media_config.json';
        const base64ConfigContent = Buffer.from(updatedConfigContent).toString('base64');

        // Helper to commit a file to Github API
        const commitToGithub = async (repoPath: string, contentBase64: string, message: string) => {
          let sha: string | undefined;
          const getUrl = `https://api.github.com/repos/${ghRepo}/contents/${repoPath}?ref=${ghBranch}`;
          const getRes = await fetch(getUrl, {
            headers: {
              Authorization: `token ${ghToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          });

          if (getRes.ok) {
            const data = await getRes.json();
            sha = data.sha;
          }

          const putUrl = `https://api.github.com/repos/${ghRepo}/contents/${repoPath}`;
          const putRes = await fetch(putUrl, {
            method: 'PUT',
            headers: {
              Authorization: `token ${ghToken}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message,
              content: contentBase64,
              branch: ghBranch,
              ...(sha ? { sha } : {}),
            }),
          });

          if (!putRes.ok) {
            const errText = await putRes.text();
            throw new Error(`GitHub PUT error for ${repoPath}: ${putRes.status} - ${errText}`);
          }
        };

        // A. If a file was uploaded, commit the new file first
        if (file && buffer && newFilename) {
          const newFilePath = `public/${newFilename}`;
          const base64Content = buffer.toString('base64');
          await commitToGithub(
            newFilePath,
            base64Content,
            `chore: upload media file for '${assetId}'`
          );
        }

        // B. Commit updated config JSON mapping
        await commitToGithub(
          configFilePath,
          base64ConfigContent,
          `chore: update media config path for '${assetId}'`
        );

        // C. Clean up old local file on GitHub repository if name changed or switched to external URL
        const oldFileNeedsDeletion = oldFilename && (file ? oldFilename !== newFilename : true);
        if (oldFileNeedsDeletion) {
          try {
            const oldFilePath = `public/${oldFilename}`;
            let oldSha: string | undefined;
            const getOldUrl = `https://api.github.com/repos/${ghRepo}/contents/${oldFilePath}?ref=${ghBranch}`;
            const getOldRes = await fetch(getOldUrl, {
              headers: {
                Authorization: `token ${ghToken}`,
                Accept: 'application/vnd.github.v3+json',
              },
            });

            if (getOldRes.ok) {
              const data = await getOldRes.json();
              oldSha = data.sha;
              
              if (oldSha) {
                const deleteUrl = `https://api.github.com/repos/${ghRepo}/contents/${oldFilePath}`;
                await fetch(deleteUrl, {
                  method: 'DELETE',
                  headers: {
                    Authorization: `token ${ghToken}`,
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    message: `chore: delete old file ${oldFilename} after reference change`,
                    sha: oldSha,
                    branch: ghBranch,
                  }),
                });
                console.log(`Deleted old file from Git: ${oldFilename}`);
              }
            }
          } catch (delErr: any) {
            console.error('Failed to delete old file from Git:', delErr.message);
          }
        }

        syncStatus = `Configuration updated on GitHub '${ghRepo}' (branch: '${ghBranch}'). Vercel build triggered!`;
      } catch (ghErr: any) {
        console.error('GitHub API Sync Error:', ghErr.message);
        syncStatus = `GitHub API sync failed: ${ghErr.message}`;
      }
    } else {
      syncStatus = 'Saved locally. (Configure GITHUB_TOKEN & GITHUB_REPOSITORY for automatic cloud git-commit on Vercel)';
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
