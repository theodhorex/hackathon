"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Extension_Panel_alven() {
  const tabs = [
    {
      id: "content",
      title: "Content Detection",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      description:
        "Automatically scan web pages to detect original, copyrighted, or protected content using Yakoa's AI-powered detection.",
      badge: "Yakoa Powered",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    {
      id: "ip",
      title: "IP Analysis",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      description:
        "Deep analysis of IP ownership, originality score, and infringement detection with confidence levels.",
      badge: "AI Analysis",
      badgeColor: "bg-pink-100 text-pink-700",
    },
    {
      id: "register",
      title: "Story Register",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      gradient: "from-emerald-500 via-teal-600 to-cyan-600",
      description:
        "One-click IP registration on Story Protocol blockchain with customizable license terms and automatic royalty tracking.",
      badge: "Story Protocol",
      badgeColor: "bg-emerald-100 text-emerald-700",
    },
  ];

  const [active, setActive] = useState("content");
  const current = tabs.find((t) => t.id === active);

  return (
    <div className="w-[420px] bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <div className="relative bg-white p-2 rounded-full shadow-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">
                IP Shield
              </h1>
              <p className="text-blue-100 text-xs">
                Powered by Yakoa × Story
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-medium">Active</span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-white/80 text-xs">Detected</p>
            <p className="text-white font-bold text-lg">12</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-white/80 text-xs">Protected</p>
            <p className="text-white font-bold text-lg">8</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-white/80 text-xs">Alerts</p>
            <p className="text-white font-bold text-lg">2</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 bg-white rounded-xl p-1.5 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`
                flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all duration-200
                ${
                  active === tab.id
                    ? "bg-gradient-to-br " +
                      tab.gradient +
                      " text-white shadow-md scale-105"
                    : "text-gray-500 hover:bg-gray-50"
                }
              `}
            >
              <div className={active === tab.id ? "scale-110" : ""}>
                {tab.icon}
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {tab.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          {/* Feature Badge */}
          <div className="flex justify-center">
            <span
              className={`
              ${current?.badgeColor} 
              px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5
            `}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {current?.badge}
            </span>
          </div>

          {/* Icon Display */}
          <div className="flex justify-center">
            <div
              className={`
              relative w-28 h-28 rounded-3xl bg-gradient-to-br ${current?.gradient} 
              flex items-center justify-center shadow-xl
            `}
            >
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
              <div className="relative text-white scale-150">{current?.icon}</div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {current?.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed px-2">
              {current?.description}
            </p>
          </div>

          {/* Action Button */}
          <button
            className={`
            w-full py-4 rounded-xl font-semibold text-white shadow-lg
            bg-gradient-to-r ${current?.gradient}
            hover:shadow-xl hover:scale-105 
            active:scale-95
            transition-all duration-200
            flex items-center justify-center gap-2
          `}
          >
            <span>Start {current?.title}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          {/* Quick Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-blue-900 font-medium mb-1">
                  How it works
                </p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  {active === "content" &&
                    "Scan current page for images, videos, and audio. Get instant originality check from Yakoa AI."}
                  {active === "ip" &&
                    "Analyze detected content for IP infringement, brand matches, and existing registrations."}
                  {active === "register" &&
                    "Register your original content on Story Protocol blockchain with one click. Set licensing terms and earn royalties."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
          <span>Version 1.0.0</span>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            View Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}
