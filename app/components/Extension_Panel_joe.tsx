"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Extension_Panel_joe() {
  const tabs = [
    {
      id: "content",
      title: "Auto Content Detection",
      icon: (
        <svg
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
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
      ),
      description:
        "Scan and detect copyrighted or sensitive content instantly using automated AI analysis.",
    },

    {
      id: "ip",
      title: "Smart IP Analysis",
      icon: (
        <svg
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
          />
        </svg>
      ),
      description:
        "Analyze IP ownership, trace metadata, and validate digital rights with one click.",
    },

    {
      id: "register",
      title: "One-Click Registration",
      icon: (
        <svg
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm-7 8a7 7 0 0 1 14 0Zm9.5-9h3.5v2h-3.5v3l-4-4l4-4v3Z" />
        </svg>
      ),
      description:
        "Register new content or digital assets instantly through automated form filling.",
    },
  ];

  const [active, setActive] = useState("content");
  const current = tabs.find((t) => t.id === active);

  return (
    <div className="w-[420px] bg-white rounded-3xl shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo2.png"
          alt="logo"
          width={45}
          height={45}
          className="rounded-full"
        />
        <p className="text-lg font-semibold text-gray-900">IP Shield</p>
      </div>

      {/* ICON TABS */}
      <div className="flex justify-between">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex flex-col items-center gap-1`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition 
              ${
                active === t.id
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {t.icon}
            </div>
            <span
              className={`text-xs ${
                active === t.id ? "text-black font-medium" : "text-gray-400"
              }`}
            >
              {t.title}
            </span>
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Gradient box */}
        <div className="w-36 h-24 rounded-xl bg-gradient-to-br from-teal-300 to-cyan-400 flex items-center justify-center">
          {current?.icon}
        </div>

        {/* Title */}
        <p className="text-lg font-semibold">{current?.title}</p>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm leading-relaxed px-2">
          {current?.description}
        </p>

        {/* Start Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition">
          Start
        </button>
      </div>
    </div>
  );
}
