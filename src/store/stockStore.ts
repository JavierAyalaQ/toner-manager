import { create } from "zustand";

export type StockItem = {
  id: number;
  name: string;
  quantity: number;
};

export interface StockStore {
  stock: StockItem[];
  fetchStock: () => Promise<void>;
  updateStock: (id: number, quantity: number, log: string) => Promise<void>;
}

export const useStockStore = create<StockStore>((set, get) => {
  return {
    stock: [],
    fetchStock: async () => {
      const res = await fetch("/api/get-stock");
      const data = await res.json();

      const mapped = data.map((item: any): StockItem => ({
        id: item.toner_id,
        name: item.toner_name,
        quantity: item.toner_amount,
      }));

      set({ stock: mapped });
    },
    updateStock: async (id: number, quantity: number, log: string) => {
      try {
      const res = await fetch("/api/update-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity, log }),
      });
      const data = await res.json();
      } catch (err) {
      console.error("Error updating stock:", err);
      }

      await get().fetchStock();
    },
  };
});
