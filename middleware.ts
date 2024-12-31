import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const cookies = req.cookies;
  console.log("Middleware Debug - Cookies:", cookies);

  const headers = req.headers;
  console.log("Middleware Debug - Headers:", headers);

  const { data: session } = await supabase.auth.getSession();
  console.log("Middleware Debug - Session:", session);

  if (!session && !req.nextUrl.pathname.startsWith("/login")) {
    console.log("Middleware Debug - Redirecting to /login");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (session && req.nextUrl.pathname.startsWith("/login")) {
    console.log("Middleware Debug - Redirecting to /");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}







export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

