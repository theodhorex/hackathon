"use client";

import React, { useState } from "react";
import { ChevronRight, Shield, Lock, Zap, Home, Check, AlertCircle, Clock } from "lucide-react";

export default function IPShieldExtension() {
  const [currentPage, setCurrentPage] = useState("main"); // main, dashboard, content-detail
  const [activeTab, setActiveTab] = useState("content");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  // Mock data
  const detectedContent = [
    { id: 1, url: "https://via.placeholder.com/400x300/1a4d3a/ffffff?text=Image+1", type: "image", status: "original", confidence: 98, size: "1920x1080" },
    { id: 2, url: "https://via.placeholder.com/400x300/27835c/ffffff?text=Image+2", type: "image", status: "brand_ip", confidence: 95, brand: "Nike", size: "1280x720" },
    { id: 3, url: "https://via.placeholder.com/400x300/8dc9b0/ffffff?text=Image+3", type: "image", status: "registered", confidence: 87, owner: "0x742d...5678", size: "2560x1440" },
  ];

  const protectedIPs = [
    { id: 1, url: "https://via.placeholder.com/200x150/1a4d3a/ffffff?text=Protected+1", title: "Original Artwork #1", status: "protected", earnings: "$12.45", storyId: "0x123...abc" },
    { id: 2, url: "https://via.placeholder.com/200x150/27835c/ffffff?text=Protected+2", title: "Photography Series", status: "protected", earnings: "$34.20", storyId: "0x456...def" },
    { id: 3, url: "https://via.placeholder.com/200x150/8dc9b0/ffffff?text=Protected+3", title: "Design Concept", status: "pending", earnings: "$0.00", storyId: "0x789...ghi" },
    { id: 4, url: "https://via.placeholder.com/200x150/1a4d3a/ffffff?text=Protected+4", title: "Brand Identity", status: "protected", earnings: "$56.80", storyId: "0xabc...jkl" },
  ];

  const tabs = [
    { id: "content", title: "Detect", icon: "📸", description: "Scan for original content" },
    { id: "ip", title: "Analyze", icon: "🔍", description: "Deep IP analysis" },
    { id: "register", title: "Register", icon: "✍️", description: "Story registration" },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab);

  // ============= MAIN PANEL VIEW =============
  const MainPanelView = () => (
    <div className="w-full h-full bg-gradient-to-b from-[#e8dcbb] to-[#f5f5f0] rounded-xl shadow-2xl overflow-hidden border border-[#1a4d3a]/10 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a4d3a] to-[#27835c] px-6 py-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 p-2 rounded-lg shadow-lg">
                <Shield className="w-5 h-5 text-[#1a4d3a]" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base">IP Shield</h1>
                <p className="text-[#8dc9b0] text-xs font-medium">Yakoa × Story</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#8dc9b0] rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">Active</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Detected", value: "12", icon: "📸" },
              { label: "Protected", value: "8", icon: "🛡️" },
              { label: "Alerts", value: "2", icon: "⚠️" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/10">
                <p className="text-[#8dc9b0] text-[10px] font-medium mb-1">{stat.label}</p>
                <p className="text-white font-bold text-sm">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-5 pb-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-1.5 flex gap-1.5 border border-white/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-md font-medium text-xs transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#1a4d3a] to-[#27835c] text-white shadow-lg scale-105"
                  : "text-[#1a4d3a]/60 hover:text-[#1a4d3a]/80"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 pb-5 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="bg-[#8dc9b0]/20 text-[#1a4d3a] px-3 py-1 rounded-full text-xs font-bold border border-[#8dc9b0]/30">
              {activeTab === "content" && "🎯 Yakoa Powered"}
              {activeTab === "ip" && "🔬 AI Analysis"}
              {activeTab === "register" && "⛓️ Story Protocol"}
            </span>
          </div>

          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1a4d3a] to-[#27835c] flex items-center justify-center shadow-xl">
              <span className="text-4xl">{currentTab?.icon}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center space-y-1.5">
            <h2 className="text-[#1a4d3a] font-bold text-lg">{currentTab?.title}</h2>
            <p className="text-[#1a4d3a]/60 text-xs leading-relaxed px-2">{currentTab?.description}</p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              if (activeTab === "content") setShowSidebar(true);
              else if (activeTab === "register") setCurrentPage("content-detail");
            }}
            className="w-full py-3 rounded-lg font-bold text-sm text-white bg-gradient-to-r from-[#1a4d3a] to-[#27835c] hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
          >
            <span>Start {currentTab?.title}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Info Box */}
          <div className="bg-white/40 backdrop-blur-sm border border-[#1a4d3a]/10 rounded-lg p-3.5 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#27835c] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#1a4d3a] font-bold text-[10px] uppercase tracking-wider mb-1">How it works</p>
                <p className="text-[#1a4d3a]/70 text-xs leading-relaxed">
                  {activeTab === "content" && "Automatically scan pages for images, videos & audio with instant Yakoa originality checks."}
                  {activeTab === "ip" && "Detect IP infringements, brand matches & existing registrations with confidence scoring."}
                  {activeTab === "register" && "Register your original content on Story Protocol blockchain with one-click licensing."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-[#1a4d3a]/10 flex items-center justify-between text-[10px] text-[#1a4d3a]/50">
        <span className="font-medium">v1.0.0</span>
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="text-[#27835c] font-bold hover:text-[#1a4d3a] transition-colors flex items-center gap-1 group"
        >
          Dashboard <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );

  // ============= CONTENT DETECTION SIDEBAR =============
  const ContentSidebarView = () => (
    <div className="w-full h-full bg-gradient-to-b from-[#e8dcbb] to-[#f5f5f0] rounded-xl shadow-2xl overflow-hidden border border-[#1a4d3a]/10 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a4d3a] to-[#27835c] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(false)}
            className="text-white bg-white/10 p-1.5 rounded-lg hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <div>
            <h2 className="text-white font-bold text-sm">Detected Content</h2>
            <p className="text-[#8dc9b0] text-xs">Current Page</p>
          </div>
        </div>
        <span className="bg-white/20 text-white px-2.5 py-1 rounded-full text-xs font-bold border border-white/30">{detectedContent.length}</span>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f5f5f0]">
        {detectedContent.map((content) => (
          <div
            key={content.id}
            onClick={() => setSelectedContent(content)}
            className="bg-white rounded-xl overflow-hidden border border-[#1a4d3a]/10 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            {/* Image */}
            <div className="relative w-full h-32 bg-gradient-to-br from-[#8dc9b0]/10 to-[#1a4d3a]/5 overflow-hidden">
              <img src={content.url} alt="content" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              
              {/* Status Badge */}
              <div className="absolute top-2.5 right-2.5">
                {content.status === "original" && (
                  <div className="bg-[#27835c] text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
                    <Check className="w-3 h-3" />
                    Original
                  </div>
                )}
                {content.status === "brand_ip" && (
                  <div className="bg-[#f97316] text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
                    <AlertCircle className="w-3 h-3" />
                    Brand IP
                  </div>
                )}
                {content.status === "registered" && (
                  <div className="bg-[#ef4444] text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
                    <Lock className="w-3 h-3" />
                    Registered
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[#1a4d3a] font-semibold text-xs">{content.size}</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-[#8dc9b0]/30 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        content.confidence > 90 ? "bg-[#27835c]" : content.confidence > 70 ? "bg-[#f97316]" : "bg-[#ef4444]"
                      }`}
                      style={{ width: `${content.confidence}%` }}
                    />
                  </div>
                  <span className="text-[#1a4d3a] font-bold text-xs w-8">{content.confidence}%</span>
                </div>
              </div>

              {content.brand && <p className="text-[10px] text-[#1a4d3a]/60">Matched: <span className="font-bold text-[#1a4d3a]">{content.brand}</span></p>}
              {content.owner && <p className="text-[10px] text-[#1a4d3a]/60">Owner: <span className="font-mono text-[#1a4d3a]">{content.owner}</span></p>}

              {/* Action Button */}
              {content.status === "original" && (
                <button className="w-full mt-2 bg-gradient-to-r from-[#1a4d3a] to-[#27835c] text-white py-2 rounded-lg text-xs font-bold hover:shadow-lg transition-all">
                  🛡️ Protect This
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-white border-t border-[#1a4d3a]/10">
        <button className="w-full bg-gradient-to-r from-[#1a4d3a] to-[#27835c] text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
          🛡️ Protect All Original ({detectedContent.filter((c) => c.status === "original").length})
        </button>
      </div>
    </div>
  );

  // ============= DASHBOARD VIEW =============
  const DashboardView = () => (
    <div className="w-full h-full bg-gradient-to-b from-[#e8dcbb] to-[#f5f5f0] rounded-xl shadow-2xl overflow-hidden border border-[#1a4d3a]/10 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a4d3a] to-[#27835c] px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentPage("main")} className="text-white bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <div>
              <h1 className="text-white font-bold text-base">Protected Assets</h1>
              <p className="text-[#8dc9b0] text-xs font-medium">Your IP Shield</p>
            </div>
          </div>
          <Home className="w-5 h-5 text-white" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Total", value: "47", icon: "📊" },
            { label: "Protected", value: "45", icon: "🛡️" },
            { label: "Earnings", value: "$234", icon: "💰" },
            { label: "Pending", value: "2", icon: "⏳" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/10">
              <p className="text-white text-lg mb-1">{stat.icon}</p>
              <p className="text-white font-bold text-sm">{stat.value}</p>
              <p className="text-[#8dc9b0] text-[9px] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="grid grid-cols-2 gap-4">
          {protectedIPs.map((ip) => (
            <div
              key={ip.id}
              className="bg-white rounded-xl overflow-hidden border border-[#1a4d3a]/10 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative w-full h-32 bg-gradient-to-br from-[#8dc9b0]/10 to-[#1a4d3a]/5 overflow-hidden">
                <img src={ip.url} alt={ip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  {ip.status === "protected" ? (
                    <div className="bg-[#27835c] text-white px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      Protected
                    </div>
                  ) : (
                    <div className="bg-[#f97316] text-white px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      Pending
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-3 space-y-2">
                <h3 className="text-[#1a4d3a] font-bold text-xs line-clamp-1">{ip.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#1a4d3a]/60 text-[9px]">{ip.storyId}</span>
                  <span className="text-[#27835c] font-bold text-xs">{ip.earnings}</span>
                </div>
                <button className="w-full text-[#1a4d3a] hover:text-[#27835c] text-xs font-bold transition-colors border-t border-[#1a4d3a]/10 pt-2">
                  View on Story →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-4 bg-white border-t border-[#1a4d3a]/10 flex gap-2">
        <button className="flex-1 bg-gradient-to-r from-[#1a4d3a] to-[#27835c] text-white py-2.5 rounded-lg font-bold text-xs hover:shadow-lg transition-all">
          <Zap className="w-3.5 h-3.5 inline mr-2" />
          Detect New Content
        </button>
        <button className="flex-1 border-2 border-[#1a4d3a] text-[#1a4d3a] py-2 rounded-lg font-bold text-xs hover:bg-[#1a4d3a]/5 transition-all">
          Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f5f5f0] to-[#e8dcbb] p-4 gap-6">
      {/* Main Panel */}
      <div className="w-96 h-screen max-h-[800px]">
        {currentPage === "main" && <MainPanelView />}
        {currentPage === "dashboard" && <DashboardView />}
        {currentPage === "content-detail" && <MainPanelView />}
      </div>

      {/* Sidebar (when showing detected content) */}
      {showSidebar && (
        <div className="w-96 h-screen max-h-[800px] animate-in slide-in-from-right-96">
          <ContentSidebarView />
        </div>
      )}

      {/* Responsive hint */}
      <div className="text-center text-xs text-[#1a4d3a]/50 absolute bottom-4 left-4">
        💡 Extension UI - Responsive Design
      </div>
    </div>
  );
}