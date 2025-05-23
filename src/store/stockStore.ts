import { create } from "zustand";
import { persist } from "zustand/middleware";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export type StockItem = {
  id: number;
  name: string;
  quantity: number;
}

export interface StockStore {
  stock: StockItem[];
  updateStock: (id: number, quantity: number) => void;
}

export const useStockStore = create<StockStore>()(
  persist(
    (set) => ({
      stock: [
        { id: 1, name: "CANON", quantity: 0 },
        { id: 2, name: "HP", quantity: 0 },
        { id: 3, name: "EPSON", quantity: 0 },
        { id: 4, name: "CANON2", quantity: 0 },
      ],
      updateStock: (id, quantity) => set((state) => ({
        stock: { ...state.stock, [id]: { ...state.stock[id], quantity } },
      })),
    }),
    {
      name: "stock-storage",
    }
  )
);