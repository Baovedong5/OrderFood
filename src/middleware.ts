import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./lib/utils";
import { Role } from "./constants/type";

export default withAuth(
  async function middleware(req: NextRequest, event: NextFetchEvent) {
    const token = await getToken({ req });

    const access_token = token?.accessToken as string;

    if (req.nextUrl.pathname.startsWith("/manage") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/login") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const role = decodeToken(access_token)?.role;

    //Guest nhưng cố vào route owner
    const isGuestGoToManagePath =
      role === Role.Guest && req.nextUrl.pathname.startsWith("/manage");
    //Không phải guest nhưng cố tình vào route guest
    const isNotGuestGoToGuestPath =
      role !== Role.Guest && req.nextUrl.pathname.startsWith("/guest");
    if (isGuestGoToManagePath || isNotGuestGoToGuestPath) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/manage/:path*", "/guest/:path*", "/login"],
};
