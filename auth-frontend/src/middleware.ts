import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAuth } from './app/lib/validateAuth';



export const middleware = async (req: NextRequest) => {
  console.log('inside middleware');

  const cookieStore = await cookies();
  if (!cookieStore.get('refresh_token')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const authData = await validateAuth();
  if (!authData || !authData.success) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: '/profile',
};
