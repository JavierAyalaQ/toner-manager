import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("auth", { path: "/" });
  return redirect("/login");
};