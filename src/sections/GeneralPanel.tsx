import React from "react";
import { useState, useEffect } from "react";
import { useStockStore } from "@/store/stockStore";

export default function GeneralPanel() {
  const { stock, fetchStock } = useStockStore();

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);
  
  const totalStock = Object.values(stock.map((item) => item.quantity)).reduce((a, b) => a + b, 0);
  const lowStock = Object.values(stock.map((item) => item.quantity)).filter((value) => value < 5).length;
  const [lastRestock, setLastRestock] = useState("N/A");

  /* 
  useEffect(() => {
      const savedLogs = localStorage.getItem("changeLog");
      if (savedLogs) {
          const entries = savedLogs.split('\n');

          const mostRecentEntry = entries[entries.length - 1];

          const match = mostRecentEntry.match(/\(([^)]+)\)/);
          if (match) {
              const date = match[1];
              const formattedDate = date.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3 $4:$5:$6');
              setLastRestock(formattedDate);
          }
      }
  }, []); 
  */

    return (
        <div className="w-full grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center bg-gray-700/50 rounded border border-gray-700 hover:border-gray-100 p-4 md:p-8 text-center">
                <p className="text-sm md:text-lg font-normal">Toner en total</p>
                <span className="text-lg md:text-4xl font-bold">{totalStock}</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-700/50 rounded border border-gray-700 hover:border-gray-100 p-4 md:p-8 text-center">
                <p className="text-sm md:text-lg font-normal">Toner por debajo de 5</p>
                <span className="text-lg md:text-4xl font-bold">{lowStock}</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-700/50 rounded border border-gray-700 hover:border-gray-100 p-4 md:p-8 text-center">
                <p className="text-sm md:text-lg font-normal">Última reposición de stock</p>
                <span className="text-lg md:text-4xl font-bold">{lastRestock}</span>
            </div>
        </div>
    );
}