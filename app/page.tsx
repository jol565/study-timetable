"use client";
import { useState, useEffect } from "react";

const API_URL = "https://93w1c70n96.execute-api.ap-south-1.amazonaws.com/prod";

type Row = {
  id: string;
  date: string;
  topic: string;
  done: boolean;
};

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState({ date: "", topic: "" });
  const [loading, setLoading] = useState(true);

  async function loadRows() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRows(data);
    setLoading(false);
  }

  useEffect(() => {
    loadRows();
  }, []);

  async function addRow() {
    if (!form.date || !form.topic.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ date: "", topic: "" });
    loadRows();
  }

  async function toggleDone(row: Row) {
    await fetch(`${API_URL}/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !row.done }),
    });
    loadRows();
  }

  async function removeRow(id: string) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadRows();
  }

  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Study Timetable</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          placeholder="Topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="border rounded px-2 py-1 flex-1"
        />
        <button onClick={addRow} className="bg-black text-white px-4 py-1 rounded">
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Date</th>
              <th>Topic</th>
              <th className="text-center">Done</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className={`border-b ${r.done ? "opacity-50" : ""}`}>
                <td className="py-2">{r.date}</td>
                <td className={r.done ? "line-through" : ""}>{r.topic}</td>
                <td className="text-center">
                  <input type="checkbox" checked={r.done} onChange={() => toggleDone(r)} />
                </td>
                <td>
                  <button onClick={() => removeRow(r.id)} className="text-red-500">
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}