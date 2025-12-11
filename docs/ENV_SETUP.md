# 🔐 IP Shield - Environment Variables Setup Guide

**Complete guide to configuring your development environment**

---

## 📋 Quick Start

### Option 1: Run Without API Keys (Demo Mode)
```bash
# Just run the server - works immediately!
npm run dev
```
✅ Extension works with simulated data  
✅ Landing page fully functional  
✅ Perfect for testing UI/UX  

### Option 2: Full Setup (Real API Integration)
```bash
# 1. Create environment file
cp .env.example .env.local
# (Or create manually)

# 2. Add your API keys (see guide below)

# 3. Restart dev server
npm run dev
```

---

## 📝 Environment Variables Reference

### Required Structure
Create a `.env.local` file in the **root directory** with these variables:

```bash
# ===================================================
# IP SHIELD - ENVIRONMENT VARIABLES
# ===================================================

# ----------------------------------------------------
# YAKOA AI CONFIGURATION
# ----------------------------------------------------
# For Content Verification & Brand IP Detection

NEXT_PUBLIC_YAKOA_API_KEY=your_yakoa_api_key_here
NEXT_PUBLIC_YAKOA_SUBDOMAIN=ipshield
NEXT_PUBLIC_YAKOA_NETWORK=story
NEXT_PUBLIC_YAKOA_ENV=sandbox

# Backend (Server-side calls)
YAKOA_API_KEY=your_yakoa_api_key_here
YAKOA_SUBDOMAIN=ipshield
YAKOA_NETWORK=story
YAKOA_ENV=sandbox

# ----------------------------------------------------
# STORY PROTOCOL CONFIGURATION
# ----------------------------------------------------
# For Blockchain IP Registration

NEXT_PUBLIC_STORY_CHAIN_ID=1315
NEXT_PUBLIC_STORY_RPC_URL=https://aeneid.storyrpc.io
NEXT_PUBLIC_SPG_NFT_CONTRACT=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc

# Optional: For server-side transactions (KEEP SECRET!)
# STORY_PRIVATE_KEY=your_private_key_here

# ----------------------------------------------------
# IPFS / PINATA CONFIGURATION
# ----------------------------------------------------
# For Decentralized Storage

NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_here
PINATA_JWT=your_pinata_jwt_here

# ----------------------------------------------------
# APPLICATION CONFIGURATION
# ----------------------------------------------------

NEXT_PUBLIC_APP_NAME=IP Shield
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_ENV=development

# ----------------------------------------------------
# FEATURE FLAGS (Optional)
# ----------------------------------------------------

# Enable demo mode (simulated responses)
NEXT_PUBLIC_DEMO_MODE=false

# Enable debug logging
NEXT_PUBLIC_DEBUG=false

# Yakoa simulation (if no API key)
NEXT_PUBLIC_YAKOA_SIMULATION=true
```

---

## 🔑 Getting API Keys

### 1️⃣ Yakoa AI API Key

**Purpose**: Content verification, brand IP detection  
**Cost**: Free tier available  
**Required for**: Real AI analysis

#### Step-by-step:
1. **Visit**: [https://yakoa.io](https://yakoa.io)
2. **Sign up** for a developer account
3. **Create a new application**
   - Name: "IP Shield"
   - Network: "Story Protocol"
4. **Copy your API key**
5. **Paste** into `.env.local`:
   ```bash
   NEXT_PUBLIC_YAKOA_API_KEY=ya_xxxxxxxxxxxxxxxx
   YAKOA_API_KEY=ya_xxxxxxxxxxxxxxxx
   ```

#### Configuration Options:
```bash
# Subdomain: Your organization name
NEXT_PUBLIC_YAKOA_SUBDOMAIN=ipshield

# Network: Target blockchain network
NEXT_PUBLIC_YAKOA_NETWORK=story

# Environment: Testing vs Production
NEXT_PUBLIC_YAKOA_ENV=sandbox  # or 'production'
```

---

### 2️⃣ Pinata IPFS JWT

**Purpose**: Upload IP assets to IPFS  
**Cost**: Free tier (1GB)  
**Required for**: Real IPFS uploads

#### Step-by-step:
1. **Visit**: [https://pinata.cloud](https://pinata.cloud)
2. **Create** a free account
3. **Navigate** to API Keys section
4. **Generate** a new JWT token
   - Name: "IP Shield"
   - Permissions: Full access (pinFileToIPFS)
5. **Copy** the JWT token
6. **Paste** into `.env.local`:
   ```bash
   NEXT_PUBLIC_PINATA_JWT=eyJhbGc...
   PINATA_JWT=eyJhbGc...
   ```

#### Alternative: Web3.Storage
```bash
# If using Web3.Storage instead
WEB3_STORAGE_TOKEN=your_token_here
```

---

### 3️⃣ Story Protocol Setup

**Purpose**: Blockchain IP registration  
**Cost**: Free on testnet  
**Required for**: Real blockchain transactions

#### Testnet (Default - No Setup Needed!)
```bash
# Already configured for Aeneid Testnet
NEXT_PUBLIC_STORY_CHAIN_ID=1315
NEXT_PUBLIC_STORY_RPC_URL=https://aeneid.storyrpc.io
NEXT_PUBLIC_SPG_NFT_CONTRACT=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc
```

#### Mainnet (Advanced)
For production use:
1. **Get Story Protocol wallet**
2. **Fund** with IP tokens
3. **Add private key** (server-side only):
   ```bash
   STORY_PRIVATE_KEY=0x...
   ```
   ⚠️ **WARNING**: Keep this EXTREMELY secure!

---

## 🚀 Configuration Wizard

### Beginner Setup (5 minutes)
```bash
# 1. Create .env.local
touch .env.local

# 2. Add minimum config (demo mode)
echo "NEXT_PUBLIC_DEMO_MODE=true" > .env.local
echo "NEXT_PUBLIC_YAKOA_SIMULATION=true" >> .env.local

# 3. Run
npm run dev
```
✅ Works immediately with simulated data!

---

### Standard Setup (15 minutes)
```bash
# 1. Get Yakoa API key (https://yakoa.io)
# 2. Get Pinata JWT (https://pinata.cloud)

# 3. Create .env.local with real keys:
NEXT_PUBLIC_YAKOA_API_KEY=ya_your_key
NEXT_PUBLIC_PINATA_JWT=eyJhbG...

# 4. Run
npm run dev
```
✅ Real AI verification + IPFS uploads!

---

### Advanced Setup (30 minutes)
```bash
# Same as Standard +
# Story Protocol private key
# Custom configurations
# Database (optional)
```
✅ Full production-ready setup!

---

## 🔍 Environment Variable Prefixes

### `NEXT_PUBLIC_*`
- ✅ **Accessible** in browser (client-side)
- ✅ **Required** for extension & frontend
- ⚠️ **Public** - don't put secrets here

### No Prefix
- ✅ **Server-side only** (API routes)
- ✅ **Secure** - not exposed to browser
- ✅ **Use for** private keys, secrets

#### Example:
```bash
# Client-side (public)
NEXT_PUBLIC_YAKOA_API_KEY=ya_xxx  # Extension can use

# Server-side (secret)
STORY_PRIVATE_KEY=0x...           # Only backend can use
```

---

## ✅ Verification Checklist

After setup, verify everything works:

### 1. Check File Created
```bash
ls -la .env.local
# Should exist in root folder
```

### 2. Check Variables Loaded
```bash
npm run dev
# Check terminal for no errors
```

### 3. Test in Browser
```javascript
// Open browser console on localhost:3000
console.log(process.env.NEXT_PUBLIC_YAKOA_API_KEY)
// Should show your key (or undefined if not set)
```

### 4. Test Extension
1. Load extension
2. Login (admin/admin123)
3. Try "Start Detection"
4. Check browser console for API calls

---

## 🐛 Troubleshooting

### Problem: "YAKOA_API_KEY not configured"
**Solution**:
1. Check `.env.local` exists
2. Verify key format: `NEXT_PUBLIC_YAKOA_API_KEY=...`
3. Restart dev server: `npm run dev`

### Problem: "Pinata upload failed"
**Solution**:
1. Check JWT token is valid
2. Verify not expired
3. Test at: https://pinata.cloud/api-keys

### Problem: Variables not loading
**Solution**:
```bash
# 1. Stop server (Ctrl+C)
# 2. Delete .next folder
rm -rf .next
# 3. Restart
npm run dev
```

### Problem: Extension can't access variables
**Solution**:
- Must use `NEXT_PUBLIC_*` prefix
- Server-only variables won't work in extension

---

## 📚 Reference

### Useful Commands
```bash
# Create .env.local
touch .env.local

# Edit .env.local
nano .env.local
# or use any text editor

# View current environment
printenv | grep NEXT_PUBLIC

# Test variable in Node
node -e "console.log(process.env.NEXT_PUBLIC_YAKOA_API_KEY)"
```

### Resources
- 📖 [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- 📖 [Yakoa Documentation](https://yakoa.io/docs)
- 📖 [Story Protocol Docs](https://docs.story.foundation)
- 📖 [Pinata Docs](https://docs.pinata.cloud)

---

## 🔐 Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore`
- Use different keys for dev/prod
- Rotate keys regularly
- Use `NEXT_PUBLIC_*` for client-safe values only

### ❌ DON'T:
- Commit `.env.local` to Git
- Share API keys publicly
- Use production keys in development
- Store private keys in `NEXT_PUBLIC_*` vars

---

## 🎯 Quick Reference

| Variable | Purpose | Required | Public |
|----------|---------|----------|--------|
| `NEXT_PUBLIC_YAKOA_API_KEY` | AI verification | No* | Yes |
| `NEXT_PUBLIC_PINATA_JWT` | IPFS uploads | No* | Yes |
| `NEXT_PUBLIC_STORY_CHAIN_ID` | Blockchain network | Yes | Yes |
| `STORY_PRIVATE_KEY` | Transactions | No | **NO** |

*Required for real API calls, optional for demo mode

---

<div align="center">

**🔐 Your environment is ready!**

*Now run `npm run dev` and start building!*

</div>
