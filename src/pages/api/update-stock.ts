import type { APIRoute } from "astro";
import { db } from "@/lib/neon"

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { id, quantity } = body;

  if (!id || quantity === undefined) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await db`UPDATE toner_stock SET toner_amount = ${quantity} WHERE toner_id = ${id}`;
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