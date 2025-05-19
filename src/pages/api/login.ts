import type { APIRoute } from "astro";

export const prerender = false;

const ADMIN_PASSWORD = "1234";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const form = await request.formData();
  const password = form.get("password") as string;

  if (password == ADMIN_PASSWORD) {
    cookies.set("auth", "true", { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    return redirect("/");
  }
  return redirect("/login?error=invalid-password");
};