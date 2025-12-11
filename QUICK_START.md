# 🚀 IP Shield - Quick Start Guide

**Get up and running in 5 minutes!**

---

## ⚡ Super Fast Setup

```bash
# 1. Install dependencies (1 minute)
npm install

# 2. Run development server (instant)
npm run dev

# 3. Open browser
# Visit: http://localhost:3000
```

**That's it! The landing page is ready! 🎉**

---

## 🔧 Chrome Extension Setup

### Step 1: Start Dev Server
```bash
# Make sure dev server is running
npm run dev
```
Keep this terminal open!

### Step 2: Load Extension
1. Open Chrome browser
2. Go to: `chrome://extensions/`
3. Toggle **Developer mode** ON (top right)
4. Click **Load unpacked**
5. Select folder: `[project-folder]/app/extension/`
6. Look for "IP Shield" with shield icon

### Step 3: Pin & Test
1. Click Extensions icon (puzzle piece)
2. Pin "IP Shield" to toolbar
3. Click the shield icon
4. Login with:
   - Username: `admin`
   - Password: `admin123`

**Extension loaded! 🎊**

---

## 🎮 Demo Flow (1 Minute)

### Landing Page Tour
1. ✨ See 3D galaxy animation
2. 📜 Scroll down for rotating gallery
3. 🎯 Click "Get Extension" button
4. 📖 Explore features section

### Extension Tour
1. 🔍 **Detect Tab** - See pre-populated content
2. 📊 **IP Analysis** - Security analysis interface
3. ⚡ **Register IP** - Manual registration form
4. 📈 **Stats** - View detected/protected/alerts counts
5. 🔔 **Notifications** - Bell icon shows alerts

### Try Quick Protect
1. Go to **Detect & Protect** tab
2. Click **Start Detection**
3. See sample content cards
4. Click **Protect This (Quick)** on any card
5. Watch the protection workflow!

---

## 🎨 What You'll See

### Landing Page
- **Hero**: 3D galaxy with interactive particles
- **Gallery**: Circular rotating showcase
- **Features**: AI detection + Blockchain protection
- **Stats**: Protected IPs, earnings, alerts
- **Process**: Detection → Verification → Registration

### Extension
- **Beautiful Loading**: Animated shield logo
- **Dashboard**: Stats cards (Detected, Protected, Alerts)
- **Three Tabs**: Detect, Analysis, Register
- **Live Monitoring**: Toggle monitoring on/off
- **Toast Notifications**: Real-time alerts
- **User Profile**: Role badge (Admin/Demo)

---

## 📱 Test Features

### ✅ Working Features (No API Keys Needed)

#### Landing Page
- [x] 3D galaxy animation
- [x] Smooth scrolling
- [x] Circular gallery rotation
- [x] Responsive design
- [x] Navigation menu
- [x] Get Extension button

#### Extension
- [x] Login system (admin/demo)
- [x] Content detection (mock data)
- [x] Quick protect workflow
- [x] IP registration form
- [x] Dashboard with stats
- [x] Monitoring toggle
- [x] Toast notifications
- [x] Role-based access

### 🔑 With API Keys (Optional)

To enable real AI verification:
1. Get Yakoa API key: https://yakoa.io
2. Create `.env.local` file
3. Add: `NEXT_PUBLIC_YAKOA_API_KEY=your_key`
4. Restart dev server

---

## 🎯 Common Tasks

### View Landing Page
```
http://localhost:3000
```

### Access Extension
```
Chrome → Extensions → IP Shield icon
```

### Login Credentials
```
Admin Account:
  Username: admin
  Password: admin123
  Features: Unlimited registrations, all permissions

Demo Account:
  Username: demo
  Password: demo123
  Features: Max 5 registrations, view-only for some features
```

### Navigate Tabs
- **Detect & Protect**: Content scanning tab
- **IP Analysis**: Security analysis
- **Register IP**: Manual registration form

### Toggle Monitoring
- Click shield logo in header
- Green pulse = Active monitoring
- Grey = Inactive

---

## 🐛 Troubleshooting

### Extension Shows "Server Not Running"
**Fix**: Make sure `npm run dev` is running
```bash
cd [project-folder]
npm run dev
```

### Landing Page Not Loading
**Fix**: Check if port 3000 is available
```bash
# If port conflict, change port
npm run dev -- -p 3001
```

### Extension Not Loading
**Fix**: Reload extension
1. Go to `chrome://extensions/`
2. Click refresh icon on IP Shield card
3. If still issues, remove and re-add extension

### 3D Galaxy Not Showing
**Fix**: Check internet connection (Spline loads from CDN)
- Fallback gradient will show if offline
- Scene loads async, wait a few seconds

---

## 📂 Project Structure Quick Reference

```
hackathon/
├── app/
│   ├── page.tsx              # Landing page
│   ├── components/
│   │   └── Extension_Panel_alven.tsx   # Extension UI
│   └── extension/            # Chrome extension
│       ├── manifest.json     # Extension config
│       ├── popup.html        # Popup UI
│       └── icons/            # Extension icons
│
├── lib/
│   ├── yakoa/                # Yakoa integration
│   └── story/                # Story Protocol
│
├── components/
│   └── ui/                   # UI components
│
└── docs/                     # Documentation
```

---

## 🎓 Learn More

### Documentation
- 📖 `README.md` - Project overview
- 📖 `PROJECT_SUMMARY.md` - Hackathon summary
- 📖 `LEARNING_GUIDE.md` - Code deep-dive
- 📖 `app/extension/README.md` - Extension docs

### Key Technologies
- **Next.js**: https://nextjs.org/docs
- **Yakoa AI**: https://yakoa.io/docs
- **Story Protocol**: https://docs.story.foundation
- **Spline**: https://spline.design

---

## ⏱️ Time Investment

| Task                  | Time    |
|-----------------------|---------|
| Install dependencies  | 1 min   |
| Start dev server      | 10 sec  |
| Load extension        | 2 min   |
| Explore landing page  | 2 min   |
| Test extension        | 5 min   |
| **Total**             | **~10 min** |

---

## 🎉 You're Ready!

### Next Steps:
1. ✅ Landing page running at `localhost:3000`
2. ✅ Extension loaded in Chrome
3. ✅ Logged in with admin account
4. 🎮 Play around with features!
5. 📖 Read documentation for deep-dive

---

## 💡 Pro Tips

1. **Keep terminal visible** - Watch for any errors
2. **Use Chrome DevTools** - Right-click extension → Inspect
3. **Try both accounts** - See role-based differences
4. **Check console logs** - Shows API interactions
5. **Test on different pages** - Try detection on image-heavy sites

---

## 📞 Need Help?

- 📖 Check `README.md` for detailed docs
- 🐛 See troubleshooting section above
- 💬 Open an issue on GitHub
- 📧 Contact team (see PROJECT_SUMMARY.md)

---

<div align="center">

**🚀 Happy Testing!**

*Built with ❤️ for the Hackathon*

</div>
