import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Stock = {
  id: number;
  name: string;
  quantity: number;
}

export interface StockStore {
  stock: Stock[];
  updateStock: (item: string, quantity: number) => void;
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
      updateStock: (item, quantity) => set((state) => ({
        stock: { ...state.stock, [item]: quantity },
      })),
    }),
    {
      name: "stock-storage",
    }
  )
);


//pending