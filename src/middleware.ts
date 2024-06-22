import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/'

    const token = request.cookies.get('next-auth.session-token')?.value

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    
    return NextResponse.rewrite(request.url);
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/dashboard'
    ]
}