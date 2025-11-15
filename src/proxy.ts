import authEdgeConfig from "@/auth-edge.config";
import { SUCCESS_AUTH_REDIRECT_URL } from "@/utils/constants/auth";
import NextAuth from "next-auth";
const { auth } = NextAuth(authEdgeConfig);

// Specify protected and public routes
const NEXT_AUTH_API_ROUTES = "/api/auth";
const PUBLIC_ROUTES = ["/auth/signin", "/auth/signup", "/"];

export default auth(async function proxy(req) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  const isProtectedRoute = !isPublicRoute;
  const isLoggedIn = !!req.auth;

  // Do nothing if path is a next auth api route
  if (path.startsWith(NEXT_AUTH_API_ROUTES)) return null;

  // Redirect to login page if the user is not authenticated
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/signin", req.nextUrl));
  }

  // Redirect to dashboard if user is logged in and trying to access a public route
  if (isPublicRoute && isLoggedIn) {
    return Response.redirect(new URL(SUCCESS_AUTH_REDIRECT_URL, req.nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};
