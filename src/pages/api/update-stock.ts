import type { APIRoute } from "astro";
import { db } from "@/lib/neon"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { id, quantity, log } = body;

  if (!id || quantity === undefined || !log) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await db`UPDATE toner_stock SET toner_amount = ${quantity} WHERE toner_id = ${id}`;
    await db`INSERT INTO toner_logs (toner_log_id, toner_log_message, toner_log_time, toner_id) VALUES (DEFAULT, ${log}, DEFAULT, ${id})`;
    return new Response(JSON.stringify({ success: "Stock updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating stock" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};