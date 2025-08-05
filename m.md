import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

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
    
    // Check for dynamic routes (assuming they are alphanumeric IDs like your example)
    const isDynamicRoute = /^\/[a-zA-Z0-9]+$/.test(pathname);
    
    if (publicPages.includes(pathname) || isDynamicRoute) {
      return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
      console.log("No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Debug logging
    console.log("User ID:", token.sub);
    console.log("hasHandle from token:", token?.hasHandle);
    console.log("Pathname:", pathname);

    // Check hasHandle status (handle undefined/null/false the same way)
    const hasHandle = token.hasHandle === true;

    // If user doesn't have a handle, redirect to set-handle
    if (!hasHandle) {
      console.log("User needs to set handle, redirecting to /set-handle");
      if (pathname !== "/set-handle") {
        return NextResponse.redirect(new URL("/set-handle", req.url));
      }
      // Allow access to set-handle page
      return NextResponse.next();
    }

    // If user has handle but is trying to access set-handle page, redirect to dashboard
    if (hasHandle && pathname === "/set-handle") {
      console.log("User has handle, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // User has handle, allow access to protected routes
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
        
        // Check for dynamic routes
        const isDynamicRoute = /^\/[a-zA-Z0-9]+$/.test(pathname);
        
        // Always allow access to public pages and dynamic routes
        if (publicPages.includes(pathname) || isDynamicRoute) {
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

export const config = {
  matcher: ["/((?!api/search-handle).*)"],
};