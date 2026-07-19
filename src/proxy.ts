import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (url.pathname.startsWith('/admin')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const adminUser = process.env.ADMIN_USER || 'admin';
      const adminPwd = process.env.ADMIN_PASSWORD || 'securepassword123'; 

      if (user === adminUser && pwd === adminPwd) {
        return NextResponse.next();
      }
    }
    
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
