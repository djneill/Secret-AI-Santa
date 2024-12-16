import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLoggedInUser } from '@/app/lib/server/appwrite'

const protectedRoutes = ['/dashboard']
const authRoutes = ['/signin', '/signup']

export async function middleware(request: NextRequest) {
    const user = await getLoggedInUser()
    const isProtectedRoute = protectedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    )
    const isAuthRoute = authRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    )

    // Redirect authenticated users away from auth pages
    if (user && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin))
    }

    // Redirect unauthenticated users to signin
    if (!user && isProtectedRoute) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl.origin))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/signin',
        '/signup'
    ]
}