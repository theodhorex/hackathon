"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [scans, setScans] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/yakoa/scans");
    const json = await res.json();
    if (json.ok) setScans(json.data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>IP Shield Dashboard</h1>

      <button onClick={load}>Refresh</button>

      {scans.map((scan) => (
        <div
          key={scan.id}
          style={{
            padding: 12,
            marginTop: 12,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <b>ID:</b> {scan.id} <br />
          <b>Status:</b> {scan.status}
          <details>
            <summary>Payload</summary>
            <pre>{JSON.stringify(scan.payload, null, 2)}</pre>
          </details>
          <details>
            <summary>Last Yakoa Response</summary>
            <pre>{JSON.stringify(scan.lastYakoaResponse, null, 2)}</pre>
          </details>
        </div>
      ))}
    </div>
  );
}
