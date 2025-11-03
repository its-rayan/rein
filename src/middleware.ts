import authEdgeConfig from "@/auth-edge.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authEdgeConfig);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};

const SUCCESS_REDIRECT_URL = "/dashboard/tasks";

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isNextAuthApiRoute = nextUrl.pathname.startsWith("/api/auth");

  const isAuthRoute = ["/auth/signin", "/auth/signup"].includes(
    nextUrl.pathname
  );

  const isPublicRoute = ["/"].includes(nextUrl.pathname);

  if (isNextAuthApiRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(SUCCESS_REDIRECT_URL, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/signin", req.url));
  }

  // redirect to workspace if user is logged in and trying to access a public route
  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL(SUCCESS_REDIRECT_URL, nextUrl));
  }

  return null;
});
