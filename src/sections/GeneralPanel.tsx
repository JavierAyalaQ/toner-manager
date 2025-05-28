import React from "react";
import { useState, useEffect } from "react";
import { useStockStore } from "@/store/stockStore";
import type { Log } from "@/types";

export default function GeneralPanel() {
  const { stock, fetchStock } = useStockStore();
  const [ logs, setLogs ] = useState<Log[]>([]);

  const totalStock = Object.values(stock.map((item) => item.quantity)).reduce((a, b) => a + b, 0);
  const lowStock = Object.values(stock.map((item) => item.quantity)).filter((value) => value < 5).length;
  const [lastRestock, setLastRestock] = useState("N/A");

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);
  
  const fetchLogs = async () => {
      const res = await fetch("/api/get-logs");
      const data = await res.json();
  
      const mapped = data.map((item: any): Log => ({
        modified_id: item.toner_id,
        id: item.toner_log_id,
        message: item.toner_log_message,
        timestamp: item.toner_log_timestamp,
      }));
      const lastLog = mapped[mapped.length - 1];
      setLastRestock(lastLog.timestamp);
    };
  
    useEffect(() => { 
      fetchLogs();
    }, [fetchStock]);




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