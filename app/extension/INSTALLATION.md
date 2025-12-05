# 🚀 Cara Install IP Shield Extension

## Prerequisites
1. **Google Chrome** browser (versi terbaru)
2. **Development server** harus running (`npm run dev`)

---

## 📦 Step-by-Step Installation

### Step 1: Prepare Extension Files
Pastikan semua file extension sudah lengkap di folder:
```
d:\hackathon\hackathon\app\extension\
```

File yang harus ada:
- ✅ `manifest.json`
- ✅ `popup.html`
- ✅ `popup-loader.css`
- ✅ `popup-loader.js`
- ✅ `popup-script.js`
- ✅ `background.js`
- ✅ `content.js`
- ✅ `icons/icon16.png`
- ✅ `icons/icon48.png`
- ✅ `icons/icon128.png`

---

### Step 2: Start Development Server
Buka terminal di root project dan jalankan:
```bash
cd d:\hackathon\hackathon
npm run dev
```

**Tunggu hingga server running di**: `http://localhost:3000`

---

### Step 3: Load Extension di Chrome

1. **Buka Chrome Extensions Page**
   - Ketik di address bar: `chrome://extensions/`
   - Atau: Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" di kanan atas
   - ![Developer Mode](https://developer.chrome.com/static/docs/extensions/mv3/getstarted/images/devmode.png)

3. **Load Unpacked Extension**
   - Klik button **"Load unpacked"**
   - Navigate ke folder: `d:\hackathon\hackathon\app\extension`
   - Klik **"Select Folder"**

4. **Extension Loaded! ✨**
   - IP Shield akan muncul di daftar extension
   - Icon shield biru-cyan akan muncul di toolbar Chrome

---

### Step 4: Pin Extension ke Toolbar

1. Klik icon **Extensions** (puzzle piece) di toolbar
2. Cari **"IP Shield"**
3. Klik **pin icon** (📌) untuk pin ke toolbar
4. Icon IP Shield sekarang selalu visible!

---

### Step 5: Test Extension

1. **Klik icon IP Shield** di toolbar
2. Loading screen dengan logo akan muncul
3. Login menggunakan:
   - **Admin**: username: `admin`, password: `admin123`
   - **Demo**: username: `demo`, password: `demo123`
4. Explore fitur-fitur extension!

---

## 🎨 Tampilan yang Akan Anda Lihat

### Loading Screen
```
┌──────────────────────────────────┐
│                                  │
│        ╱▔▔▔▔▔▔▔▔▔╲               │
│       ╱    IP      ╲              │
│      │   [SHIELD]  │   ← Animated │
│       ╲           ╱               │
│        ╲▁▁▁▁▁▁▁▁▁╱                │
│         ◯ ← Spinner                │
│                                  │
│       IP Shield                  │
│   Powered by Yakoa & Story       │
└──────────────────────────────────┘
```

### Main Dashboard
```
┌──────────────────────────────────┐
│ [🛡️] IP Shield      [🔔3] [👤]   │
│      Yakoa | Story               │
├──────────────────────────────────┤
│ Detected │ Protected │ Alerts    │
│    4     │   3/5     │   3       │
├──────────────────────────────────┤
│ [Detect & Protect] Tab           │
│ - Image 1: Cyber Punk ✅         │
│ - Image 2: Sneaker ⚠️            │
│ - Image 3: Abstract Wave 🔒      │
└──────────────────────────────────┘
```

---

## ⚙️ Troubleshooting

### Extension tidak muncul?
**Check:**
- ✅ Development server sudah running?
- ✅ Folder extension sudah benar?
- ✅ File `manifest.json` valid?

### Loading screen stuck?
**Solutions:**
1. Check console (F12) untuk error
2. Pastikan `http://localhost:3000` accessible
3. Reload extension:
   - Go to `chrome://extensions/`
   - Click **reload icon** ↻ di IP Shield card

### Icons tidak muncul?
**Check:**
- ✅ Folder `icons/` ada di extension folder?
- ✅ Files `icon16.png`, `icon48.png`, `icon128.png` exist?
- ✅ Reload extension setelah add icons

---

## 🔄 Update Extension

Setelah melakukan perubahan pada code:

1. **Save file** yang di-edit
2. Go to `chrome://extensions/`
3. Klik **reload icon** ↻ on IP Shield
4. Test perubahan!

**Atau gunakan keyboard shortcut:**
- Press `Ctrl+R` di popup extension untuk reload

---

## 🗑️ Uninstall Extension

1. Go to `chrome://extensions/`
2. Find **IP Shield**
3. Click **Remove**
4. Confirm removal

---

## 📱 Test Extension Features

### Feature Checklist:
- [ ] Loading screen dengan logo muncul
- [ ] Login berhasil (admin/demo)
- [ ] Dashboard menampilkan stats
- [ ] Tab switching works (Detect, IP Analysis, Register)
- [ ] Detected content list muncul
- [ ] Quick Protect button works
- [ ] Alerts notification muncul
- [ ] Monitoring toggle works
- [ ] Sidebar panel slide-in animation smooth

---

## 🎯 Next Steps

Setelah extension running:

1. **Test Auto-Detection**: 
   - Buka website dengan gambar (misal: Unsplash, Pinterest)
   - Extension akan auto-detect content

2. **Try Quick Protect**:
   - Klik "⚡ Quick Protect" pada detected image
   - Lihat animasi success screen

3. **Register IP**:
   - Go to "Register IP" tab
   - Upload local file atau paste URL
   - Set license & royalty
   - Submit to Story Protocol

4. **Monitor Alerts**:
   - Bell icon akan show notification count
   - Klik untuk lihat detailed alerts
   - View infringement reports

---

**Happy Testing! 🚀**

Jika ada masalah, check console untuk error messages atau lihat README.md untuk dokumentasi lengkap.
