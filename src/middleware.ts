import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(({ cookies, redirect, url }, next) => {
  const isLoggedIn = cookies.get("auth")?.value === "true";

  const protectedRoutes = ["/manage", "/logs", "/"];

  const isProtectedRoute = protectedRoutes.some((route) => url.pathname.startsWith(route));

  const isLogInRoute = url.pathname === "/login";

  if (isLogInRoute) {
    return redirect(isLoggedIn ? "/" : "/login");
  }
  if (isProtectedRoute && !isLoggedIn) {
    return redirect("/login");
  }

  return next();
})