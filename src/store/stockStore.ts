import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Stock = {
    EPSON: number;
    CANON: number;
    EPSON2: number;
    CANON2: number;
}

export interface StockStore {
    stock: Stock;
    updateStock: (item: string, quantity: number) => void;
}

export const useStockStore = create<StockStore>()(
    persist(
        (set) => ({
            stock: {
                EPSON: 0,
                CANON: 0,
                EPSON2: 0,
                CANON2: 0,
            },
            updateStock: (item, quantity) => set((state) => ({
                stock: { ...state.stock, [item]: quantity },
            })),
        }),
        {
            name: "stock-storage",
        }
    )
);