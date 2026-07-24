import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/secret-forward-test')) {
    const cookieHeader = req.headers.get('cookie') || '';
    const hasAdminAccess = cookieHeader.includes('allowAdmin=1bhkg7^y2be8%');

    if (!hasAdminAccess) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/secret-forward-test/:path*'],
};
