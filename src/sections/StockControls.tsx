import React from "react";
import { useState, useEffect } from "react";
import { useStockStore } from "@/store/stockStore"
import type { StockItem } from "@/store/stockStore";

export default function StockControls() {
  const stock = useStockStore((state) => state.stock);
  const updateStock = useStockStore((state) => state.updateStock);
  
  const [selectedTonerId, setSelectedTonerId] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);

  const [changeLog, setChangeLog] = useState<string[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("changeLog");
    if (savedLogs) {
      setChangeLog(JSON.parse(savedLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("changeLog", JSON.stringify(changeLog));
  }, [changeLog]);

  const handleAddStock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newStock = stock[selectedTonerId] + amount;
    updateStock(selectedTonerId, newStock);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${now.getFullYear()} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    setChangeLog((prevLog) => [
      `Se ha añadido ${amount} a ${selectedTonerId}. Inventario actual: ${newStock} (${formattedDate})`,
      ...prevLog,
    ]);
  };

  const handleRemoveStock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newStock = stock[selectedTonerId] - amount;
    updateStock(selectedTonerId, newStock);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${now.getFullYear()} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    setChangeLog((prevLog) => [
      `Se ha quitado ${amount} de ${selectedTonerId}. Inventario actual: ${newStock} (${formattedDate})`,
      ...prevLog,
    ]);
  };
  
  /* const handleClearLogs = () => {
    window.confirm("¿Estás seguro de que quieres limpiar el historial de cambios?")
      && localStorage.removeItem("changeLog");
      window.location.reload();;
  } */

  return (
    <div className="flex flex-col gap-8 md:grid grid-cols-3 grid-rows-4 md:gap-4">
      <div className="gap-4 col-span-2 row-span-2 col-start-1 row-start-1 md:gap-0 w-full h-full bg-gray-700/50 border border-gray-700 hover:border-gray-100 rounded p-4">
        <h2 className="text-2xl font-bold mb-2">Gestionar</h2>
        <form id="stock-form" className="flex flex-col gap-4 items-center justify-center">
          <select
            className="border rounded p-2 w-full"
            value={selectedTonerId}
            onChange={(e) => setSelectedTonerId(e.target.value as keyof typeof stock)}
            >
            {Object.entries(stock).map(([item, quantity]) => (
              <option key={item} value={item} className="flex items-center bg-gray-100 p-2 rounded mb-2 text-gray-700">
                {item}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="stock"
            className="border rounded p-2 w-full"
            placeholder="Cantidad"
            min="0"
            max="100"
            onChange={(e) => {setAmount(parseInt(e.target.value))}}
            value={amount}
            required
          />
          <div className="flex items-center gap-4">
            <button onClick={(e) => {handleAddStock(e)}} 
              className="mt-2 bg-blue-800 hover:bg-blue-900 text-white p-2 rounded py-2 px-4 text-sm font-bold cursor-pointer">
              Agregar al inventario
            </button>
            <button onClick={(e) => {handleRemoveStock(e)}} 
              className="mt-2 bg-red-800 hover:bg-red-900 text-white p-2 rounded py-2 px-4 text-sm font-bold cursor-pointer">
              Quitar del inventario
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-2 row-span-2 row-start-3 col-start-1 w-full h-full p-4 bg-gray-700/50 border border-gray-700 hover:border-gray-100 rounded">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(stock).map(([item, quantity]) => (
            <div key={item} className="flex flex-col items-center justify-center bg-gray-600 p-4 rounded text-gray-700 border border-gray-700 hover:border-gray-100">
              <span className="text-xl font-medium text-gray-100">
                {item}
              </span>
              <span className="text-md text-gray-100">
                Cantidad:&nbsp;
                <strong>
                  {quantity}
                </strong>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 row-span-4 col-start-3 row-start-1 justify-self-start w-full h-full bg-gray-700/50 border border-gray-700 hover:border-gray-100 p-4 rounded">
        <h2 className="text-2xl font-bold mb-2">Historial de cambios</h2>
        {/* <button onClick={() => {handleClearLogs()}} className="bg-red-800 hover:bg-red-900 text-white p-2 rounded py-2 px-4 font-bold cursor-pointer text-sm">
            Limpiar historial
        </button> */}
        <ul className="text-base text-gray-100 flex flex-col gap-2 mt-4">
          {changeLog.slice(0, 4).map((log, index) => (
            <li key={index} className="bg-gray-700 p-4 rounded mb-2 border border-gray-700 hover:border-gray-100">
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}