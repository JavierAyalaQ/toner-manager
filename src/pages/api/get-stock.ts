import type { APIRoute } from "astro";
import { db } from "@/lib/neon"

export const GET: APIRoute = async () => {
  try {
    const response = await db`SELECT * FROM toner_stock ORDER BY toner_id ASC`;
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error retrieving stock" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};