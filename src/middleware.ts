import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get country from Next.js legacy geo object or Netlify/Vercel headers
    const country = request.geo?.country ||
        request.headers.get('x-vercel-ip-country') ||
        request.headers.get('x-nf-country-code');

    // Block traffic from China (CN)
    if (country === 'CN') {
        return new NextResponse('Access Denied', { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    // Apply to all routes
    matcher: '/:path*',
};
