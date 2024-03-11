import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // This line is disabling the middleware
  // return NextResponse.next();

  // If it's the root path, just render it
  // if (path === "/") {
  //   return NextResponse.next();
  // }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log(session)
  if (!session && path === "/formManager") {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (session && (path === "/" || path === "/register")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  return NextResponse.next();
}