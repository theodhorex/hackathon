// ExtensionPanel.tsx
// UI panel inspired by the provided screenshot
// Clean, minimal Tailwind styling

"use client";
import { useState } from "react";
// import { FiPlay, FiCopy } from "react-icons/fi";

export default function ExtensionPanel() {
  const tabs = ["Remote Control", "Transfer Files", "Start Meeting"];
  const [active, setActive] = useState("Start Meeting");

  return (
    <div className="w-[360px] rounded-2xl shadow-xl bg-white border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-black" />
        <p className="font-semibold text-gray-900">mota</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 text-sm border-b mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`py-2 ${
              active === t
                ? "text-black border-b-2 border-black"
                : "text-gray-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center">
        {/* Illustration placeholder */}
        <div className="w-32 h-24 rounded-xl bg-gradient-to-br from-teal-300 to-cyan-400 flex items-center justify-center mb-4">
          {/* simple orb */}
          <div className="w-6 h-6 bg-gray-800 rounded-full" />
        </div>

        {/* Title */}
        <p className="text-lg font-semibold mb-1">
          You are in one click from the world!
        </p>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-4">
          Start your new meeting or enter a code to connect.
        </p>

        {/* Start Meeting Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 mb-3 hover:bg-gray-900 transition">
          {/* <FiPlay /> */}
          Start new meeting
        </button>

        {/* Meeting Code Row */}
        <div className="w-full flex items-center justify-between px-3 py-3 border rounded-lg bg-gray-50">
          <span className="font-mono tracking-wider">057 046 1336</span>
          <button className="p-2 rounded hover:bg-gray-200 transition">
            {/* <FiCopy /> */}
          </button>
        </div>
      </div>
    </div>
  );
}
