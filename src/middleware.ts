import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to handle geo-blocking

export function middleware(request: NextRequest) {
    // Get country from Netlify (x-nf-country-code) or Vercel (x-vercel-ip-country) headers
    // We removed request.geo as it causes TS errors and isn't supported on Netlify
    const country = request.headers.get('x-nf-country-code') ||
        request.headers.get('x-vercel-ip-country');

    // Block traffic from: Russia, China, Brazil, Germany, Vietnam, Pakistan, Turkey, Indonesia
    const BLOCKED_COUNTRIES = ['RU', 'CN', 'BR', 'DE', 'VN', 'PK', 'TR', 'ID'];

    if (country && BLOCKED_COUNTRIES.includes(country)) {
        return new NextResponse('Access Denied', { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    // Apply to all routes
    matcher: '/:path*',
};
