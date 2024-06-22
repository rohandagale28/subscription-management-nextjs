import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === '/login' || path === '/signup' || path === '/';

    // Get the token from cookies
    const token = request.cookies.get('next-auth.session-token')?.value
    // If the user is trying to access a public path and they are authenticated, redirect to the dashboard
    if (isPublicPath && token) {
        return NextResponse.redirect('/dashboard');
    }

    // If the user is trying to access a protected path and they are not authenticated, redirect to the login page
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If none of the conditions match, allow the request to proceed
    return NextResponse.next();
}

// Define the paths that the middleware should match
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/dashboard'
    ],
};
