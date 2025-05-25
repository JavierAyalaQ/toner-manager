import React from "react";
import { useState, useEffect } from "react";
import type { StockItem } from "@/store/stockStore";

type dbData = {
  toner_id: number;
  toner_name: string;
  toner_amount: number;
}

export default function Data() {
  const [stockData, setStockData] = useState<dbData[]>([]);
    useEffect(() => { 
      fetch("/api/get-stock")
        .then((response) => response.json())
        .then((data) => {
          setStockData(data);
        });
    }, []);

  const items = stockData.map((item) => item.toner_name);
  console.log(items);

  return (
    <ul>
      {stockData.map((item) => (
        <li key={item.toner_id}>
          <strong>{item.toner_id}.&nbsp;</strong>{item.toner_name}: {item.toner_amount}
        </li>
      ))}
    </ul>
  )
}