import { defineMiddleware } from "astro/middleware"; 

export const onRequest = defineMiddleware(({ cookies, redirect, url }, next) => {
  const isLoggedIn = cookies.get("auth")?.value === "true";

  const protectedRoutes = ["/manage", "/logs"];

  const isProtectedRoute = protectedRoutes.some((route) => url.pathname.startsWith(route));

  if (isProtectedRoute && !isLoggedIn) {
    return redirect("/login");
  }

  return next();
})