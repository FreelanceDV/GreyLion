import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url') || 'https://www.marinetraffic.com/en/ais/home/centerx:-31.2/centery:9.3/zoom:3';

    // Fetch the headers of the target URL to check for X-Frame-Options or CSP frame-ancestors
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 } // Cache results for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, canEmbed: false });
    }

    const xFrameOptions = response.headers.get('x-frame-options');
    const csp = response.headers.get('content-security-policy') || '';
    
    // If x-frame-options is DENY or SAMEORIGIN, it cannot be embedded.
    // Also check if Content-Security-Policy has frame-ancestors.
    const isDenied = xFrameOptions && (
      xFrameOptions.toLowerCase() === 'deny' || 
      xFrameOptions.toLowerCase() === 'sameorigin'
    );
    const isCspRestricted = csp.toLowerCase().includes('frame-ancestors');

    const canEmbed = !isDenied && !isCspRestricted;

    return NextResponse.json({
      success: true,
      canEmbed,
      xFrameOptions,
      csp: csp ? 'present' : 'none'
    });
  } catch (error: any) {
    console.error('Error checking embed support:', error);
    return NextResponse.json({ success: false, canEmbed: false, error: error.message }, { status: 500 });
  }
}
