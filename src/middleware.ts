import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });

  const isAuthenticated = Boolean(token);

  //Nếu user chưa đăng nhập thì không cho vào trang private
  if (req.nextUrl.pathname.startsWith("/manage") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //User đăng nhập rồi thì không cho vào trang login nữa
  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/manage/:path*", "/login"],
};
