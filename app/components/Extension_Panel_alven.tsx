"use client";

import React, { useState, useEffect, useRef } from "react";
import { LoginScreen } from "./LoginScreen";
import { getYakoaClient } from "@/lib/yakoa/client";
import { getStoryClient } from "@/lib/story/client";
import type { ContentCheckResult } from "@/lib/yakoa/client";
import type { RegisterIPResult, IPAssetMetadata, NFTMetadata, LicenseTerms } from "@/lib/story/client";
import {
  verifyContentWithYakoa,
  registerIPOnStory,
  getWorkflowPath,
  getVerificationStatusInfo
} from "./helpers/yakoaStoryIntegration";
import {
  ChevronRight,
  Shield,
  Lock,
  Zap,
  Home,
  Check,
  AlertCircle,
  Clock,
  Bell,
  TrendingUp,
  Flame,
  Heart,

  Cpu,
  Code,
  BookOpen,
  X,
  Menu,
  Aperture,
  FileText,
  Loader2,
  Link as LinkIcon,
  Power,
  Activity,
  Search,
  Globe,
  ShieldCheck,
  AlertTriangle,
  DollarSign,
  PenTool,
  StopCircle,
  User,
} from "lucide-react";

// =================================================================
// TYPE DEFINITIONS
// =================================================================
interface AlertItem {
  id: number;
  type: string;
  severity: string;
  title: string;
  description: string;
  detailedInfo: string;
  timestamp: Date;
  ipId: string;
  action: string;
  icon: React.ReactNode;
  color: string;
}

interface DetectedContent {
  id: number;
  url: string;
  type: string;
  status: string;
  confidence: number;
  size: string;
  title: string;
  alt: string;
  brand?: string;
  owner?: string;
}

interface ProtectedIPItem {
  id: number;
  url: string;
  title: string;
  status: string;
  earnings: string;
  alerts: number;
  storyId: string;
}

// =================================================================
// KOMPONEN LOGO CUSTOM
// =================================================================
const IPShieldLogo = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient
        id="shieldGradient"
        x1="12"
        y1="2"
        x2="12"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <filter
        id="glow"
        x="-4"
        y="-4"
        width="32"
        height="32"
        filterUnits="userSpaceOnUse"
      >
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      fill="url(#shieldGradient)"
      stroke="#a5f3fc"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#glow)"
    />
    <path
      d="M12 6v6m0 0l3-3m-3 3l-3-3m3 8v-2"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);

// =================================================================
// KONFIGURASI TEMA
// =================================================================
const THEME_COLORS = {
  YAKOA_GRADIENT: "from-blue-500/90 to-cyan-500/90",
  STORY_GRADIENT: "from-purple-500/90 to-pink-500/90",
  EMERALD_GRADIENT: "from-emerald-500/90 to-green-500/90",
  BASE_DARK: "bg-[#0a0f1d]",
};

// =================================================================
// DATA MOCK UNTUK DROPDOWN & STATUS (P0-2)
// =================================================================
const LICENSE_OPTIONS = [
  {
    id: "COMMERCIAL_USE",
    label: "Commercial Use",
    desc: "Allow commercial use with royalty",
    icon: <DollarSign className="w-3.5 h-3.5" />,
    royaltyEnabled: true,
  },
  {
    id: "NON_COMMERCIAL",
    label: "Non-Commercial Only",
    desc: "Free for personal use only",
    icon: <PenTool className="w-3.5 h-3.5" />,
    royaltyEnabled: false,
  },
  {
    id: "NO_DERIVATIVES",
    label: "No Derivatives",
    desc: "Cannot be modified or remixed",
    icon: <StopCircle className="w-3.5 h-3.5" />,
    royaltyEnabled: false,
  },
];
const TYPE_OPTIONS = [
  { id: "IMAGE", label: "Image", icon: <Aperture className="w-3.5 h-3.5" /> },
  { id: "AUDIO", label: "Audio", icon: <Bell className="w-3.5 h-3.5" /> },
  { id: "VIDEO", label: "Video", icon: <Zap className="w-3.5 h-3.5" /> },
  {
    id: "TEXT",
    label: "Text/Book",
    icon: <FileText className="w-3.5 h-3.5" />,
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  ORIGINAL: {
    bg: "bg-emerald-500/90 border-emerald-400/30",
    text: "text-white",
    icon: <Check className="w-3 h-3" />,
    label: "Original",
  },
  BRAND_IP_DETECTED: {
    bg: "bg-orange-500/90 border-orange-400/30",
    text: "text-white",
    icon: <AlertTriangle className="w-3 h-3" />,
    label: "Brand IP",
  },
  ALREADY_REGISTERED: {
    bg: "bg-red-500/90 border-red-400/30",
    text: "text-white",
    icon: <Lock className="w-3 h-3" />,
    label: "Registered",
  },
  PROCESSING: {
    bg: "bg-blue-500/90 border-blue-400/30",
    text: "text-white",
    icon: <Loader2 className="w-3 h-3 animate-spin" />,
    label: "Analyzing",
  },
  PROTECTED: {
    // New status for registered local file
    bg: "bg-purple-500/90 border-purple-400/30",
    text: "text-white",
    icon: <ShieldCheck className="w-3 h-3" />,
    label: "Protected",
  },
};

// Dummy user credentials for login with roles
const DUMMY_USERS = [
  { username: "admin", password: "admin123", name: "Admin User", email: "admin@ipshield.io", avatar: "", role: "admin" },
  { username: "demo", password: "demo123", name: "Demo User", email: "demo@ipshield.io", avatar: "", role: "demo" }
];

// Role-based permissions
const PERMISSIONS = {
  admin: {
    canEdit: true,
    canDelete: true,
    canViewAllData: true,
    maxIPRegistrations: Infinity,
    hasAdvancedAnalytics: true,
  },
  demo: {
    canEdit: false,
    canDelete: false,
    canViewAllData: false,
    maxIPRegistrations: 5,
    hasAdvancedAnalytics: false,
  }
};

export default function IPShieldExtension() {
  // =================================================================
  // AUTHENTICATION STATE
  // =================================================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<typeof DUMMY_USERS[0] | null>(null);
  const [loginError, setLoginError] = useState("");

  // =================================================================
  // STATE MANAGEMENT
  // =================================================================
  const [currentPage, setCurrentPage] = useState("main");
  const [activeTab, setActiveTab] = useState("content");

  // Views States
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAnalysisView, setShowAnalysisView] = useState(false);
  const [showRegisterView, setShowRegisterView] = useState(false);

  // Data State
  const [activeContent, setActiveContent] = useState<DetectedContent | null>(null); // Konten yang sedang diproses (dari halaman web)
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [notificationQueue, setNotificationQueue] = useState<AlertItem[]>([]);
  const [isSidebarClosing, setIsSidebarClosing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // NEW STATES for Quick Protect
  const [showQuickProtectSuccess, setShowQuickProtectSuccess] = useState(false);
  const [quickProtectSuccessData, setQuickProtectSuccessData] = useState<{ title: string; assetType: string; previewUrl: string; status: string } | null>(null);

  // NEW STATES for Edit IP
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIP, setEditingIP] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    earnings: "",
  });

  // NEW STATES for Yakoa & Story Integration
  const [yakoaClient] = useState(() => getYakoaClient());
  const [storyClient] = useState(() => getStoryClient());
  const [verificationResults, setVerificationResults] = useState<Map<number, ContentCheckResult>>(new Map());
  const [isVerifying, setIsVerifying] = useState<Set<number>>(new Set());
  const [registrationStatus, setRegistrationStatus] = useState<{ isRegistering: boolean; progress: string }>({
    isRegistering: false,
    progress: ""
  });

  // =================================================================
  // DATA MOCK (Sesuai P0 & P2)
  // =================================================================

  const mockAlerts = [
    {
      id: 1,
      type: "infringement",
      severity: "high",
      title: "New Infringement Detected",
      description: "Your artwork 'Neon City' appeared on OpenSea",
      detailedInfo: "Similarity: 98% (Exact Match) - User: 0xBad...Actor",
      timestamp: new Date(Date.now() - 5 * 60000),
      ipId: "0x123...abc",
      action: "View Report",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "from-red-500 via-rose-500 to-red-600",
    },
    {
      id: 2,
      type: "registered",
      severity: "low",
      title: "IP Asset Minted",
      description: "Successfully registered 'Character Design #04'",
      detailedInfo: "Story Protocol Tx: 0x8f4e2...99a",
      timestamp: new Date(Date.now() - 15 * 60000),
      ipId: "0x456...def",
      action: "View on Explorer",
      icon: <LinkIcon className="w-5 h-5" />,
      color: "from-purple-500 via-fuchsia-500 to-pink-600",
    },
    {
      id: 3,
      type: "earning",
      severity: "low",
      title: "Royalty Received",
      description: "You earned 50 USDC from Commercial License",
      detailedInfo: "License bought by: CreativeAgency_DAO",
      timestamp: new Date(Date.now() - 2 * 3600000),
      ipId: "0xabc...jkl",
      action: "Claim",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-amber-500 via-yellow-500 to-amber-600",
    },
  ];

  // Data konten simulasi hasil scan halaman (P0 - Auto Content Detection & Smart IP Analysis)
  const [detectedContent, setDetectedContent] = useState([
    {
      id: 1,
      url: "https://www.exitlag.com/blog/wp-content/uploads/2025/07/cyberpunk-2077-characters.jpeg",
      type: "image",
      status: "ORIGINAL",
      confidence: 100,
      size: "1920x1080",
      title: "Cyber Punk Character",
      alt: "Cyber Punk Character",
    },
    {
      id: 2,
      url: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/34604cb1-acc6-4a40-bf26-60185ca7da5c/NIKE+AIR+MAX+1+ESS.png",
      type: "image",
      status: "BRAND_IP_DETECTED",
      brand: "Nike Inc.",
      confidence: 95,
      size: "800x600",
      title: "Sneaker Concept",
      alt: "Sneaker Concept",
    },
    {
      id: 3,
      url: "https://media.istockphoto.com/id/1471683196/vector/black-wavy-lines-isolated-on-white-abstract-background-design.jpg?s=612x612&w=0&k=20&c=OiEcsV3iKnIS96d2fHbVXQS-aWBeWaTfx5o_fY3Q_Rg=",
      type: "image",
      status: "ALREADY_REGISTERED",
      owner: "0x742d...5678",
      confidence: 100,
      size: "2560x1440",
      title: "Abstract Wave",
      alt: "Abstract Wave",
    },
    {
      id: 4,
      url: "https://soundcloud.com/gabriele_romano/the-midnight-shadows?in=ferzrrn/sets/synthwave&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      type: "audio",
      status: "ORIGINAL",
      confidence: 100,
      size: "3:45 min",
      title: "Synthwave Track 01",
      alt: "Synthwave Track 01",
    },
  ]);

  // UBAH: protectedIPs menjadi state agar bisa ditambahkan item baru
  const [protectedIPs, setProtectedIPs] = useState([
    {
      id: 1,
      url: "https://elements-resized.envatousercontent.com/elements-video-cover-images/files/4f20f212-5478-465d-8d98-27a42ef37909/inline_image_preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=62214d33bae4cef68c427f56de52785aef2ca1c0225d464948bfab1846635570",
      title: "Neon City v2",
      status: "protected",
      earnings: "$45.20",
      alerts: 0,
      storyId: "0x123...abc",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/296649/pexels-photo-296649.jpeg?cs=srgb&dl=pexels-vladyslav-dukhin-296649.jpg&fm=jpg",
      title: "Photo Collection",
      status: "protected",
      earnings: "$124.50",
      alerts: 2,
      storyId: "0x456...def",
    },
    {
      id: 3,
      url: "https://www.pixartprinting.it/blog/wp-content/uploads/2023/12/1978-1024x561.jpg",
      title: "Brand Logo",
      status: "protected",
      earnings: "$890.00",
      alerts: 0,
      storyId: "0xabc...jkl",
    },
  ]);

  const tabs = [
    {
      id: "content",
      title: "Detect & Protect",
      actionLabel: "Start Detection",
      icon: <Zap className="w-5 h-5" />,
      description: "Auto-scan page content & analyze with Yakoa.",
      gradient: THEME_COLORS.YAKOA_GRADIENT,
    },
    {
      id: "ip",
      title: "IP Analysis",
      actionLabel: "Start IP Analysis",
      icon: <Cpu className="w-5 h-5" />,
      description: "Deep content fingerprinting & risk assessment.",
      gradient: "from-teal-500/90 to-cyan-500/90",
    },
    {
      id: "register",
      title: "Register IP",
      actionLabel: "Start Registration",
      icon: <Code className="w-5 h-5" />,
      description: "One-click registration to Story Protocol.",
      gradient: THEME_COLORS.STORY_GRADIENT,
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab);

  // =================================================================
  // LOGIC & EFFECTS
  // =================================================================

  // ... [Animasi Background Effect - Tidak diubah] ...
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 600;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const MAX_PARTICLES = 80;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(10, 15, 25, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3
        );
        gradient.addColorStop(0, `rgba(100, 255, 255, ${p.opacity})`);
        gradient.addColorStop(1, "rgba(100, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(100, 255, 255, ${(1 - dist / 90) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);
  // ... [Monitoring Background Process - Tidak diubah] ...
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isMonitoring) {
      interval = setInterval(() => {
        setNotificationQueue((prevQueue) => {
          if (prevQueue.length === 0) {
            const randomAlert =
              mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
            const newAlert = { ...randomAlert, id: Date.now() };
            setTimeout(() => {
              setNotificationQueue((currentQueue) =>
                currentQueue.filter((a) => a.id !== newAlert.id)
              );
            }, 5000);
            return [...prevQueue, newAlert];
          }
          return prevQueue;
        });
      }, 10000); // Check every 10s
    } else {
      setNotificationQueue([]);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Handlers
  const closeAllOverlays = () => {
    setIsSidebarClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setShowRegisterView(false);
      setShowAnalysisView(false);
      setIsSidebarClosing(false);
      setActiveContent(null);
    }, 300);
  };

  const openRegisterForContent = (content: DetectedContent) => {
    setActiveContent(content); // Set konten spesifik
    setShowRegisterView(true); // Buka form
  };

  const updateContentStatus = (id: number, newStatus: string) => {
    setDetectedContent((prev) =>
      prev.map((content) =>
        content.id === id ? { ...content, status: newStatus } : content
      )
    );
  };

  // Helper: Get user permissions
  const getUserPermissions = () => {
    if (!currentUser) return PERMISSIONS.demo;
    return PERMISSIONS[currentUser.role as keyof typeof PERMISSIONS] || PERMISSIONS.demo;
  };

  // Helper: Check if user can perform action
  const canUserPerform = (action: 'edit' | 'delete' | 'register') => {
    const perms = getUserPermissions();
    if (action === 'edit') return perms.canEdit;
    if (action === 'delete') return perms.canDelete;
    if (action === 'register') return protectedIPs.length < perms.maxIPRegistrations;
    return false;
  };

  // HANDLER: Add new IP to the dashboard list (with role-based limit)
  const addProtectedIP = (ipData: { title: string; assetType?: string; previewUrl?: string; status?: string }) => {
    const perms = getUserPermissions();

    // Check if demo user has reached limit
    if (protectedIPs.length >= perms.maxIPRegistrations) {
      alert(`Registration Limit Reached!\n\nDemo users can only register up to ${perms.maxIPRegistrations} IP assets.\n\nUpgrade to Admin for unlimited registrations.`);
      return;
    }

    setProtectedIPs((prev) => [
      {
        id: Date.now(), // Unique ID
        url:
          ipData.previewUrl ||
          "https://via.placeholder.com/200x150/7000A0/ffffff?text=IP+NFT", // Gunakan URL preview atau placeholder
        title: ipData.title,
        status: "protected",
        earnings: "$0.00", // Start with 0 earnings
        alerts: 0,
        storyId: "0x" + Math.random().toString(16).substring(2, 8) + "...", // Mock ID
      },
      ...prev, // Add new IP at the front
    ]);
  };

  // Login handler
  const handleLogin = (username: string, password: string) => {
    const user = DUMMY_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage("main");
  };

  // Edit IP handlers
  const openEditModal = (ip: any) => {
    setEditingIP(ip);
    setEditFormData({
      title: ip.title,
      earnings: ip.earnings,
    });
    setShowEditModal(true);
  };

  const saveEditIP = () => {
    if (!editingIP) return;

    setProtectedIPs(prev =>
      prev.map(ip =>
        ip.id === editingIP.id
          ? { ...ip, title: editFormData.title, earnings: editFormData.earnings }
          : ip
      )
    );

    setShowEditModal(false);
    setEditingIP(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingIP(null);
  };

  // NEW HANDLER: Quick Protect for detected content (Skip form)
  const quickProtect = (content: DetectedContent) => {
    // 1. Setup Status & Close Sidebar
    setShowSidebar(false); // Close sidebar immediately

    const registeredIpData = {
      title: content.title,
      assetType: content.type.toUpperCase(),
      previewUrl: content.url,
      status: "PROCESSING",
    };
    setQuickProtectSuccessData(registeredIpData);
    setShowQuickProtectSuccess(true);

    setTimeout(() => {
      // 2. Add to Dashboard (Final Action)
      addProtectedIP(registeredIpData);

      // 3. Update status in detected list
      updateContentStatus(content.id, "PROTECTED");

      // 4. Update status in success view
      setQuickProtectSuccessData({ ...registeredIpData, status: "PROTECTED" });
    }, 2000); // 2 second delay for simulation
  };

  // =================================================================
  // SUB-KOMPONEN
  // =================================================================

  const NotificationToast = ({ alert, isFirst }: { alert: AlertItem; isFirst: boolean }) => (
    <div
      className={`fixed ${isFirst ? "top-6 right-6" : "top-24 right-6"} z-[60] max-w-sm animate-in slide-in-from-right-96 duration-300`}
    >
      <div
        className="relative group cursor-pointer"
        onClick={() => setCurrentPage("alerts")}
      >
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${alert.color} rounded-2xl opacity-40 blur-lg group-hover:opacity-60 transition-opacity`}
        ></div>
        <div
          className={`relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30 backdrop-blur-xl hover:scale-105 transition-transform duration-300`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${alert.color} opacity-5`}
          ></div>
          <div className="relative p-4 text-white">
            <div className="flex items-start gap-3">
              <span className="text-2xl animate-pulse drop-shadow-[0_0_10px_rgba(100,255,255,0.5)]">
                {alert.icon}
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-0.5 text-cyan-50">
                  {alert.title}
                </h3>
                <p className="text-xs text-gray-300 mb-2">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-medium">
                    Just now
                  </span>
                  <span className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline transition-colors">
                    {alert.action}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MainPanelView = () => (
    <div className="w-full h-full flex flex-col relative z-10">
      <div className="relative px-6 pt-5 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"></div>
        <div className="relative z-10">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <IPShieldLogo size={20} />
                </div>
              </div>
              <div>
                <h1 className="text-white font-black text-xl tracking-tight bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(100,255,255,0.5)]">
                  IP Shield
                </h1>
                <p className="text-cyan-400 text-xs font-bold flex items-center gap-1">
                  Yakoa <span className="text-purple-400 mx-0.5">|</span> Story
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* TOGGLE MONITORING */}
              <button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`relative p-2 rounded-lg transition-all duration-300 group hover:scale-110 active:scale-95 ${isMonitoring
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                  : "bg-gray-800/50 border border-gray-700 text-gray-400 hover:bg-gray-700/50"
                  }`}
                title={isMonitoring ? "Monitoring Active" : "Monitoring Paused"}
              >
                {isMonitoring ? (
                  <>
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]"></span>
                    <Activity className="w-4 h-4" />
                  </>
                ) : (
                  <Power className="w-4 h-4" />
                )}
              </button>

              {/* BELL */}
              <button
                onClick={() => setCurrentPage("alerts")}
                className="relative flex items-center gap-2 group hover:scale-105 transition-transform active:scale-95"
              >
                <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-lg px-3 py-1.5 rounded-full border border-cyan-500/30 group-hover:border-cyan-400/50 transition-all">
                  <div className="flex items-center gap-2">
                    <Bell
                      className={`w-4 h-4 text-cyan-400 ${isMonitoring ? "group-hover:rotate-12 transition-transform" : ""}`}
                    />
                    <span className="text-cyan-50 text-xs font-medium">
                      Alerts
                    </span>
                  </div>
                </div>
                {(mockAlerts.length > 0 || notificationQueue.length > 0) && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50">
                    {mockAlerts.length + notificationQueue.length}
                  </span>
                )}
              </button>

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                className="relative flex items-center gap-2 group hover:scale-105 transition-transform active:scale-95 ml-1"
                title="Logout"
              >
                <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-lg px-3 py-1.5 rounded-full border border-purple-500/30 group-hover:border-purple-400/50 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{currentUser?.avatar || <User className="w-4 h-4" />}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-purple-50 text-[10px] font-medium leading-tight">
                        {currentUser?.username || "User"}
                      </span>
                      <span className={`text-[8px] font-bold leading-tight ${currentUser?.role === 'admin' ? 'text-yellow-400' : 'text-blue-400'}`}>
                        {currentUser?.role === 'admin' ? 'ADMIN' : 'DEMO'}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Detected (Y)",
                value: detectedContent.length,
                icon: <Aperture className="w-5 h-5" />,
                color: "from-blue-500 to-cyan-600",
              },
              {
                label: "Protected (S)",
                value: protectedIPs.length,
                icon: <LinkIcon className="w-5 h-5" />,
                color: "from-purple-500 to-pink-600",
                limit: getUserPermissions().maxIPRegistrations !== Infinity
                  ? `${protectedIPs.length}/${getUserPermissions().maxIPRegistrations}`
                  : null,
              },
              {
                label: "Alerts",
                value: mockAlerts.length,
                icon: <AlertTriangle className="w-5 h-5" />,
                color: "from-amber-500 to-yellow-600",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative group cursor-pointer hover:scale-[1.05] transition-transform duration-300"
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity`}
                ></div>
                <div className="relative bg-gray-900/40 backdrop-blur-md rounded-xl p-2.5 text-center border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all shadow-xl shadow-gray-950">
                  <p className="text-cyan-400 text-[10px] font-bold mb-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-white font-black text-sm drop-shadow-[0_0_10px_rgba(100,255,255,0.3)]">
                    {stat.limit || stat.value}
                  </p>
                  {stat.limit && (
                    <p className="text-[8px] text-yellow-400 font-bold mt-0.5">
                      Demo Limit
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pt-3 pb-4">
        <div className="relative bg-gray-900/30 backdrop-blur-md rounded-xl p-1.5 flex gap-1.5 border border-cyan-500/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg font-medium text-xs transition-all duration-300 overflow-hidden group hover:scale-[1.02] active:scale-95 ${activeTab === tab.id
                ? "text-white shadow-xl shadow-cyan-900/50"
                : "text-gray-400 hover:text-cyan-300"
                }`}
            >
              {activeTab === tab.id && (
                <>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-80`}
                  ></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] rounded-full"></div>
                </>
              )}
              <span
                className={`relative text-lg group-hover:scale-110 transition-transform ${activeTab === tab.id ? "drop-shadow-[0_0_10px_rgba(100,255,255,0.5)]" : ""}`}
              >
                {tab.icon}
              </span>
              <span className="relative">{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 pb-5 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <span
              className={`bg-gradient-to-r ${activeTab === "register" ? "from-purple-500/20 to-pink-500/20 text-purple-400" : "from-blue-500/20 to-cyan-500/20 text-cyan-400"} px-3 py-1 rounded-full text-xs font-bold border border-current/30 backdrop-blur-sm`}
            >
              {activeTab === "content" && "Yakoa Integration: Real-time"}
              {activeTab === "ip" && "AI-Powered IP Deep Analysis"}
              {activeTab === "register" && "Story Protocol: IP NFT"}
            </span>
          </div>

          <div className="flex justify-center">
            <div className="relative group">
              <div
                className={`absolute -inset-3 bg-gradient-to-r ${currentTab?.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}
              ></div>
              <div
                className={`relative w-28 h-28 rounded-2xl bg-gradient-to-br ${currentTab?.gradient} flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500`}
              >
                <span className="text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  {currentTab?.icon}
                </span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)] rounded-2xl"></div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-1.5">
            <h2 className="text-white font-black text-xl tracking-wide drop-shadow-[0_0_10px_rgba(100,255,255,0.3)]">
              {currentTab?.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed px-2">
              {currentTab?.description}
            </p>
          </div>

          {/* !!! TOMBOL UTAMA DENGAN LOGO BARU !!! */}
          <button
            onClick={() => {
              if (activeTab === "content") setShowSidebar(true);
              if (activeTab === "register") {
                // Default ke konten pertama yang ORIGINAL (P0-3 flow)
                const originalContent = detectedContent.find(
                  (c) => c.status === "ORIGINAL"
                );
                const contentToRegister = originalContent || null; // Tidak ada konten terdeteksi = null
                setActiveContent(contentToRegister);
                setShowRegisterView(true);
              }
              if (activeTab === "ip") setShowAnalysisView(true);
            }}
            className={`relative w-full py-3 rounded-xl font-bold text-base text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-2`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${currentTab?.gradient}`}
            ></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">
              <IPShieldLogo
                size={20}
                className="group-hover:rotate-12 transition-transform duration-500"
              />
              <span>{currentTab?.actionLabel}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            <div className="relative bg-gray-900/30 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-4 space-y-2.5">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(100,255,255,0.5)]" />
                <div>
                  <p className="text-white font-bold text-sm tracking-wide mb-1">
                    IP & Web3 Ecosystem
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {activeTab === "content" &&
                      "Powered by Yakoa, this extension performs deep scans to protect your original content from digital abuse."}
                    {activeTab === "ip" &&
                      "Using advanced machine learning to verify ownership and potential infringement across the web."}
                    {activeTab === "register" &&
                      "Story Protocol integration enables the minting of 'IP NFTs' to track lineage, licensing, and royalties on the blockchain."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-6 py-3 border-t border-cyan-500/20 bg-gray-950/20 backdrop-blur-sm">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="flex items-center justify-between text-[10px] text-gray-500">
          <span
            className={`font-medium flex items-center gap-1.5 ${isMonitoring ? "text-emerald-400" : "text-gray-500"}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isMonitoring ? "bg-emerald-400 animate-pulse" : "bg-gray-600"}`}
            ></span>
            {isMonitoring ? "System Active" : "System Paused"}
          </span>
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center gap-1 group hover:scale-105 transition-transform active:scale-95"
          >
            IP Dashboard{" "}
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  // --- CONTENT SIDEBAR VIEW (P0 - Auto Detection & Analysis) ---
  // MENERIMA PROP quickProtect
  const ContentSidebarView = ({ quickProtect }: { quickProtect: (content: DetectedContent) => void }) => (
    <div
      className={`w-[400px] h-[600px] absolute inset-0 transition-transform duration-300 z-50 ${isSidebarClosing ? "translate-x-full" : "translate-x-0"} ${THEME_COLORS.BASE_DARK}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] via-teal-900/20 to-[#0a0f1d] z-0 opacity-95"></div>

      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="relative px-5 py-4 overflow-hidden border-b border-cyan-500/20">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={closeAllOverlays}
                className="relative group p-1.5 text-white bg-gray-900/50 backdrop-blur-md rounded-lg border border-teal-500/30 hover:border-teal-400/50 transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <div>
                <h2 className="text-white font-black text-sm">
                  Detected Content
                </h2>
                <p className="text-teal-400 text-xs font-bold">
                  Yakoa Live Scan
                </p>
              </div>
            </div>
            <span className="bg-teal-500/20 text-teal-300 px-2.5 py-1 rounded-full text-xs font-bold border border-teal-500/30 backdrop-blur-sm">
              {detectedContent.length} Items
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
          {detectedContent.map((content) => {
            const statusInfo =
              STATUS_COLORS[content.status] || STATUS_COLORS.PROCESSING;
            // Hanya izinkan aksi jika status ORIGINAL
            const actionDisabled = content.status !== "ORIGINAL";

            return (
              <div
                key={content.id}
                className="relative group cursor-pointer hover:scale-[1.01] transition-transform duration-300"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-xl opacity-0 group-hover:opacity-60 blur-sm transition-opacity"></div>
                <div className="relative bg-gray-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-teal-500/20 group-hover:border-teal-400/40 transition-all duration-300">
                  {/* Gambar / Preview */}
                  <div className="relative w-full h-32 bg-gradient-to-br from-teal-900/20 to-cyan-900/10 overflow-hidden">
                    <img
                      src={content.url}
                      alt="content"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>

                    {/* STATUS BADGE - SESUAI P0-2 */}
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`flex items-center gap-1 ${statusInfo.bg} ${statusInfo.text} text-[10px] font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm`}
                      >
                        {statusInfo.icon} {statusInfo.label} (
                        {content.confidence}%)
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="text-[10px] font-medium bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                        {content.size}
                      </span>
                    </div>
                  </div>

                  <div className="p-3">
                    <h4 className="text-white text-sm font-bold truncate mb-1">
                      {content.title}
                    </h4>
                    <p className="text-gray-400 text-[10px] mb-3 truncate">
                      {content.status === "BRAND_IP_DETECTED"
                        ? `Match: ${content.brand}`
                        : content.status === "ALREADY_REGISTERED"
                          ? `Owner: ${content.owner}`
                          : "No matches found in Yakoa DB"}
                    </p>

                    {/* ACTION BUTTON - UBAH LOGIKA UNTUK QUICK PROTECT */}
                    <button
                      onClick={() => quickProtect(content)} // LANGSUNG PANGGIL quickProtect
                      disabled={actionDisabled}
                      className={`relative w-full py-2 rounded-lg text-xs font-bold text-white overflow-hidden group/btn hover:scale-[1.02] active:scale-95 transition-transform ${actionDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600"></div>
                      <span className="relative flex items-center justify-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        {content.status === "ORIGINAL"
                          ? "Protect This (Quick)"
                          : "Cannot Protect"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative px-4 py-3 border-t border-teal-500/20 bg-gray-950/20 backdrop-blur-sm">
          <button className="relative w-full py-2.5 rounded-lg font-bold text-sm text-white overflow-hidden group hover:scale-[1.02] active:scale-95 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600"></div>
            <span className="relative flex items-center justify-center gap-2">
              <Aperture className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              Full Page Deep Scan
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // --- IP ANALYSIS VIEW (Visual Demo) - Tidak Berubah ---
  const IPAnalysisView = () => {
    // ... [Kode tetap sama] ...
    const [status, setStatus] = useState("scanning");
    const [progress, setProgress] = useState(0);
    const [scanText, setScanText] = useState("Initializing scan...");

    useEffect(() => {
      if (status === "scanning") {
        const timer = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(timer);
              setStatus("result");
              return 100;
            }
            if (prev < 30) setScanText("Checking Domain Reputation...");
            else if (prev < 60) setScanText("Verifying Blockchain Records...");
            else if (prev < 90) setScanText("Analyzing Content Fingerprint...");
            return prev + 2;
          });
        }, 60);
        return () => clearInterval(timer);
      }
    }, [status]);

    return (
      <div
        className={`w-[400px] h-[600px] absolute inset-0 transition-transform duration-300 z-50 ${isSidebarClosing ? "translate-x-full" : "translate-x-0"} ${THEME_COLORS.BASE_DARK}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] via-teal-900/30 to-[#0a0f1d] z-0 opacity-95"></div>

        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="relative px-5 py-4 overflow-hidden border-b border-teal-500/20">
            <div className="relative flex items-center gap-3">
              <button
                onClick={closeAllOverlays}
                className="relative group p-1.5 text-white bg-gray-900/50 backdrop-blur-md rounded-lg border border-teal-500/30 hover:border-teal-400/50 transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <div>
                <h2 className="text-white font-black text-sm">Deep Analysis</h2>
                <p className="text-teal-400 text-xs font-bold">
                  Security & Trust Score
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            {status === "scanning" ? (
              <div className="text-center space-y-6">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
                  <span className="text-2xl font-black text-white">
                    {progress}%
                  </span>
                </div>
                <p className="text-sm font-bold text-teal-400 animate-pulse">
                  {scanText}
                </p>
              </div>
            ) : (
              <div className="w-full space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="bg-gray-900/50 border border-teal-500/30 rounded-2xl p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent"></div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-2">
                    Security Score
                  </p>
                  <h1 className="text-5xl font-black text-white mb-2">
                    92<span className="text-lg text-gray-500">/100</span>
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" /> Safe to Use
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/40 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-400 font-bold">
                          Domain Check
                        </p>
                        <p className="text-sm text-white font-bold">Verified</p>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/40 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Code className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-400 font-bold">
                          IP Registry
                        </p>
                        <p className="text-sm text-white font-bold">
                          3 Assets Found
                        </p>
                      </div>
                    </div>
                    <Search className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
                <button
                  onClick={() => setStatus("scanning")}
                  className="w-full py-3 bg-teal-600/20 border border-teal-500/50 hover:bg-teal-600/30 rounded-xl font-bold text-sm text-teal-300 transition-colors active:scale-95"
                >
                  Re-Scan Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- REGISTER IP VIEW (P0-3: ONE-CLICK REGISTRATION) - Tidak Berubah Logika Form ---
  const RegisterIPView = ({
    addProtectedIP,
    updateContentStatus,
    activeContent: initialActiveContent,
  }: {
    addProtectedIP: (ipData: { title: string; assetType?: string; previewUrl?: string; status?: string }) => void;
    updateContentStatus: (id: number, status: string) => void;
    activeContent: DetectedContent | null;
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    // Gunakan activeContent dari prop
    const activeContent = initialActiveContent;

    // Default form data pre-filled based on detected content (P0-3)
    const initialFormData = {
      title: activeContent?.title || activeContent?.alt || "Untitled Asset",
      description: activeContent?.id
        ? `Original content detected by IP Shield from current page.`
        : "Manually uploaded asset for IP registration.",
      assetType: activeContent?.type?.toUpperCase() || TYPE_OPTIONS[0].id, // Default ke 'IMAGE' atau yang terdeteksi
      licenseType: "COMMERCIAL_USE", // Default ke Commercial Use
      royaltyPercentage: 10, // Default 10%
    };

    const [formData, setFormData] = useState(initialFormData);
    // NEW STATES for local file upload
    const [localFile, setLocalFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(activeContent?.url || null);

    // Logic untuk mendapatkan label
    const selectedAssetType =
      TYPE_OPTIONS.find((t) => t.id === formData.assetType)?.label || "Type";
    const selectedLicense = LICENSE_OPTIONS.find(
      (l) => l.id === formData.licenseType
    );

    // Find the icon based on current asset type
    const assetIcon = TYPE_OPTIONS.find((t) => t.id === formData.assetType)
      ?.icon || <Aperture className="w-3.5 h-3.5" />;

    // NEW HANDLER: Mengambil file lokal dari device user
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setLocalFile(file);
        setPreviewUrl(URL.createObjectURL(file));

        // Deteksi tipe aset berdasarkan MIME type file
        let detectedType = "TEXT";
        if (file.type.startsWith("image/")) detectedType = "IMAGE";
        else if (file.type.startsWith("audio/")) detectedType = "AUDIO";
        else if (file.type.startsWith("video/")) detectedType = "VIDEO";

        // Set title dari nama file (hapus ekstensi)
        const fileNameWithoutExt =
          file.name.substring(0, file.name.lastIndexOf(".")) || file.name;

        setFormData((prev) => ({
          ...prev,
          assetType: detectedType,
          title: fileNameWithoutExt,
        }));
      } else {
        setLocalFile(null);
        setPreviewUrl(null);
        setFormData(initialFormData);
      }
    };

    // NEW HANDLER: Membersihkan file yang diupload
    const clearLocalFile = () => {
      setLocalFile(null);
      setPreviewUrl(activeContent?.url || null);
      setFormData(initialFormData);
    };

    const handleRegister = (e) => {
      e.preventDefault();

      // VALIDASI: Pastikan ada file lokal ATAU konten terdeteksi yang siap diregister
      if (!localFile && !activeContent) {
        alert("Please upload a file or select detected content first.");
        return;
      }

      setIsLoading(true);
      // Simulasi proses: Upload to IPFS + Register to Story Protocol
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);

        // Kumpulkan data IP yang baru didaftarkan
        const registeredIpData = {
          title: formData.title,
          assetType: formData.assetType,
          previewUrl: previewUrl, // URL lokal (dari localFile) atau URL content terdeteksi
        };

        // TAMBAHKAN IP BARU KE DAFTAR DASHBOARD
        addProtectedIP(registeredIpData);

        // Update status konten yang baru saja didaftarkan (Jika dari web)
        if (activeContent && !localFile) {
          updateContentStatus(activeContent.id, "PROTECTED");
        }
      }, 2500);
    };

    // Komponen simulasi dropdown
    const CustomDropdown = ({
      options,
      current,
      onSelect,
    }: {
      options: { id: string; label: string; icon: React.ReactNode; desc?: string; royaltyEnabled?: boolean }[];
      current: string;
      onSelect: (id: string) => void;
    }) => {
      const [isOpen, setIsOpen] = useState(false);
      const ref = useRef(null);

      const selectedOption =
        options.find((opt) => opt.id === current) || options[0];

      useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }, [ref]);

      return (
        <div className="relative w-full" ref={ref}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 p-3 rounded-xl text-white text-sm transition-all"
          >
            <span className="flex items-center gap-2">
              {selectedOption?.icon}
              {selectedOption?.label}
            </span>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : "rotate-0"}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-purple-500/30 z-20 animate-in slide-in-from-top-1">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelect(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 text-sm flex flex-col items-start gap-1 transition-all rounded-xl ${current === option.id
                    ? "bg-purple-500/30 text-white font-bold"
                    : "text-gray-300 hover:bg-gray-800"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 ml-5">
                    {option.desc}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        className={`w-[400px] h-[600px] absolute inset-0 transition-transform duration-300 z-50 ${isSidebarClosing ? "translate-x-full" : "translate-x-0"} ${THEME_COLORS.BASE_DARK}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] via-purple-900/30 to-[#0a0f1d] z-0 opacity-95"></div>

        <div className="relative z-10 w-full h-full flex flex-col">
          {/* HEADER SESUAI GAMBAR */}
          <div className="relative px-5 py-4 overflow-hidden border-b border-purple-500/20">
            <div className="relative flex items-center gap-3">
              <button
                onClick={closeAllOverlays}
                className="relative group p-1.5 text-white bg-gray-900/50 backdrop-blur-md rounded-lg border border-purple-500/30 hover:border-purple-400/50 transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <div>
                <h2 className="text-white font-black text-xl">
                  New IP Registration
                </h2>
                <p className="text-purple-400 text-xs font-bold">
                  Story Protocol Mainnet
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
            {step === 1 ? (
              <form onSubmit={handleRegister} className="space-y-5">
                {/* --- FILE UPLOAD & PREVIEW SECTION (MODIFIED) --- */}
                <div className="relative w-full rounded-xl overflow-hidden bg-gray-900/50 border border-purple-500/30">
                  {/* Content Preview (Uses previewUrl) */}
                  <div className="relative w-full h-40 bg-gray-900/50 flex items-center justify-center">
                    {/* 1. Jika file lokal bertipe IMAGE, tampilkan preview gambar */}
                    {localFile && formData.assetType === "IMAGE" ? (
                      <img
                        src={previewUrl}
                        alt="Asset Preview"
                        className="w-full h-full object-cover opacity-70"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        {/* 2. Jika ada file lokal (Audio/Video/Text), tampilkan nama file */}
                        {localFile ? (
                          <>
                            <span className="text-4xl text-purple-400 mb-2">
                              {assetIcon}
                            </span>
                            <p className="text-sm font-bold text-white mb-1">
                              File Loaded: {localFile.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              Type: {formData.assetType} (
                              {Math.round(localFile.size / 1024)} KB)
                            </p>
                          </>
                        ) : activeContent ? (
                          /* 3. Jika ada content terdeteksi dari halaman web */
                          <>
                            <p className="text-sm font-bold text-white mb-1">
                              Content Detected: {activeContent.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              Source: Current Webpage
                            </p>
                          </>
                        ) : (
                          /* 4. Jika tidak ada apa-apa */
                          <p className="text-sm font-bold text-gray-400">
                            Upload your asset below
                          </p>
                        )}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent flex items-end p-3">
                      <p className="text-xs text-purple-300 font-bold flex items-center gap-1">
                        {assetIcon} {selectedAssetType}
                      </p>
                    </div>
                  </div>

                  {/* Upload Button & Input */}
                  <div className="p-3 bg-gray-950/70 border-t border-purple-500/20">
                    <label
                      htmlFor="file-upload"
                      className="w-full relative py-2.5 rounded-lg font-bold text-sm text-white overflow-hidden group/upload cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span className="relative flex items-center justify-center gap-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">
                        <Aperture className="w-4 h-4 group-hover/upload:rotate-12 transition-transform" />
                        {localFile
                          ? `Change File: ${localFile.name.substring(0, 15)}...`
                          : "Upload Local File"}
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        // Menerima Image, Audio, Video, dan Text documents
                        accept="image/*,audio/*,video/*,text/plain,.txt,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {localFile && (
                      <button
                        type="button"
                        onClick={clearLocalFile}
                        className="w-full mt-2 py-1 text-xs text-red-400 bg-red-900/20 rounded-lg hover:bg-red-900/30 transition-colors"
                      >
                        <X className="w-3 h-3 inline mr-1" /> Clear Upload
                      </button>
                    )}
                    {!localFile && activeContent && (
                      <p className="text-center text-xs text-gray-400 mt-2">
                        Currently registering detected content. Uploading a
                        local file will replace it.
                      </p>
                    )}
                  </div>
                </div>
                {/* --- END FILE UPLOAD & PREVIEW SECTION --- */}

                {/* Asset Title */}
                <div>
                  <label
                    htmlFor="asset-title"
                    className="text-sm font-bold text-gray-300 mb-2 block"
                  >
                    Asset Title
                  </label>
                  <input
                    id="asset-title"
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-0 text-white p-3 rounded-xl placeholder-gray-500 transition-all"
                    placeholder="e.g. My Digital Art #01"
                    required
                  />
                </div>

                {/* Type & License Dropdowns */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Asset Type Dropdown (Value otomatis terisi dari file, tapi bisa diubah manual) */}
                  <div>
                    <label className="text-sm font-bold text-gray-300 mb-2 block">
                      Asset Type
                    </label>
                    <CustomDropdown
                      options={TYPE_OPTIONS}
                      current={formData.assetType}
                      onSelect={(id) =>
                        setFormData({ ...formData, assetType: id })
                      }
                    />
                  </div>

                  {/* License Dropdown (Existing) */}
                  <div>
                    <label className="text-sm font-bold text-gray-300 mb-2 block">
                      License Type
                    </label>
                    <CustomDropdown
                      options={LICENSE_OPTIONS}
                      current={formData.licenseType}
                      onSelect={(id) =>
                        setFormData({
                          ...formData,
                          licenseType: id,
                          royaltyPercentage: id === "COMMERCIAL_USE" ? 10 : 0,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Royalty Slider (P0-3) */}
                {selectedLicense?.royaltyEnabled && (
                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 space-y-3">
                    <label className="text-sm font-bold text-gray-300 block mb-1">
                      Royalty Share:{" "}
                      <span className="text-purple-400">
                        {formData.royaltyPercentage}%
                      </span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={formData.royaltyPercentage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          royaltyPercentage: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      style={{ accentColor: "#a855f7" }}
                    />
                    <p className="text-xs text-gray-400">
                      Share of revenue from commercial usage rights.
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label
                    htmlFor="asset-description"
                    className="text-sm font-bold text-gray-300 mb-2 block"
                  >
                    Description
                  </label>
                  <textarea
                    id="asset-description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-0 text-white p-3 rounded-xl placeholder-gray-500 transition-all"
                    placeholder="Describe your IP asset..."
                  />
                </div>

                {/* Story Protocol Info Box */}
                <div className="bg-purple-500/20 border border-purple-500/40 p-3 rounded-xl text-purple-300 flex items-start gap-3">
                  <p className="text-xs leading-relaxed">
                    This action will mint a new **IP Asset NFT** on **Story
                    Protocol** and register its metadata permanently.
                  </p>
                </div>

                {/* Mint IP Asset Button */}
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formData.title.trim() ||
                    (!localFile && !activeContent)
                  }
                  className={`w-full py-3 rounded-xl font-bold text-base text-white overflow-hidden relative group mt-2 ${isLoading || !formData.title.trim() || (!localFile && !activeContent) ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-95 transition-transform"}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <span className="relative flex items-center justify-center gap-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Minting & Registering...
                      </>
                    ) : (
                      <>
                        <Code className="w-4 h-4" />
                        Register & Protect
                      </>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-5 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">
                    Content Protected!
                  </h3>
                  <p className="text-sm text-gray-400">
                    Your IP is now registered on Story Protocol.
                  </p>
                </div>

                <div className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-left space-y-3">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      IP Asset ID
                    </p>
                    <p className="text-sm font-mono text-purple-400">
                      0x71C...9A23
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Transaction Hash
                    </p>
                    <a
                      href="#"
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      0x8f4e2c3a9b7d1e... <LinkIcon className="w-3 h-3" />
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Story Explorer
                    </p>
                    <a
                      href="#"
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      View IP on Explorer <LinkIcon className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={closeAllOverlays}
                  className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-sm text-white transition-colors active:scale-95"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // NEW COMPONENT: Quick Protect Status Overlay
  const QuickProtectSuccessView = ({ data, close }) => {
    const isProtected = data.status === "PROTECTED";

    return (
      <div
        className={`w-[400px] h-[600px] absolute inset-0 transition-opacity duration-300 z-[70] bg-[#0a0f1d]/95 backdrop-blur-lg flex items-center justify-center`}
      >
        <div className="text-center p-8 w-80 bg-gray-900/90 rounded-2xl border border-purple-500/30 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-500">
          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center 
                    ${isProtected
                ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : "bg-gradient-to-br from-blue-500 to-cyan-600"
              }`}
          >
            {isProtected ? (
              <Check className="w-8 h-8 text-white" />
            ) : (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-black text-white mb-1">
              {isProtected ? "Protected Successfully!" : "Registering IP..."}
            </h3>
            <p className="text-sm text-gray-400">
              {isProtected
                ? `IP Asset: "${data.title}" is now protected.`
                : `Minting IP NFT for "${data.title}" on Story Protocol (2s).`}
            </p>
          </div>

          {isProtected && (
            <button
              onClick={close}
              className="w-full py-2.5 bg-purple-600/50 hover:bg-purple-600/70 rounded-xl font-bold text-sm text-white transition-colors active:scale-95 mt-3"
            >
              View in Dashboard
            </button>
          )}
        </div>
      </div>
    );
  };

  // Edit IP Modal Component
  const EditIPModal = () => {
    if (!showEditModal || !editingIP) return null;

    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-[350px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-cyan-500/30 shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-lg">Edit IP Asset</h3>
            <button
              onClick={closeEditModal}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-5">
            <div>
              <label className="text-sm font-bold text-gray-300 mb-2 block">
                Title
              </label>
              <input
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-0 text-white p-3 rounded-xl placeholder-gray-500 transition-all"
                placeholder="Enter IP title"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-300 mb-2 block">
                Earnings
              </label>
              <input
                type="text"
                value={editFormData.earnings}
                onChange={(e) => setEditFormData(prev => ({ ...prev, earnings: e.target.value }))}
                className="w-full bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-0 text-white p-3 rounded-xl placeholder-gray-500 transition-all"
                placeholder="e.g. $100.00"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={closeEditModal}
              className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-sm text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveEditIP}
              className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-bold text-sm text-white transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => {
    // Mock total earnings, now based on protectedIPs length
    const totalEarnings = protectedIPs.length * 100 + 90.0;
    const totalIPsProtected = protectedIPs.length;
    const activeAlertsCount = 2; // Mock

    return (
      <div
        className={`w-[400px] h-[600px] p-5 relative overflow-hidden bg-transparent`}
      >
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentPage("main")}
              className="text-cyan-400 flex items-center font-bold hover:text-cyan-300 transition-colors group hover:translate-x-[-2px] transition-transform active:scale-95"
            >
              <ChevronRight className="w-5 h-5 rotate-180" /> Back
            </button>
            <h2 className="text-xl font-black text-white bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
              Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              {
                label: "Protected",
                value: totalIPsProtected,
                color: "from-purple-500/50 to-pink-500/50",
              },
              {
                label: "Earnings",
                value: `$${totalEarnings.toFixed(2)}`,
                color: "from-amber-500/50 to-yellow-500/50",
              },
              {
                label: "Alerts",
                value: activeAlertsCount,
                color: "from-red-500/50 to-orange-500/50",
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="relative group cursor-pointer hover:scale-[1.07] transition-transform duration-300"
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${metric.color} blur-md opacity-30 group-hover:opacity-50 transition-opacity`}
                ></div>
                <div
                  className="relative p-3 rounded-xl bg-gray-900/50 border border-current/20 shadow-xl shadow-gray-950 group-hover:border-current/40 transition-all"
                  style={{
                    borderColor: metric.color.split("/")[0].split("-")[1],
                  }}
                >
                  <p className="text-white font-black text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                    {metric.value}
                  </p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-1">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
            <h3 className="text-white text-sm font-bold border-b border-cyan-500/30 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" /> Portfolio
            </h3>

            <div className="space-y-3">
              {protectedIPs.map((ip) => (
                <div
                  key={ip.id}
                  className="relative p-3 rounded-xl bg-gray-900/40 border border-purple-500/20 shadow-lg group hover:border-purple-400/40 transition-all hover:bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={ip.url}
                      alt={ip.title}
                      className="w-10 h-10 rounded bg-gray-800 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {ip.title}
                      </p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-2">
                        <span className="text-amber-400">
                          {ip.earnings} Earned
                        </span>
                        {ip.alerts > 0 && (
                          <span className="text-red-400 font-bold flex items-center gap-0.5">
                            <AlertCircle className="w-3 h-3" /> {ip.alerts}{" "}
                            Alerts
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Role-based action buttons */}
                    <div className="flex items-center gap-1">
                      {canUserPerform('edit') ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(ip);
                            }}
                            className="p-1.5 bg-cyan-500/10 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                            title="Edit IP"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                          </button>
                          {canUserPerform('delete') && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Delete "${ip.title}"?`)) {
                                  setProtectedIPs(prev => prev.filter(item => item.id !== ip.id));
                                }
                              }}
                              className="p-1.5 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                              title="Delete IP"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="px-2 py-1 bg-blue-500/10 rounded text-blue-400 text-[8px] font-bold border border-blue-500/30">
                          View Only
                        </div>
                      )}
                      <button className="p-2 bg-purple-500/10 rounded-lg text-purple-400 hover:bg-purple-500/20">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =================================================================
  // RENDER UTAMA
  // =================================================================
  return (
    <>
      <div
        className={`relative font-sans antialiased text-white w-[400px] h-[600px] ${THEME_COLORS.BASE_DARK} overflow-hidden`}
      >
        {/* 1. BACKGROUND CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-80 pointer-events-none"
        />

        {/* OVERLAYS BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] via-purple-900/20 to-[#0a0f1d] z-0 opacity-80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,255,255,0.15),transparent_50%)] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>

        {/* 2. KONTEN */}
        <div className="relative z-10 w-full h-full">
          {!isLoggedIn ? (
            <LoginScreen onLogin={handleLogin} loginError={loginError} />
          ) : (
            <>
              {/* Main Panel */}
              {currentPage === "main" && (
                <>
                  <MainPanelView />
                  {notificationQueue.map((alert, index) => (
                    <NotificationToast
                      key={alert.id}
                      alert={alert}
                      isFirst={index === 0}
                    />
                  ))}
                </>
              )}

              {/* Sidebar (Overlay) - Kirim prop quickProtect */}
              {showSidebar && <ContentSidebarView quickProtect={quickProtect} />}

              {/* Register View (Overlay) - Untuk Registrasi Manual */}
              {showRegisterView && (
                <RegisterIPView
                  addProtectedIP={addProtectedIP}
                  updateContentStatus={updateContentStatus}
                  activeContent={activeContent}
                />
              )}

              {/* Analysis View (Overlay) */}
              {showAnalysisView && <IPAnalysisView />}

              {/* Dashboard View */}
              {currentPage === "dashboard" && <DashboardView />}

              {/* Alerts View */}
              {currentPage === "alerts" && (
                <div
                  className={`w-[400px] h-[600px] p-5 relative bg-[#0a0f1d]/95 backdrop-blur-sm`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] via-red-900/20 to-[#0a0f1d] z-0 opacity-80"></div>
                  <div className="relative z-10">
                    <button
                      onClick={() => setCurrentPage("main")}
                      className="text-cyan-400 mb-4 flex items-center font-bold group hover:translate-x-[-2px] transition-transform active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" /> Back to Main
                    </button>
                    <h2 className="text-2xl font-black mb-6 text-white drop-shadow-[0_0_5px_rgba(255,100,100,0.5)] bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-white">
                      Latest Alerts
                    </h2>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                      {mockAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="relative group p-4 rounded-xl bg-gray-900/50 backdrop-blur-lg border border-red-500/30 cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                        >
                          <div
                            className={`absolute -inset-0.5 bg-gradient-to-r ${alert.color} rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity`}
                          ></div>
                          <div className="relative flex items-start gap-3">
                            <span className="text-2xl">{alert.icon}</span>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-white mb-0.5">
                                {alert.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {alert.description}
                              </p>
                              <p className="text-[10px] text-red-400 mt-1">
                                {alert.detailedInfo}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Protect Success View (Overlay) - TAMPILKAN SETELAH quickProtect DIPANGGIL */}
              {showQuickProtectSuccess && (
                <QuickProtectSuccessView
                  data={quickProtectSuccessData}
                  close={() => {
                    setShowQuickProtectSuccess(false);
                    setQuickProtectSuccessData(null);
                    setCurrentPage("dashboard"); // Arahkan ke dashboard setelah selesai
                  }}
                />
              )}

              {/* 7. Edit IP Modal */}
              <EditIPModal />
            </>
          )}
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(10, 15, 25, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 255, 255, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 255, 255, 0.6);
        }
      `}</style>
    </>
  );
}
