import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/secret-forward-test')) {
    const hasAdminAccess = request.cookies.get('allowAdmin')?.value === '1bhkg7^y2be8%';

    if (!hasAdminAccess) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/secret-forward-test/:path*'],
};
