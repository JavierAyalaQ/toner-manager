import type { APIRoute } from "astro";
import { db } from "@/lib/neon";

export const get: APIRoute = async ({ request }) => {
  const { page } = await request.json();
  const logs = await db`SELECT * FROM toner_logs ORDER BY toner_log_id DESC`;

  return new Response(JSON.stringify(logs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};