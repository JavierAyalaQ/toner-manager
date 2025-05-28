import type { APIRoute } from "astro";
import { db } from "@/lib/neon";

export const GET: APIRoute = async ({ request }) => {
  try {
    const response = await db`SELECT * FROM toner_logs ORDER BY toner_log_id DESC`;
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error retrieving logs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

};