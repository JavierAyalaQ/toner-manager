// not being used any more
import React from "react";
import { useState, useEffect } from "react";

export default function LogsTable() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const savedLogs = localStorage.getItem("changeLog");
        console.log("Saved logs:", savedLogs);
        if (savedLogs) {
            setLogs(JSON.parse(savedLogs));
        }
    }, []);

    return (
        <div className="flex flex-col gap-2">
            {
                logs.length === 0 ? (
                    <div className="flex items-center justify-center bg-gray-700/50 p-2 rounded mb-2 text-gray-100 border border-gray-700 hover:border-gray-100">
                        No hay cambios registrados
                    </div>
                ) :
                logs.map((log, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-700/50 px-4 py-2 rounded mb-2 text-gray-100 border border-gray-700 hover:border-gray-100"
                    >
                        {log}
                    </div>
                ))  
            }
        </div>
    );
}