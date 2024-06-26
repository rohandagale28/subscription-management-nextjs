import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup' || path === '/';

    const token = request.cookies.get('__Secure-next-auth.session-token')?.value;

    // If user is authenticated and tries to access public paths, redirect to /dashboard
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    // If user is not authenticated and tries to access protected paths, redirect to /login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // Continue with the request if no redirection is needed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/dashboard'
    ]
};