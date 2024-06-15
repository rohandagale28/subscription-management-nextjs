import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { encrypt } from './app/_lib/lib'

export default async function middleware(request: NextRequest) {
    //Check if the route is protected
    // const protectedRoutes = ['/dashboard', '/login', 'signup']
    // const currentPath = request.nextUrl.pathname
    // const isProtectedRoute = protectedRoutes.includes(currentPath)

    // if (isProtectedRoute) {
    //     const cookie = cookies().get('token')?.value || cookies().get('next-auth.session-token')?.value
    //     console.log(cookie, 'this is cookie')
    //     const session = await encrypt(cookie)
    //     console.log(session, 'this is session')
    //     if (!session?.user) {

    //     }
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/'

    const token = request.cookies.get('next-auth.session-token')?.value || request.cookies.get('token')?.value

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
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