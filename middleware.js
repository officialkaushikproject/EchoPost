import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Add debugging
    console.log("Middleware Debug:", {
      pathname,
      hasToken: !!token,
      hasHandle: token?.hasHandle,
      tokenId: token?.id,
      userEmail: token?.email,
    });

    // Skip middleware for API routes, static files, and auth pages
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/auth/") ||
      pathname === "/favicon.ico" ||
      pathname.includes(".")  // Skip all static files
    ) {
      return NextResponse.next();
    }

    // Public pages that don't require authentication
    const publicPages = ["/", "/login", "/register", "/about", "/contact"];
    if (publicPages.includes(pathname)) {
      return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
      console.log("No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is authenticated but doesn't have a handle
    if (token && token.hasHandle === false) {
      console.log("User has no handle, redirecting to /set-handle");
      if (pathname !== "/set-handle") {
        return NextResponse.redirect(new URL("/set-handle", req.url));
      }
      // Allow access to set-handle page
      return NextResponse.next();
    }

    // If user has handle but is trying to access set-handle page
    if (token && token.hasHandle === true && pathname === "/set-handle") {
      console.log("User has handle, redirecting away from /set-handle");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user has handle, allow access to protected routes
    if (token && token.hasHandle === true) {
      return NextResponse.next();
    }

    // Default: if hasHandle is undefined/null, redirect to set-handle
    if (token && (token.hasHandle === undefined || token.hasHandle === null)) {
      console.log("Handle status unknown, redirecting to /set-handle");
      if (pathname !== "/set-handle") {
        return NextResponse.redirect(new URL("/set-handle", req.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const publicPages = ["/", "/login", "/register", "/about", "/contact"];

        // Always allow access to public pages
        if (publicPages.includes(pathname)) {
          return true;
        }

        // Always allow access to set-handle page if user is authenticated
        if (pathname === "/set-handle" && token) {
          return true;
        }

        // For other protected routes, require authentication
        return !!token;
      },
    },
  }
);