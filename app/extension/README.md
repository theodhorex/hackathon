# 🛡️ IP Shield - Chrome Extension

<div align="center">

**Protect Your Digital Content with AI-Powered Detection & Blockchain Registration**

*Powered by Yakoa AI & Story Protocol*

![Version](https://img.shields.io/badge/Version-1.0.0-cyan)
![Chrome](https://img.shields.io/badge/Chrome-Extension-blue)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 🎨 Logo & Branding

IP Shield menggunakan logo modern dengan shield icon dan text "IP":

### Logo Features:
- **Shield Design**: Melambangkan perlindungan dan keamanan
- **Gradient Colors**: Cyan-Blue (#22d3ee → #0891b2)
- **Glow Effect**: Neon effect untuk kesan futuristik
- **"IP" Text**: Jelas menunjukkan fokus pada Intellectual Property

### Logo Files:
```
icons/
├── icon16.png    # Toolbar icon (16x16)
├── icon48.png    # Extension manager (48x48)
├── icon128.png   # Extension details (128x128)
└── logo.svg      # Vector logo untuk web
```

---

## ✅ Extension Status

**100% FUNCTIONAL** - menggunakan iframe ke `localhost:3000`

### 🎯 Keunggulan:
- ✅ **Semua tombol berfungsi** - No manual conversion needed
- ✅ **Tampilan identik** dengan Extension_Panel_alven.tsx
- ✅ **Hot reload** - Perubahan code langsung terlihat
- ✅ **Full React** - Hooks, state, effects work perfectly
- ✅ **Logo integration** - Shield logo di loading screen & header
- ✅ **Smooth animations** - Floating logo, spinner, particles

---

## 🚀 Quick Start

### Step 1: Start Development Server

**PENTING**: Extension memerlukan Next.js dev server running.

```bash
cd d:\hackathon\hackathon
npm run dev
```

Biarkan terminal tetap terbuka.

### Step 2: Load Extension

1. Buka Chrome: `chrome://extensions/`
2. Enable **Developer mode** (toggle kanan atas)
3. Click **Load unpacked**
4. Select folder: `d:\hackathon\hackathon\app\extension`
5. Extension "IP Shield" akan muncul dengan logo shield!

### Step 3: Pin to Toolbar

1. Click Extensions icon (puzzle piece)
2. Find "IP Shield"
3. Click pin icon (📌)
4. Logo shield sekarang di toolbar!

### Step 4: Login & Explore

**Login credentials:**
- **Admin**: `admin` / `admin123` (unlimited)
- **Demo**: `demo` / `demo123` (max 5 IPs)

---

## 🎨 UI Components

### 1. Loading Screen

**Features tampilan loading:**
- ✨ Animated gradient background
- 🛡️ Floating shield logo dengan glow effect
- ⭕ Spinning ring animation mengelilingi logo
- 💎 "IP Shield" text dengan cyan glow
- 📝 "Powered by Yakoa AI & Story Protocol" subtitle

**Animations:**
- Logo float: 3s ease-in-out (up/down motion)
- Spinner: 2s linear rotation
- Text pulse: 2s opacity fade
- Background: 6s floating particles

### 2. Main Dashboard

**Header:**
- 🛡️ Small shield logo with gradient background
- 📊 Monitoring status indicator (green pulse when active)
- 🔔 Notification bell with badge count
- 👤 User profile with role badge (ADMIN/DEMO)

**Stats Cards:**
```
┌─────────┬──────────┬─────────┐
│ Detected│ Protected│ Alerts  │
│ (Yakoa) │ (Story)  │         │
│    4    │   3/5    │   3     │
└─────────┴──────────┴─────────┘
```

**Tabs:**
1. **Detect & Protect** (Blue/Cyan gradient)
2. **IP Analysis** (Teal/Cyan gradient)
3. **Register IP** (Purple/Pink gradient)

---

## ✨ Features

### 🔍 Content Detection (Yakoa AI)
- Auto-scan halaman web untuk images, audio, video
- AI analysis untuk IP status
- Status badges (✅ Original, ⚠️ Brand IP, 🔒 Registered)
- Quick Protect button untuk instant protection

### 🛡️ IP Registration (Story Protocol)
- One-click registration ke blockchain
- NFT minting untuk IP assets
- License setup (Commercial, Non-Commercial, No Derivatives)
- Royalty configuration untuk commercial licenses

### 📊 Dashboard & Monitoring
- Protected IPs list dengan earnings
- Real-time infringement alerts
- Background monitoring
- Toast notifications

### 👥 Role-Based Access
- **Admin**: Unlimited registrations, full edit/delete
- **Demo**: Max 5 registrations, view-only mode

---

## 📁 File Structure

```
app/extension/
├── 📂 icons/                  # Extension icons & logo
│   ├── icon16.png             # Toolbar (16x16)
│   ├── icon48.png             # Manager (48x48)
│   ├── icon128.png            # Details (128x128)
│   ├── logo.svg               # Vector logo
│   └── generate-icons.html    # Icon generator tool
│
├── 📄 manifest.json           # Extension manifest with icons
├── 📄 popup.html              # Popup dengan animated logo
├── 📄 popup-loader.css        # Loading screen styles
├── 📄 popup-loader.js         # Loading logic
├── 📄 background.js           # Background worker
├── 📄 content.js              # Content scanner
│
├── 📖 README.md               # This file
├── 📖 INSTALLATION.md         # Installation guide
└── 📖 UI-DOCUMENTATION.md     # UI design docs
```

---

## 🎨 Color Palette

### Primary Colors:
- **Yakoa Blue**: `#3b82f6` → `#06b6d4`
- **Story Purple**: `#a855f7` → `#ec4899`
- **Shield Cyan**: `#22d3ee`
- **Dark Base**: `#0a0f1d`

### Status Colors:
- **Original** (Green): `#10b981`
- **Brand IP** (Orange): `#f97316`
- **Registered** (Red): `#ef4444`
- **Protected** (Purple): `#a855f7`
- **Processing** (Blue): `#3b82f6`

---

## 🔧 Development

### Edit Extension UI

1. Edit `app/components/Extension_Panel_alven.tsx`
2. Save file (Next.js auto-reload)
3. Refresh extension popup
4. Changes immediately visible!

### Edit Loading Screen

1. Edit `popup.html` untuk HTML/SVG logo
2. Edit `popup-loader.css` untuk animations
3. Reload extension di `chrome://extensions/`

### Add New Icons

1. Generate icons (16, 48, 128 sizes)
2. Place in `icons/` folder
3. Update `manifest.json` if needed
4. Reload extension

---

## 🐛 Troubleshooting

### Extension shows "Server Not Running"
**Solution:**
```bash
npm run dev  # Start server terlebih dahulu
```

### Logo tidak muncul
**Check:**
- ✅ Icons folder exists?
- ✅ PNG files di folder icons?
- ✅ manifest.json icons path correct?
- ✅ Reload extension di chrome://extensions/

### Loading screen stuck
**Debug:**
1. Right-click popup → Inspect
2. Check console errors
3. Verify `http://localhost:3000` accessible
4. Reload extension

---

## 📚 Documentation

- 📖 **[INSTALLATION.md](./INSTALLATION.md)** - Detailed installation steps
- 📖 **[UI-DOCUMENTATION.md](./UI-DOCUMENTATION.md)** - UI design & components
- 📖 **[README original](./README.original.md)** - Feature specifications

---

## 🎯 What Works

**Fully Functional:**
- ✅ Animated loading dengan logo
- ✅ Login/logout system
- ✅ Role-based permissions
- ✅ Tab switching
- ✅ Content detection
- ✅ IP Analysis
- ✅ Registration form
- ✅ Dashboard dengan stats
- ✅ Alerts system
- ✅ All buttons & interactions
- ✅ Smooth animations
- ✅ Particle background

**Requirements:**
- ⚠️ Requires `npm run dev` running
- ⚠️ For development only (not production-ready yet)

---

## 📦 Production Deployment

Untuk publish ke Chrome Web Store (future):

1. **Build static version**
2. **Bundle dependencies**
3. **Add production icons**
4. **Remove localhost dependencies**
5. **Test thoroughly**
6. **Submit to Chrome Web Store**

*(Detailed guide coming soon)*

---

<div align="center">

**🚀 Powered by Yakoa AI & Story Protocol**

Made with ❤️ for protecting digital content

</div>
