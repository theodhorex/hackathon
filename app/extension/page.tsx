"use client";

import { useState } from "react";

export default function ExtensionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const handleScan = () => {
    setLoading(true);
    setResult(null);

    chrome.runtime.sendMessage(
      { action: "scan_page" },
      (response) => {
        setLoading(false);
        setResult(response);
      }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Scan Webpage</h2>
      <button onClick={handleScan}>🔍 Scan</button>
      {loading && <p>Scanning...</p>}
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
