import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Parse the clientPayload to verify the password securely on the server
        let payload: { password?: string } = {};
        try {
          payload = JSON.parse(clientPayload || '{}');
        } catch (e) {
          throw new Error('Formato de payload de cliente no válido');
        }

        const { password } = payload;
        const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'greylion2026';

        if (!password || password !== DEFAULT_PASSWORD) {
          throw new Error('Contraseña de administrador incorrecta. Autorización denegada.');
        }

        // Return configuration for the client-side direct upload
        return {
          allowedContentTypes: [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'video/mp4', 'video/quicktime', 'video/webm', 'video/ogg'
          ],
          addRandomSuffix: false, // Prevent adding random hash suffix to filename
          tokenPayload: JSON.stringify({
            authorized: true,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This is executed after the file successfully arrives in Vercel Blob
        console.log('Blob upload completed successfully:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Vercel Blob token error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
