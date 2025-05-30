import type { APIRoute } from "astro";
import { db } from "@/lib/neon";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { log, id } = body;

  try { 
    await db`INSERT INTO toner_logs (toner_log_id, toner_log_message, toner_log_time, toner_id) VALUES (DEFAULT, ${log}, NOW(), ${id})`;
    return new Response(JSON.stringify({ success: "Log set successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error setting log" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};