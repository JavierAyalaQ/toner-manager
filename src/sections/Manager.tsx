import React, { use } from "react";
import { useState, useEffect } from "react";
import { useStockStore } from "@/store/stockStore"
import type { StockItem } from "@/store/stockStore";
import type { Log } from "@/types";

  
export default function StockControls() {
  const { stock, fetchStock } = useStockStore();
  const [ logs, setLogs ] = useState<Log[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  
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
    setLogs(mapped);
  };

  useEffect(() => { 
    fetchLogs();
  }, [fetchStock]);


  const [selectedTonerId, setSelectedTonerId] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);


  const updateStock = useStockStore((state) => state.updateStock);
  

  function handleSetLog(log: string, id: number) {
    fetch("/api/set-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ log, id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error setting log:", err);
      });
  }

  function handleAddStock(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLoading(true);
    const stockItem = stock.find((item) => item.id === selectedTonerId);
    const newStock = (stockItem ? stockItem.quantity : 0) + amount || 0;
    const selectedTonerName = stock.find((item) => item.id === selectedTonerId)?.name;
    const log = `Se ha añadido ${amount} a ${selectedTonerName}. Inventario actual: ${newStock}`;
    updateStock(selectedTonerId, newStock, log);
  }

  function handleRemoveStock(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const stockItem = stock.find((item) => item.id === selectedTonerId);
    const newStock = (stockItem ? stockItem.quantity : 0) - amount;
    const selectedTonerName = stock.find((item) => item.id === selectedTonerId)?.name;
    const log = `Se ha quitado ${amount} a ${selectedTonerName}. Inventario actual: ${newStock}`;
    updateStock(selectedTonerId, newStock, log);
  }



  return (
    <div className="flex flex-col gap-8 md:grid grid-cols-3 grid-rows-4 md:gap-4">
      <div className="gap-4 col-span-2 row-span-2 col-start-1 row-start-1 md:gap-0 w-full h-full bg-gray-700/50 border border-gray-700 hover:border-gray-100 rounded p-4">
        <h2 className="text-2xl font-bold mb-2">Gestionar</h2>
        <form id="stock-form" className="flex flex-col gap-4 items-center justify-center">
          <div className="relative w-full h-full">
            <select
              className="border rounded p-2 w-full appearance-none cursor-pointer"
              value={selectedTonerId}
              onChange={(e) => setSelectedTonerId(parseInt(e.target.value))}
              >
              {Object.entries(stock).map(([_, item]) => (
                <option key={item.id} value={item.id} className="appearance-none flex items-center bg-gray-200 p-2 rounded mb-2 text-gray-800 border border-teal-500" onChange={(e) => setSelectedTonerId(item.id)}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-100">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <input
            type="number"
            id="stock"
            className="border rounded p-2 w-full"
            placeholder="Cantidad"
            min="0"
            max="100"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            value={amount}
            required
          />
          <div className="flex items-center gap-4">
            <button onClick={(e) => {handleAddStock(e)}} 
              className="mt-2 bg-blue-800 hover:bg-blue-900 transition-colors text-white p-2 rounded py-2 px-4 text-sm font-bold cursor-pointer">
              Agregar al inventario
            </button>
            <button onClick={(e) => {handleRemoveStock(e)}} 
              className="mt-2 bg-red-800 hover:bg-red-900 transition-colors text-white p-2 rounded py-2 px-4 text-sm font-bold cursor-pointer">
              Quitar del inventario
            </button>
          </div>
        </form>
      </div>
        <div className="col-span-2 row-span-2 row-start-3 col-start-1 w-full h-full p-4 bg-gray-700/50 border border-gray-700 hover:border-gray-100 rounded">
          <h2 className="text-2xl font-bold mb-2">Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stock).map(([_, item]) => (
              <div key={item.id} className="flex flex-col items-center justify-center bg-gray-600 p-4 rounded text-gray-700 border border-gray-700 hover:border-gray-100">
                <span className="text-base md:text-xl font-medium text-gray-100">
                  {item.name}
                </span>
                <span className="text-sm md:text-md text-gray-100">
                  Cantidad:&nbsp;
                  <strong>
                    {item.quantity}
                  </strong>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 row-span-4 col-start-3 row-start-1 justify-self-start w-full h-full bg-gray-700/50 border border-gray-700 hover:border-gray-100 p-4 rounded">
          <a href="/logs" className="hover:text-teal-500 transition-colors">
            <h2 className="text-2xl font-bold mb-2">Historial de cambios</h2>
          </a>
          <ul className="text-base text-gray-100 flex flex-col gap-2 mt-4">
            {logs.slice(0, 4).map((log) => (
              <li key={log.id} className="flex flex-col gap-1 bg-gray-700 p-4 rounded mb-2 border border-gray-700 hover:border-gray-100">
                <p>{log.message}</p>
                <p className="text-sm text-gray-300">{log.timestamp}</p>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}