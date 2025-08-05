import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("🚀 MIDDLEWARE RUNNING!");
    console.log("🚀 Pathname:", req.nextUrl.pathname);
    
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    console.log("🚀 Token exists:", !!token);
    console.log("🚀 Token hasHandle:", token?.hasHandle);

    // Skip middleware for these paths
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname === "/favicon.ico" ||
      pathname.includes(".") ||
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/about" ||
      pathname === "/contact"
    ) {
      console.log("🚀 Skipping middleware for:", pathname);
      return NextResponse.next();
    }

    // Check for dynamic routes - now they're in /handler/[id] format
    const isDynamicRoute = /^\/handler\/[a-zA-Z0-9_-]+$/.test(pathname);
    if (isDynamicRoute) {
      console.log("🚀 Dynamic route detected:", pathname);
      return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
      console.log("🚀 No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check handle status
    const hasHandle = token.hasHandle === true;
    console.log("🚀 User hasHandle:", hasHandle);
    console.log("🚀 User handle:", token.handle);

    // If user doesn't have handle and trying to access protected route
    if (!hasHandle && pathname !== "/set-handle") {
      console.log("🚀 User needs handle, redirecting to /set-handle");
      return NextResponse.redirect(new URL("/set-handle", req.url));
    }

    // If user has handle but trying to access set-handle page
    if (hasHandle && pathname === "/set-handle") {
      console.log("🚀 User has handle, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    console.log("🚀 Allowing access to:", pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true // Let the middleware function handle all logic
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)  
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};