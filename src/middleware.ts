import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to handle geo-blocking

export function middleware(request: NextRequest) {
    // Get country from Netlify (x-nf-country-code) or Vercel (x-vercel-ip-country) headers
    // We removed request.geo as it causes TS errors and isn't supported on Netlify
    const countryHeader = request.headers.get('x-nf-country-code') || request.headers.get('x-vercel-ip-country');
    const country = countryHeader?.toUpperCase();

    // Block traffic from: Russia, China, Brazil, Germany, Vietnam, Pakistan, Turkey, Indonesia
    const BLOCKED_COUNTRIES = ['RU', 'CN', 'BR', 'DE', 'VN', 'PK', 'TR', 'ID'];

    if (country && BLOCKED_COUNTRIES.includes(country)) {
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        console.log(`[Middleware] BLOCKED: Country: ${country}, IP: ${ip}, Path: ${request.nextUrl.pathname}`);

        const response = new NextResponse('Access Denied', { status: 403 });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    // Apply to all routes
    matcher: '/:path*',
};
