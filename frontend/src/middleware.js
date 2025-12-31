import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log("Middleware Token:", token);
  const pathname = request.nextUrl.pathname;

  // 🚫 Not logged in → block dashboard
  if (!token && pathname.startsWith("/user/dashboard")) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // ✅ Logged in → block signup page
  if (token && pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/dashboard/:path*", "/signup"],
};
