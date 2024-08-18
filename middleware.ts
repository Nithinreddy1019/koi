import { auth } from "@/auth"
import { authApiRoute, authRoutes, DEFAULT_REDIRECT, publicRoutes } from "./routes";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedin = !!req.auth;


    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAuthApiRoute = nextUrl.pathname.startsWith(authApiRoute);

    if(isAuthApiRoute) return;

    if (isAuthRoute) {
        if(isLoggedin) {
            return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
        }
        return;
    }

    if(!isLoggedin && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return;
});

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
};