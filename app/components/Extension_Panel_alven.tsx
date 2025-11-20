"use client";
import React, { useState } from "react";

type Detected = {
  id: number;
  url: string;
  type: string;
  status: "original" | "brand_ip" | "registered";
  confidence: number;
  size: string;
  brand?: string;
  owner?: string;
};

export default function Extension_Panel_alven() {
  const tabs = [
    {
      id: "content",
      title: "Content Detection",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      description:
        "Automatically scan web pages to detect original, copyrighted content using Yakoa's AI.",
      badge: "Yakoa Powered",
    },
    {
      id: "ip",
      title: "IP Analysis",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      description:
        "Deep analysis of IP ownership and infringement detection with confidence levels.",
      badge: "AI Analysis",
    },
    {
      id: "register",
      title: "Story Register",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      description:
        "Register IP on Story Protocol blockchain with automatic royalty tracking.",
      badge: "Story Protocol",
    },
  ];

  const [active, setActive] = useState("content");
  const [showSidebar, setShowSidebar] = useState(false);
  const current = tabs.find((t) => t.id === active);

  const detectedContent: Detected[] = [
    {
      id: 1,
      url: "https://via.placeholder.com/400x300/1a4d3a/ffffff?text=Image+1",
      type: "image",
      status: "original",
      confidence: 98,
      size: "1920x1080",
    },
    {
      id: 2,
      url: "https://via.placeholder.com/400x300/27835c/ffffff?text=Image+2",
      type: "image",
      status: "brand_ip",
      confidence: 95,
      brand: "Nike",
      size: "1280x720",
    },
    {
      id: 3,
      url: "https://via.placeholder.com/400x300/8dc9b0/ffffff?text=Image+3",
      type: "image",
      status: "registered",
      confidence: 87,
      owner: "0x742d...5678",
      size: "2560x1440",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        padding: "32px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f0",
        boxSizing: "border-box",
      }}
    >
      {/* PANEL UTAMA */}
      <div
        style={{
          width: "400px",
          backgroundColor: "#e8dcbb",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(26, 77, 58, 0.15)",
          overflow: "hidden",
          border: "1px solid rgba(26, 77, 58, 0.1)",
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: "#1a4d3a", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  padding: "6px",
                  borderRadius: "8px",
                }}
              >
                <svg
                  style={{ width: "20px", height: "20px", color: "#1a4d3a" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h1
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    margin: 0,
                  }}
                >
                  IP Shield
                </h1>
                <p style={{ color: "#8dc9b0", fontSize: "12px", margin: 0 }}>
                  Yakoa × Story
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#8dc9b0",
                  borderRadius: "50%",
                }}
              />
              <span style={{ color: "white", fontSize: "12px" }}>Active</span>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            {[
              { label: "Detected", value: "12" },
              { label: "Protected", value: "8" },
              { label: "Alerts", value: "2" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "10px",
                    margin: "0 0 2px 0",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    margin: 0,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          {/* Tab Navigation */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
              padding: "4px",
              display: "flex",
              gap: "6px",
              marginBottom: "16px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 8px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor:
                    active === tab.id ? "#1a4d3a" : "transparent",
                  color:
                    active === tab.id ? "white" : "rgba(26, 77, 58, 0.6)",
                  boxShadow:
                    active === tab.id
                      ? "0 2px 8px rgba(26, 77, 58, 0.3)"
                      : "none",
                }}
              >
                {tab.icon}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    textAlign: "center",
                    lineHeight: "1.2",
                  }}
                >
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Badge */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  backgroundColor: "rgba(141, 201, 176, 0.2)",
                  color: "#1a4d3a",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {current?.badge}
              </span>
            </div>

            {/* Icon */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #1a4d3a 0%, #27835c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(26, 77, 58, 0.3)",
                }}
              >
                <div style={{ color: "white", transform: "scale(1.25)" }}>
                  {current?.icon}
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1a4d3a",
                  margin: "0 0 4px 0",
                }}
              >
                {current?.title}
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(26, 77, 58, 0.6)",
                  lineHeight: "1.5",
                  margin: 0,
                  padding: "0 12px",
                }}
              >
                {current?.description}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                fontWeight: 500,
                color: "white",
                background:
                  "linear-gradient(90deg, #1a4d3a 0%, #27835c 100%)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(26, 77, 58, 0.3)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(26, 77, 58, 0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(26, 77, 58, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>Start {current?.title}</span>
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Info Box */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(26, 77, 58, 0.1)",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#27835c",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#1a4d3a",
                      fontWeight: 500,
                      margin: "0 0 4px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    How it works
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(26, 77, 58, 0.7)",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    {active === "content" &&
                      "Scan current page for images, videos, and audio. Get instant originality check from Yakoa AI."}
                    {active === "ip" &&
                      "Analyze detected content for IP infringement, brand matches, and existing registrations."}
                    {active === "register" &&
                      "Register your original content on Story Protocol blockchain with one click."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "0 20px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "10px",
              color: "rgba(26, 77, 58, 0.5)",
              paddingTop: "12px",
              borderTop: "1px solid rgba(26, 77, 58, 0.1)",
            }}
          >
            <span>v1.0.0</span>
            <a
              href="#"
              style={{
                color: "#27835c",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              Dashboard →
            </a>
          </div>
        </div>
      </div>

      {/* SIDEBAR (Muncul ketika klik tombol) */}
      {showSidebar && (
        <div
          style={{
            width: "400px",
            height: "600px",
            backgroundColor: "#e8dcbb",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(26, 77, 58, 0.15)",
            overflow: "hidden",
            border: "1px solid rgba(26, 77, 58, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Sidebar Header */}
          <div style={{ backgroundColor: "#1a4d3a", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => setShowSidebar(false)}
                  style={{
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "6px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 style={{ color: "white", fontWeight: 600, fontSize: "14px", margin: 0 }}>
                    Detected Content
                  </h2>
                  <p style={{ color: "#8dc9b0", fontSize: "12px", margin: 0 }}>Current Page</p>
                </div>
              </div>
              <span
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {detectedContent.length}
              </span>
            </div>
          </div>

          {/* Content List */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              backgroundColor: "#f5f5f0",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {detectedContent.map((content) => (
              <div
                key={content.id}
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(26, 77, 58, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                  transition: "transform 0.22s cubic-bezier(.2,.9,.2,1), box-shadow 0.22s ease",
                  transform: "scale(1)",
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "0 8px 20px rgba(26, 77, 58, 0.18)";
                  el.style.transform = "scale(1.04)";
                  el.style.zIndex = "5";
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "none";
                  el.style.transform = "scale(1)";
                  el.style.zIndex = "0";
                }}
              >
                {/* Image Preview */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "112px",
                    backgroundColor: "rgba(141, 201, 176, 0.1)",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={content.url}
                    alt="content"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Status Badge */}
                  <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                    {content.status === "original" && (
                      <span
                        style={{
                          backgroundColor: "#27835c",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontSize: "10px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Original
                      </span>
                    )}
                    {content.status === "brand_ip" && (
                      <span
                        style={{
                          backgroundColor: "#f97316",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontSize: "10px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Brand IP
                      </span>
                    )}
                    {content.status === "registered" && (
                      <span
                        style={{
                          backgroundColor: "#ef4444",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontSize: "10px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Registered
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#1a4d3a" }}>
                      {content.size}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div
                        style={{
                          width: "56px",
                          height: "4px",
                          backgroundColor: "rgba(141, 201, 176, 0.3)",
                          borderRadius: "20px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "20px",
                            backgroundColor:
                              content.confidence > 90
                                ? "#27835c"
                                : content.confidence > 70
                                ? "#f97316"
                                : "#ef4444",
                            width: `${content.confidence}%`,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "#1a4d3a" }}>
                        {content.confidence}%
                      </span>
                    </div>
                  </div>

                  {content.brand && (
                    <p style={{ fontSize: "10px", color: "rgba(26, 77, 58, 0.6)", margin: 0 }}>
                      Matched:{" "}
                      <span style={{ fontWeight: 600, color: "#1a4d3a" }}>{content.brand}</span>
                    </p>
                  )}

                  {content.owner && (
                    <p style={{ fontSize: "10px", color: "rgba(26, 77, 58, 0.6)", margin: 0 }}>
                      Owner:{" "}
                      <span style={{ fontFamily: "monospace", color: "#1a4d3a" }}>{content.owner}</span>
                    </p>
                  )}

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px", paddingTop: "4px" }}>
                    {content.status === "original" ? (
                      <button
                        style={{
                          flex: 1,
                          background: "linear-gradient(90deg, #1a4d3a 0%, #27835c 100%)",
                          color: "white",
                          padding: "6px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          border: "none",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "0 6px 14px rgba(26,77,58,0.2)";
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                        }}
                      >
                        🛡️ Protect This
                      </button>
                    ) : (
                      <button
                        style={{
                          flex: 1,
                          backgroundColor: "rgba(141, 201, 176, 0.2)",
                          color: "#1a4d3a",
                          padding: "6px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          border: "none",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            "rgba(141,201,176,0.3)";
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            "rgba(141,201,176,0.2)";
                        }}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div style={{ padding: "16px", backgroundColor: "white", borderTop: "1px solid rgba(26, 77, 58, 0.1)" }}>
            <button
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #1a4d3a 0%, #27835c 100%)",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "14px",
                transition: "box-shadow 0.2s",
                boxShadow: "0 4px 12px rgba(26, 77, 58, 0.3)",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 6px 16px rgba(26, 77, 58, 0.4)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 4px 12px rgba(26, 77, 58, 0.3)";
              }}
            >
              <span>
                Protect All Original ({detectedContent.filter((c) => c.status === "original").length})
              </span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
