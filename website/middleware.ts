import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // Public routes
    const publicRoutes = [
        '/',
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/verify-email',
        '/waitlist',
        '/dashboard',
    ];

    // Public API routes
    const publicApiRoutes = [
        '/api/auth/login',
        '/api/auth/signup',
        '/api/auth/forgot-password',
        '/api/auth/reset-password',
        '/api/auth/verify-email',
    ];

    // Check if path is public
    const isPublicRoute =
        publicRoutes.includes(pathname) ||
        publicApiRoutes.some(route => pathname.startsWith(route));

    // Redirect to login if protected route and no token
    if (!isPublicRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect logged-in users away from auth pages
    if (token && ['/login', '/signup', '/forgot-password'].includes(pathname)) {
        try {
            jwt.verify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } catch (error) {
            // Invalid token — allow access to auth page
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Run middleware for all routes except static assets
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};
