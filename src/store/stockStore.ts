// src/store/useStockStore.ts
import { create } from "zustand";
import { io } from "socket.io-client";

/* const socket = io("http://localhost:3000"); */

export type StockItem = {
  id: number;
  name: string;
  quantity: number;
};

export interface StockStore {
  stock: StockItem[];
  fetchStock: () => Promise<void>;
  updateStock: (id: number, quantity: number) => void;
}

export const useStockStore = create<StockStore>((set, get) => {
  /* socket.on("stock-updated", (updatedItem: StockItem) => {
    const stock = get().stock;
    const newStock = stock.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    set({ stock: newStock });
  }); */

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
    updateStock: (id, quantity) => {
      const stock = get().stock;
      const updatedStock = stock.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      set({ stock: updatedStock });

      
      /* const updatedItem = updatedStock.find(item => item.id === id);
      if (updatedItem) socket.emit("update-stock", updatedItem); */
    },
  };
});
