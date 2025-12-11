# 🛡️ IP Shield - AI-Powered Content Protection Platform

<div align="center">

**Protect Your Digital Content with AI Detection & Blockchain Registration**

*Powered by Yakoa AI & Story Protocol*

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.1-black)
![License](https://img.shields.io/badge/License-MIT-green)

[🚀 Live Demo](#demo) • [📖 Documentation](#documentation) • [🎯 Features](#features) • [💻 Tech Stack](#tech-stack)

</div>

---

## 🎯 Overview

**IP Shield** is a comprehensive intellectual property protection platform that combines AI-powered content detection with blockchain-based registration. Built for the modern creator economy, IP Shield helps artists, photographers, musicians, and content creators protect their digital assets from infringement.

### 🏆 Hackathon Project

This project was developed for [Hackathon Name], showcasing the integration of:
- **Yakoa AI** for intelligent content verification
- **Story Protocol** for decentralized IP registration
- **Chrome Extension** for seamless browser integration
- **Next.js** for modern web application

---

## ✨ Key Features

### 🔍 AI-Powered Detection
- **Automatic Content Scanning** - Detects images, audio, and video on any webpage
- **Yakoa AI Integration** - Advanced AI analysis for IP status verification
- **Brand IP Detection** - Identifies registered trademarks and copyrighted content
- **Real-time Analysis** - Instant verification with visual status indicators

### 🛡️ Blockchain Registration
- **Story Protocol Integration** - Register IP assets on blockchain
- **NFT Minting** - Create proof of ownership as NFTs
- **License Management** - Configure commercial, non-commercial, or no-derivative licenses
- **Royalty Setup** - Automatic royalty tracking for licensed content

### 📊 Comprehensive Dashboard
- **Protected IP Gallery** - Visual overview of all registered assets
- **Infringement Monitoring** - Real-time alerts when your content is detected
- **Earnings Tracker** - Monitor revenue from licensed content
- **Analytics** - Detailed statistics on protection and detections

### 🎨 Premium User Experience
- **Interactive 3D Galaxy Background** - Stunning Spline-powered hero section
- **Smooth Animations** - Framer Motion for fluid transitions
- **Role-Based Access** - Admin and demo user modes
- **Dark Mode UI** - Modern, cyberpunk-inspired design

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Chrome browser (for extension)
- Yakoa API key ([Get here](https://yakoa.io))
- Story Protocol wallet (optional for mainnet)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ip-shield.git
cd ip-shield

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the web application.

### Chrome Extension Setup

```bash
# Start the dev server (required for extension)
npm run dev

# Load extension in Chrome
1. Open chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the folder: app/extension/
5. Pin IP Shield to toolbar
```

**Login Credentials:**
- **Admin**: `admin` / `admin123` (unlimited registrations)
- **Demo**: `demo` / `demo123` (max 5 registrations)

---

## 💻 Tech Stack

### Frontend
- **Next.js 15.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Spline** - 3D interactive backgrounds

### AI & Blockchain
- **Yakoa AI** - Content verification and brand IP detection
- **Story Protocol SDK** - Decentralized IP registration
- **IPFS (Pinata)** - Decentralized storage
- **Aeneid Testnet** - Story Protocol blockchain

### Extension
- **Chrome Manifest V3** - Modern extension architecture
- **React** - Component-based UI
- **Webpack** - Module bundling

---

## 📁 Project Structure

```
ip-shield/
├── app/                          # Next.js App Router
│   ├── components/               # React components
│   │   ├── Extension_Panel_alven.tsx  # Main extension UI
│   │   ├── LoginScreen.tsx       # Authentication
│   │   ├── WorkflowIndicator.tsx # Progress tracking
│   │   └── landing-page/         # Landing page components
│   ├── extension/                # Chrome extension files
│   │   ├── manifest.json         # Extension manifest
│   │   ├── popup.html           # Extension popup
│   │   ├── background.js        # Service worker
│   │   └── content.js           # Content scripts
│   └── api/                     # API routes
│
├── lib/                         # Core libraries
│   ├── yakoa/                   # Yakoa client
│   │   ├── client.ts            # API integration
│   │   └── types.ts             # Type definitions
│   └── story/                   # Story Protocol client
│       ├── client.ts            # SDK integration
│       └── types.ts             # Type definitions
│
├── components/                  # Shared UI components
│   └── ui/                     # shadcn/ui components
│
├── docs/                       # Documentation
└── extension-build/            # Production extension build
```

---

## 🎯 How It Works

### Workflow

```
1. Content Detection
   └─> Browser scans webpage for media content
       └─> Sends URLs to Yakoa AI
   
2. Verification
   └─> Yakoa analyzes content authenticity
       └─> Returns status: Original / Brand IP / Registered
   
3. Protection (if Original)
   └─> User clicks "Protect"
       └─> Uploads to IPFS
           └─> Registers on Story Protocol
               └─> NFT minted & IP protected

4. Monitoring
   └─> Background service watches for infringement
       └─> Alerts user when protected content detected
```

### Integration Architecture

```
┌─────────────────────────────────────────────┐
│         IP Shield Extension (Frontend)       │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Detection │→ │  Yakoa   │→ │  Story   │ │
│  │  Scanner  │  │   AI     │  │ Protocol │ │
│  └───────────┘  └──────────┘  └──────────┘ │
└─────────────────────────────────────────────┘
       ↓              ↓             ↓
  [Browser]    [Yakoa API]   [Blockchain]
                   ↓              ↓
              Brand DB        NFT Registry
```

---

## 📚 Documentation

- 📖 **[Extension README](./app/extension/README.md)** - Extension user guide
- 📖 **[Chrome Web Store Guide](./app/extension/CHROME_WEB_STORE_GUIDE.md)** - Publishing walkthrough
- 📖 **[Environment Setup](./docs/ENV_SETUP.md)** - Configuration guide
- 📖 **[Learning Guide](./LEARNING_GUIDE.md)** - Code architecture deep-dive
- 📖 **[Integration Summary](./INTEGRATION_SUMMARY.md)** - Yakoa & Story integration

---

## 🎨 Features Showcase

### Landing Page
- **3D Galaxy Hero** - Interactive Spline animation
- **Circular Gallery** - Rotating showcase of protected content
- **Smooth Scroll** - Parallax effects and smooth transitions
- **Responsive Design** - Optimized for all devices

### Chrome Extension
- **Animated Loading** - Shield logo with glow effects
- **Real-time Stats** - Detection, protection, and alert counts
- **Three Main Tabs**:
  - 🔍 Detect & Protect - Content scanning
  - 📊 IP Analysis - Security analysis
  - ⚡ Register IP - Manual registration form
- **Toast Notifications** - Real-time alerts
- **Role-Based UI** - Different features for Admin vs Demo users

---

## 🔐 Security & Privacy

- **Local Storage** - User credentials stored locally
- **Encrypted API Calls** - Secure communication with external services
- **No Data Collection** - Privacy-first approach
- **Blockchain Verification** - Immutable proof of ownership

---

## 🚧 Development Roadmap

### Current Status ✅
- [x] Chrome extension functional
- [x] Yakoa AI integration
- [x] Story Protocol integration
- [x] Landing page with 3D galaxy
- [x] Role-based access control
- [x] Real-time monitoring

### Upcoming Features 🎯
- [ ] Mobile app (React Native)
- [ ] Browser fingerprinting detection
- [ ] Automated takedown notices
- [ ] Multi-chain support
- [ ] Collaborative IP ownership
- [ ] API for third-party integration

---

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

```bash
# Fork the repo
# Create a feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m 'Add some amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Yakoa** - For providing advanced AI content verification
- **Story Protocol** - For decentralized IP infrastructure
- **Spline** - For stunning 3D animations
- **Next.js Team** - For the amazing React framework
- **Hackathon Organizers** - For the opportunity to build this

---

## 📞 Contact & Links

- **Demo**: [https://ip-shield.vercel.app](#) (if deployed)
- **Documentation**: [Full Docs](#)
- **Support**: [Create an issue](https://github.com/yourusername/ip-shield/issues)

---

<div align="center">

**🚀 Built with ❤️ for protecting digital creators**

*IP Shield - Your Digital Content Guardian*

</div>
