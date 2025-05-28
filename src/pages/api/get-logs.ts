import type { APIRoute } from "astro";
import { db } from "@/lib/neon";

export const GET: APIRoute = async ({ request }) => {
  const logs = await db`SELECT * FROM toner_logs ORDER BY toner_log_id DESC`;

  return new Response(JSON.stringify(logs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};