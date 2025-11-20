// ExtensionPanel.tsx
// UI panel inspired by the provided screenshot
// Clean, minimal Tailwind styling

"use client";
import { useState } from "react";
import Image from "next/image";
// import { FiPlay, FiCopy } from "react-icons/fi";

export default function ExtensionPanel() {
  const tabs = ["Content Detection", " IP Analysis", "One-Click Registration"];
  const [active, setActive] = useState("Content Detection");

  return (
    <div className="w-[360px] rounded-2xl shadow-xl bg-white border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Image
          src="/images/logo2.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="font-semibold text-gray-900">IP Shield</p>
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
          {active === "Content Detection" && (
            <svg
              className="w-20 h-20 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {active === "IP Analysis" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 20 20"
            >
              <path
                fill="#000000"
                d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <p className="text-lg font-semibold mb-1">
          You are in one click from the world!
        </p>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-4">
          Start your new meeting or enter a code to connectsssssssssssssssssss.
        </p>

        {/* Start Meeting Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 mb-3 hover:bg-gray-900 transition">
          {/* <FiPlay /> */}
          Start
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
