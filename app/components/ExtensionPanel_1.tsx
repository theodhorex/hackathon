"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ExtensionPanel() {
  const [active, setActive] = useState<string>("password");
  const [step, setStep] = useState<number>(3);
  const totalSteps = 6;

  const tabs = [
    { id: "password", icon: "/file.svg" },
    { id: "recovery", icon: "/globe.svg" },
    { id: "next", icon: "/next.svg" },
    { id: "folder", icon: "/folder.svg" },
    { id: "user", icon: "/user.svg" },
    { id: "flag", icon: "/flag.svg" },
  ];

  const title = {
    password: "Set Up a Strong Password",
    recovery: "Back Up Your Recovery Phrase",
    next: "Next Step",
    folder: "Folder Access",
    user: "User Setup",
    flag: "Final Step"
  }[active];

  return (
    <div className="w-[420px] bg-white rounded-3xl shadow-md p-6 space-y-5">

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      {/* ICON BAR (TOP) */}
      <div className="flex gap-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition 
            ${active === t.id ? "bg-black" : "bg-gray-200"}`}
          >
            <Image
              src={t.icon}
              alt={t.id}
              width={22}
              height={22}
              className={`${active === t.id ? "invert brightness-0" : "opacity-70"}`}
            />
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="space-y-4">
        
        {/* Only show progress bar on recovery tab */}
        {active === "recovery" && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{step}/{totalSteps}</span>
          </div>
        )}

        {/* VIDEO / IMAGE BOX */}
        <div className="rounded-xl bg-gray-100 h-44 flex items-center justify-center text-gray-400">
          Video / Image
        </div>

        {/* DESCRIPTION */}
        {active === "password" && (
          <p className="text-sm text-gray-600 leading-relaxed">
            Choose a strong password — at least 12 characters long, and 
            include symbols, numbers and letters.
          </p>
        )}

        {active === "recovery" && (
          <p className="text-sm text-gray-600 leading-relaxed">
            Write down your recovery phrase and store it securely offline. 
            This phrase is your backup; losing it means losing access to your wallet permanently.
          </p>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between">
          <button className="px-5 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed">
            ← Previous
          </button>
          <button className="px-5 py-2 rounded-lg bg-black text-white">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
