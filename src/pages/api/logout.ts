import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("auth", { path: "/" });
  return redirect("/login");
};