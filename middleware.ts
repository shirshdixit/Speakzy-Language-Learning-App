// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/api/webhooks/stripe",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// ← your one‑and‑only admin user:
const adminIds = ["user_2wKKw2ovxwSTHXzfzpZB4AHqMlu"];

export default clerkMiddleware(async (auth, req) => {
  // Pull the two helpers off of auth()
  const { userId, redirectToSignIn } = await auth();

  // 1) Always skip public routes
  if (isPublicRoute(req)) {
    return;
  }

  // 2) If not signed in, send to Clerk’s sign‑in
  if (!userId) {
    return redirectToSignIn();
  }

  // 3) If on /admin and not your admin, bounce them home
  if (isAdminRoute(req) && !adminIds.includes(userId)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4) Otherwise, allow the request through
});
 
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
