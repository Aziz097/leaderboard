import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const isDashboard = pathname.startsWith('/dashboard')
  const isStatic = pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')

  if (isStatic) {
    return NextResponse.next()
  }

  if (isDashboard) {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
