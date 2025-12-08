# 🛡️ IP Shield Extension - Yakoa × Story Protocol Integration

> **Protect your digital content automatically with AI-powered IP verification and blockchain registration**

## 📋 Overview

IP Shield adalah Chrome Extension yang mengintegrasikan **Yakoa API** untuk content verification dan **Story Protocol** untuk IP registration on-chain. Extension ini memberikan workflow lengkap dari detection hingga protection dalam satu klik.

### 🎯 Key Features

- ✅ **Auto Content Detection** - Scan halaman web untuk menemukan IP assets (images, videos, audio)
- ✅ **Yakoa Verification** - Real-time IP infringement check menggunakan Yakoa API
- ✅ **Story Protocol Registration** - One-click IP NFT minting on blockchain
- ✅ **Clear Workflow Path** - Visual indicator: Detection → Verification → Registration
- ✅ **Role-Based Access** - Admin vs Demo user dengan permission berbeda
- ✅ **Real-time Monitoring** - Alert system untuk infringement notifications

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│              IP Shield Chrome Extension                  │
│                                                           │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────┐ │
│  │  Detection  │ ─→ │   Yakoa      │ ─→ │    Story    │ │
│  │   Scanner   │    │ Verification │    │Registration │ │
│  └─────────────┘    └──────────────┘    └─────────────┘ │
│       ↓                    ↓                    ↓        │
│   [Browser]           [Yakoa API]        [Story Protocol]│
│                            ↓                    ↓        │
│                    Brand Database         Blockchain     │
│                    IP Check               (Aeneid)       │
└──────────────────────────────────────────────────────────┘
```

### Workflow Path

1. **🔍 Content Detection** (Browser Extension)
   - Auto-scan page content
   - Extract images, videos, audio
   - Prepare for verification

2. **✅ Yakoa Verification** (Yakoa API)
   - Check brand IP database
   - Detect existing registrations
   - Return: `ORIGINAL` | `BRAND_IP_DETECTED` | `ALREADY_REGISTERED`

3. **⚡ Story Registration** (Story Protocol)
   - Mint IP NFT on-chain
   - Configure license terms
   - Get IP ID & transaction hash

4. **🛡️ Protected** (Dashboard)
   - Track earnings & royalties
   - Monitor infringements
   - Manage IP portfolio

---

## 📁 Project Structure

```
hackathon/
├── lib/
│   ├── yakoa/
│   │   ├── client.ts              # Yakoa API client
│   │   └── types.ts               # Yakoa type definitions
│   └── story/
│       ├── client.ts              # Story Protocol SDK client
│       └── types.ts               # Story type definitions
│
├── app/
│   └── components/
│       ├── Extension_Panel_alven.tsx    # Main extension UI
│       ├── WorkflowIndicator.tsx        # Workflow path visual
│       └── helpers/
│           └── yakoaStoryIntegration.ts # Integration helpers
│
├── INTEGRATION_GUIDE.md           # Detailed integration guide
├── INTEGRATION_SUMMARY.md         # Quick reference summary
├── ENV_TEMPLATE.md                # Environment variables template
└── README.md                      # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ & npm
- Yakoa API key (get from [yakoa.io](https://yakoa.io))
- Story Protocol testnet wallet (Aeneid network)
- (Optional) Pinata API key for IPFS uploads

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd hackathon

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp ENV_TEMPLATE.md .env.local
# Edit .env.local dengan API keys Anda

# 4. Run development server
npm run dev

# 5. Build for production
npm run build
```

### Environment Variables

Create `.env.local` file dengan konfigurasi berikut:

```env
# Yakoa API
NEXT_PUBLIC_YAKOA_API_KEY=your_yakoa_api_key
NEXT_PUBLIC_YAKOA_SUBDOMAIN=ipshield
NEXT_PUBLIC_YAKOA_NETWORK=story
NEXT_PUBLIC_YAKOA_ENV=sandbox

# Story Protocol
NEXT_PUBLIC_STORY_PRIVATE_KEY=0x_your_test_private_key

# IPFS (Optional - untuk production)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret

# Feature Flags
NEXT_PUBLIC_DEMO_MODE=true
```

📝 **Note:** See [ENV_TEMPLATE.md](./ENV_TEMPLATE.md) for complete configuration options.

---

## 🔧 Integration Status

### ✅ Completed

- [x] Yakoa Client implementation (`lib/yakoa/client.ts`)
  - Content verification API
  - Brand IP detection
  - Simulation mode fallback
  
- [x] Story Protocol Client (`lib/story/client.ts`)
  - IP Asset registration
  - License terms configuration
  - NFT minting on Aeneid testnet

- [x] Integration Helpers (`app/components/helpers/yakoaStoryIntegration.ts`)
  - `verifyContentWithYakoa()` - Yakoa wrapper
  - `registerIPOnStory()` - Story wrapper
  - `uploadToIPFS()` - IPFS helper (mock)
  - Workflow path generators

- [x] UI Components
  - WorkflowIndicator component
  - Status badges
  - Progress tracking

### ⚠️ Needs Manual Fix

**File:** `app/components/Extension_Panel_alven.tsx` (lines 286-293)

**Issue:** Escaped characters in state declarations

**Fix:** Replace lines 286-293 with:

```typescript
  // NEW STATES for Yakoa & Story Integration
  const [yakoaClient] = useState(() => getYakoaClient());
  const [storyClient] = useState(() => getStoryClient());
  const [verificationResults, setVerificationResults] = useState<Map<number, ContentCheckResult>>(new Map());
  const [isVerifying, setIsVerifying] = useState<Set<number>>(new Set());
  const [registrationStatus, setRegistrationStatus] = useState<{ isRegistering: boolean; progress: string }>({ 
    isRegistering: false, 
    progress: "" 
  });
```

Then add imports at the top of file:

```typescript
import { 
  verifyContentWithYakoa, 
  registerIPOnStory, 
  getWorkflowPath 
} from "./helpers/yakoaStoryIntegration";
```

📚 **See:** [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for complete step-by-step instructions.

---

## 💻 Usage

### Basic Workflow

1. **Open Extension** - Click IP Shield icon in Chrome toolbar
2. **Login** - Use admin/admin123 or demo/demo123
3. **Detect Content** - Click "Start Detection" to scan page
4. **Quick Protect** - Click "Protect This (Quick)" on original content
5. **Monitor** - View protected IPs in dashboard

### Advanced Features

#### Manual Verification

```typescript
import { verifyContentWithYakoa } from './helpers/yakoaStoryIntegration';

const result = await verifyContentWithYakoa(
  'https://example.com/image.jpg',
  'image',
  'My Artwork'
);

console.log(result.status); // 'ORIGINAL' | 'BRAND_IP_DETECTED' | 'ALREADY_REGISTERED'
```

#### Manual Registration

```typescript
import { registerIPOnStory } from './helpers/yakoaStoryIntegration';

const result = await registerIPOnStory({
  title: 'My Artwork',
  description: 'Original digital art',
  assetType: 'IMAGE',
  mediaUrl: 'ipfs://Qm...',
  licenseType: 'COMMERCIAL_USE',
  royaltyPercentage: 10,
  onProgress: (stage) => console.log(stage)
});

console.log(result.ipId); // '0x123...'
console.log(result.explorerUrl); // Story Protocol explorer link
```

---

## 🧪 Testing

### Test Yakoa Verification

```bash
# Test 1: Brand IP Detection
# Navigate to page dengan Nike/Adidas logo
# Expected: Status "BRAND_IP_DETECTED"

# Test 2: Original Content  
# Upload your own image
# Expected: Status "ORIGINAL"

# Test 3: Stock Photos
# Navigate to iStockPhoto/Shutterstock
# Expected: Status "ALREADY_REGISTERED"
```

### Test Story Registration

```bash
# Test 1: Mock Registration (Demo Mode)
# Set NEXT_PUBLIC_DEMO_MODE=true
# Expected: Simulated IP ID & TX hash

# Test 2: Real Registration (Testnet)
# Set up wallet with Story Protocol
# Expected: Actual blockchain transaction
```

---

## 📊 API Integration Details

### Yakoa API

**Base URL:** `https://ipshield.ip-api-sandbox.yakoa.io/story`

**Endpoints:**
- `POST /token` - Register content for verification
- `GET /token/:id` - Get verification results

**Response format:**
```json
{
  "isOriginal": true,
  "isInfringing": false,
  "confidence": 100,
  "infringements": [],
  "recommendations": ["Content appears to be original."]
}
```

### Story Protocol SDK

**Network:** Aeneid Testnet (Chain ID: 1315)  
**RPC:** `https://aeneid.storyrpc.io`  
**Explorer:** `https://aeneid.explorer.story.foundation`

**Methods:**
```typescript
// Register IP Asset
await storyClient.ipAsset.registerIpAsset({
  nft: { type: 'mint', spgNftContract: '0x...' },
  ipMetadata: { ipMetadataURI, nftMetadataURI },
  licenseTermsData: [{ terms: {...} }]
});
```

---

## 🔐 Security Considerations

### ⚠️ Important

1. **Never commit `.env.local`** - Contains sensitive API keys
2. **Use wallet connect in production** - Not private keys
3. **Enable HTTPS only** - For production deployment
4. **Validate user input** - Before API calls
5. **Rate limit API calls** - Prevent abuse

### Production Checklist

- [ ] Remove hardcoded private keys
- [ ] Implement wallet connect (MetaMask/WalletConnect)
- [ ] Add rate limiting
- [ ] Enable real IPFS uploads (Pinata/web3.storage)
- [ ] Setup error monitoring (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Deploy to production environment

---

## 🐛 Troubleshooting

### Common Issues

**Problem:** TypeScript errors after setup  
**Solution:** Run `npm install` and restart dev server

**Problem:** "Yakoa API key not configured"  
**Solution:** Add key to `.env.local` OR enable `DEMO_MODE=true`

**Problem:** Story Protocol registration fails  
**Solution:** Check wallet has testnet ETH, verify RPC connection

**Problem:** IPFS upload mock  
**Solution:** Implement real IPFS client (Pinata recommended)

### Debug Mode

Enable detailed logging:

```typescript
// In browser console
localStorage.setItem('DEBUG', 'ipshield:*');
```

---

## 📚 Documentation

- **Integration Guide:** [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Summary:** [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)
- **Env Template:** [ENV_TEMPLATE.md](./ENV_TEMPLATE.md)

### External Resources

- [Yakoa API Documentation](https://yakoa.io/docs)
- [Story Protocol Docs](https://docs.story.foundation)
- [Story SDK GitHub](https://github.com/storyprotocol/sdk)
- [Pinata IPFS](https://docs.pinata.cloud)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎉 Acknowledgments

- **Yakoa** - For IP verification API
- **Story Protocol** - For blockchain IP infrastructure
- **Team** - For building this awesome extension

---

## 📞 Support

- **Issues:** Open an issue on GitHub
- **Email:** support@ipshield.io
- **Discord:** [Join our community](#)

---

**Built with ❤️ by the IP Shield Team**

Last Updated: December 2025
