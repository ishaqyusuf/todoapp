import { NextRequest, NextResponse } from "next/server";
import getAuth from "./actions/auth";

export async function proxy(request: NextRequest) {
  const auth = await getAuth();
  const nextUrl = request.nextUrl;
  const pathName = nextUrl.pathname;
  if (!!auth.id && pathName.startsWith("/login"))
    return NextResponse.redirect(new URL("/app/home", request.url));
  if (
    !auth.id &&
    !pathName.startsWith("/login") &&
    !pathName.startsWith("/signup")
  )
    return NextResponse.redirect(new URL("/login", request.url));
  if (pathName == "/" || pathName == "/app")
    return NextResponse.redirect(new URL("/app/home", request.url));
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts).*)"],
};
