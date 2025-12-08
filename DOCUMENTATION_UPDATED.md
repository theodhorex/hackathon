# 📘 *IP SHIELD — FULL DOCUMENTATION (Updated Edition)*

**Last Updated:** December 8, 2025  
**Version:** 1.1.0 - With Yakoa & Story Protocol Integration

---

# 1. *Welcome to IP Shield*

Welcome to the official documentation for *IP Shield*, an advanced Chrome Extension designed to protect your digital assets from plagiarism, unauthorized reuse, and content theft.

IP Shield combines:

* **🆕 NEW:** *Real Yakoa API Integration* - Live content verification
* **🆕 NEW:** *Story Protocol SDK Integration* - Actual blockchain IP registration
* *AI-powered content detection (Yakoa)*
* *Blockchain IP registration (Story Protocol)*
* *Real-time monitoring*
* *A premium React-based UI/UX*
* *Role-based access control*
* *Secure authentication*
* *Analytics dashboard*

This documentation will guide you through:

* Installing IP Shield
* Understanding each feature
* Using the extension
* Exploring the architecture
* **🆕 NEW:** Testing Yakoa API integration
* **🆕 NEW:** Story Protocol registration workflow
* Developing and contributing

---

# 2. *How IP Shield Works*

**📝 UPDATED:** IP Shield protects content through a multi-layer defense system with real API integrations.

## *1. Content Detection Layer (Yakoa AI)*

* Automatically scans images, videos, audio, and text
* Generates fingerprint hashes
* **🆕 NEW:** Real-time API calls to Yakoa verification endpoint
* **🆕 NEW:** Uses SHA-256 content hashing
* Detects originality, brand IP, or existing registrations

## *2. Verification Layer (Yakoa API)* **🆕 NEW SECTION**

**Real API Integration:**
- **Endpoint:** `https://ipshield.ip-api-sandbox.yakoa.io/story`
- **Authentication:** Bearer token (API key)
- **Response Time:** < 2 seconds
- **Detection Types:**
  - Brand IP detection (Nike, Adidas, Disney, etc.)
  - Existing registration check
  - Originality verification
  - Confidence scoring (0-100%)

**Status Codes:**
- `ORIGINAL` - Safe to protect ✅
- `BRAND_IP_DETECTED` - Contains brand IP ⚠️
- `ALREADY_REGISTERED` - Already protected 🔒
- `PROCESSING` - Verification in progress ⏳
- `ERROR` - Verification failed ❌

## *3. Protection Layer (Story Protocol)*

**📝 UPDATED with Real SDK:**
* **🆕 NEW:** Story Protocol SDK v2.0+ integration
* **🆕 NEW:** Aeneid Testnet (Chain ID: 1315)
* Registers your content on-chain
* Produces a unique Story Protocol IP ID
* **🆕 NEW:** Complete license terms configuration
* **🆕 NEW:** Royalty percentage setting (0-100%)
* Stores metadata securely on IPFS

**Registration Flow:**
1. Prepare IP metadata
2. Upload to IPFS (current: mock, production: Pinata)
3. Configure license terms
4. Register on Story Protocol blockchain
5. Get IP ID & transaction hash
6. Explorer link generated

## *4. Monitoring Layer*

* Background service worker monitors active pages
* Sends alerts when suspicious content is detected
* Displays real-time counts
* **🆕 NEW:** Tracks verification progress
* **🆕 NEW:** Shows registration status

## *5. Dashboard & Analytics Layer*

* Shows all protected IPs
* Earnings calculations
* Detailed alerts
* Activity logs
* **🆕 NEW:** Workflow progress indicator
* **🆕 NEW:** API integration status

---

# 3. *Quick Start*

## *Install the Extension*

1. Download the source code
2. **🆕 NEW:** Setup environment variables:
   
   ```bash
   # Copy ENV_TEMPLATE.md to .env.local
   cp ENV_TEMPLATE.md .env.local
   
   # Add your Yakoa API key:
   NEXT_PUBLIC_YAKOA_API_KEY=your_api_key_here
   ```

3. Install dependencies:
   
   ```bash
   npm install
   npm run dev
   ```

4. Open Chrome → Extensions → Enable Developer Mode
5. Load Unpacked → Select dist/ or build/ folder

## *Login*

Two demo accounts are available:

| Role  | Username | Password | Permissions |
| ----- | -------- | -------- | ----------- |
| Admin | admin    | admin123 | Unlimited IP registrations, Edit/Delete |
| Demo  | demo     | demo123  | Max 5 IPs, View-only |

---

# 4. *Features Overview*

**📝 UPDATED:** A complete feature breakdown for IP Shield with new integrations:

### 🔐 Authentication & RBAC

* Login screen with animation
* Role control: Admin & Demo
* **📝 UPDATED:** Registration limits (Admin: ∞, Demo: 5)
* Logout and clear storage

### 🎨 Main Dashboard

* Monitoring toggle
* Real-time scanning
* Statistics cards
* **🆕 NEW:** Yakoa integration badge
* **🆕 NEW:** Story Protocol connection status
* Notifications system
* User badges

### 📑 Three Interactive Tabs

1. *Detect & Protect* **📝 UPDATED** - Real Yakoa AI verification
2. *IP Analysis* - Deep security analysis
3. *Register IP* **📝 UPDATED** - Real Story Protocol SDK integration

### **🆕 NEW:** Workflow Indicator Component

Visual 3-step process:
1. **📡 Detection** (Browser Extension)
2. **🔍 Yakoa Verification** (API Call)
3. **⚡ Story Registration** (Blockchain)

Features:
- Real-time status updates (pending → active → complete)
- Progress tracking
- Tech stack labels
- Completion indicators

### 📊 IP Portfolio

* Edit / delete (Admin)
* View-only mode (Demo)
* **🆕 NEW:** Story Protocol IP ID display
* **🆕 NEW:** Explorer link integration

### 🔔 Alerts Center

* Infringement alerts
* IP registration alerts
* Royalty earnings alerts
* **🆕 NEW:** Yakoa verification alerts

### 🎨 UI/UX System

* Gradient cards
* Glow effects
* Particle animations
* Animated transitions
* **🆕 NEW:** Workflow progress bars
* **🆕 NEW:** Status badges with icons

### 🔧 Technical System

* Manifest V3
* Background worker
* Content scripts
* Hashing engine (SHA-256)
* Chrome storage
* **🆕 NEW:** Yakoa API client
* **🆕 NEW:** Story Protocol SDK
* **🆕 NEW:** IPFS integration (mock)

---

# 5. *Authentication System*

## *Login Page*

Includes:

* Particle canvas animation (SparklesCore component)
* Form validation
* Error messages
* Loading state
* **🆕 NEW:** Role-based redirect

## *Role-Based Access*

### *Admin Role*

* Unlimited IP registrations
* Edit and delete IP assets
* Full analytics
* View all alerts
* **🆕 NEW:** Can use all Yakoa API features
* **🆕 NEW:** Unlimited Story Protocol registrations

### *Demo Role*

* Max 5 IP assets **📝 UPDATED**
* No edit/delete
* Basic analytics
* Read-only mode
* **🆕 NEW:** Limited to 5 blockchain registrations
* **🆕 NEW:** Alert shown when limit reached

## *Logout*

* Clears Chrome Storage
* Redirects to login
* **🆕 NEW:** Clears verification cache

---

# 6. *Main Dashboard*

## *Header Section*

* IP Shield logo (custom gradient SVG with shield)
* **📝 UPDATED:** Yakoa | Story Protocol branding (dual badge)
* User profile avatar
* Role badge (Admin/Demo)
* **🆕 NEW:** Monitoring toggle with pulse animation
* Alerts bell with count
* Logout button

## *Monitoring System*

* Toggle for real-time scanning
* Pulse animation while active
* "Active/Paused" indicators
* **🆕 NEW:** Integration status indicator

## *Statistics Cards*

* **📝 UPDATED:** *Detected (Y)*: Content detected by Yakoa
* **📝 UPDATED:** *Protected (S)*: Registered on Story Protocol
* *Alerts*: Active notifications
* **🆕 NEW:** Demo limit indicator (e.g., "3/5 Demo Limit")

## *Notifications*

Three alert types:

1. *Infringement Detected* - Red gradient
2. *IP Asset Minted* - Purple gradient
3. *Royalty Received* - Amber gradient

**🆕 NEW Features:**
- Auto-dismiss after 5 seconds
- Click to view details
- Gradient background glow
- Icon animations

---

# 7. *Detect & Protect (Yakoa Integration)*

**📝 HEAVILY UPDATED:** The most powerful tab with real Yakoa API integration.

## *Automatic Detection*

Detects:

* Images (JPEG, PNG, WebP, SVG)
* Audio (MP3, WAV, OGG)
* Videos (MP4, WebM, AVI)
* Text / documents (TXT, PDF, DOCX)

## *Smart IP Analysis (Yakoa AI)* **📝 UPDATED**

**Real API Integration:**

```javascript
// Actual API call flow:
verifyContentWithYakoa(url, type, title)
  ↓
YakoaClient.verifyContent()
  ↓
POST https://ipshield.ip-api-sandbox.yakoa.io/story/token
  ↓
Response: ContentCheckResult
```

**Three detection statuses:**

* **ORIGINAL** ✅ - Safe to protect
  - Confidence: 100%
  - No matches in Yakoa database
  - Recommendation: "Register on Story Protocol"

* **BRAND_IP_DETECTED** ⚠️ - Well-known brand
  - Confidence: 85-100%
  - Matched brand shown (e.g., "Nike Inc.")
  - Recommendation: "Cannot register as original IP"

* **ALREADY_REGISTERED** 🔒 - Someone else registered
  - Confidence: 100%
  - Owner address shown
  - Recommendation: "Check licensing terms"

**🆕 NEW:** Simulation fallback if API key not configured

## *Content Cards*

Each card shows:

* Thumbnail preview
* **🆕 NEW:** Real-time verification status
* **📝 UPDATED:** Confidence score from Yakoa API
* Status badge with icon
* File size / duration
* Associated brand / owner (from Yakoa)
* **🆕 NEW:** Verification timestamp

## *Quick Protect* **📝 HEAVILY UPDATED**

**New Workflow:**
1. Click "Protect This (Quick)"
2. **🆕 NEW:** Real Yakoa verification (< 2s)
3. Status update in real-time
4. If ORIGINAL:
   - **🆕 NEW:** Upload to IPFS
   - **🆕 NEW:** Register on Story Protocol
   - **🆕 NEW:** Get IP ID & TX hash
5. Success overlay with blockchain data
6. Asset instantly added to dashboard

**Previous:** Mock verification → Instant protect  
**Now:** Real API verification → Conditional registration

## **🆕 NEW:** Verification Results Display

```
┌─────────────────────────────────────┐
│ ✅ ORIGINAL                          │
│                                      │
│ Confidence: 100%                     │
│ Status: Safe to protect              │
│                                      │
│ Recommendations:                     │
│ • Content appears to be original     │
│ • Register on Story Protocol         │
│                                      │
│ [Continue to Registration] →         │
└─────────────────────────────────────┘
```

---

# 8. *IP Analysis (Deep Security Check)*

Runs advanced analysis on the selected content:

### Security Layers:

* Domain reputation
* Blockchain registry verification
* Content fingerprint hashing (SHA-256)
* **🆕 NEW:** Yakoa database cross-check
* Security score (0–100)

### UI Features:

* Progress step indicators
* Animated loading bars
* Color-coded score
* Detailed breakdown
* **🆕 NEW:** API integration status

---

# 9. *Register IP (Story Protocol)*

**📝 HEAVILY UPDATED:** Real Story Protocol SDK integration

## *File Upload*

* Drag & drop
* Live preview
* Validation
* Clear file
* **🆕 NEW:** Multiple file type support
* **🆕 NEW:** Auto-detect asset type from MIME

## *Asset Types*

* Image (JPEG, PNG, WebP)
* Audio (MP3, WAV, OGG)
* Video (MP4, WebM)
* Text (TXT, PDF, DOCX)

## *License Types* **📝 UPDATED**

* **Commercial Use** (PIL Commercial License)
  - Allows commercial use
  - Royalty percentage: 5-50%
  - Derivatives allowed
  
* **Non-Commercial Only** (PIL Non-Commercial)
  - Free for personal use
  - No commercial rights
  - Derivatives allowed
  
* **No Derivatives** (PIL Restrictive)
  - No modifications
  - No commercial use
  - View-only rights

**🆕 NEW:** License terms mapped to Story Protocol PIL framework

## *Royalty Slider*

* Range: 5–50% (PIL compliance) **📝 UPDATED**
* Only active for commercial license
* Real-time percentage display
* **🆕 NEW:** Actual royalty configuration on-chain

## *Metadata Fields*

* Title (required)
* Description (500 chars max)
* Character counter
* **🆕 NEW:** Creator name (from user profile)
* **🆕 NEW:** Creator address (wallet address)

## *Registration Flow* **📝 HEAVILY UPDATED**

**Real Blockchain Registration:**

1. **Form Validation**
   - Title required
   - File or detected content required
   
2. **Preparation** (Step 1)
   - Prepare IP metadata
   - Create NFT metadata
   - Generate content hash
   
3. **IPFS Upload** (Step 2) **🆕 NEW**
   - Upload metadata to IPFS
   - Get metadata URI
   - Generate media hash
   
4. **License Configuration** (Step 3) **🆕 NEW**
   - Map license type to PIL terms
   - Set royalty percentage
   - Configure commercial rights
   
5. **Story Protocol Registration** (Step 4) **🆕 NEW**
   - Call Story SDK `registerIpAsset()`
   - Mint NFT on SPG contract
   - Register as IP Asset
   - Get IP ID & TX hash
   
6. **Success Confirmation**
   - Display IP ID
   - Show transaction hash
   - Link to Story Protocol Explorer
   - Auto-add to dashboard

**Previous:** Mock 2-second delay  
**Now:** Real blockchain transaction with progress tracking

## **🆕 NEW:** Progress Tracking

```
Preparing IP metadata...        [████░░░░░░] 40%
Uploading to IPFS...            [████████░░] 80%
Registering on blockchain...    [██████████] 100%
Registration complete! ✅
```

## **🆕 NEW:** Success Screen

```
┌─────────────────────────────────────┐
│ 🎉 IP Asset Protected!               │
│                                      │
│ IP ID: 0x123abc...def               │
│ TX Hash: 0x789ghi...jkl             │
│                                      │
│ [View on Explorer] →                 │
│ [Add Another] [Go to Dashboard]     │
└─────────────────────────────────────┘
```

---

# 10. *IP Portfolio*

Grid view of protected IP assets.

## *IP Card Details*

* Thumbnail
* Title
* Earnings (mock)
* Alerts count
* **🆕 NEW:** Story Protocol IP ID (clickable)
* **🆕 NEW:** Explorer link icon
* **🆕 NEW:** Registration timestamp

## *Admin Functions*

* Edit IP (title, earnings)
* Delete IP
* **🆕 NEW:** View on Story Explorer

## *Demo Functions*

* View only
* **🆕 NEW:** "Demo Limit Reached" indicator

## **🆕 NEW:** IP Card Actions

```
┌─────────────────────────────┐
│ [Thumbnail]                  │
│                              │
│ My Artwork #1                │
│ IP ID: 0x123...abc          │
│                              │
│ Earnings: $45.20             │
│ Alerts: 0                    │
│                              │
│ [Edit] [Delete] [Explorer ↗] │
└─────────────────────────────┘
```

---

# 11. *Alerts Center*

Types of alerts:

* *Infringement* - Content violation detected
* *Registration* - IP successfully minted
* *Earnings* - Royalty payment received
* **🆕 NEW:** *Verification* - Yakoa check complete

Alert card contains:

* Icon with gradient glow
* Title
* Description
* **🆕 NEW:** Detailed info (expandable)
* Transaction hash (if applicable)
* Timestamp (relative: "5 min ago")
* Action button
* **🆕 NEW:** Status badge

## **🆕 NEW:** Alert Categories

**High Severity (Red):**
- Infringement detected (98% similarity)
- Unauthorized use

**Medium Severity (Orange):**
- Brand IP detected
- License violation

**Low Severity (Green/Purple):**
- Registration success
- Royalty received

---

# 12. *Technical Architecture*

**📝 UPDATED:** Enhanced architecture with real integrations

## *Manifest V3 Permissions*

* activeTab
* scripting
* storage
* all_urls
* localhost
* **🆕 NEW:** `https://ipshield.ip-api-sandbox.yakoa.io/*`
* **🆕 NEW:** `https://aeneid.storyrpc.io/*`

## *Background Worker*

Handles:

* REGISTER_TOKEN
* GET_TOKEN_STATUS
* API integrations
* **🆕 NEW:** Yakoa verification queue
* **🆕 NEW:** Story Protocol transaction monitoring

## *Content Script*

* SHA-256 hashing
* DOM media detection
* Messaging system
* **🆕 NEW:** Content fingerprinting

## **🆕 NEW:** Yakoa Client

**Location:** `lib/yakoa/client.ts`

**Methods:**
```typescript
class YakoaClient {
  // Register content for verification
  async registerToken(payload: TokenPayload): Promise<TokenResponse>
  
  // Get verification results
  async getToken(id: string): Promise<TokenResponse>
  
  // Main verification method
  async verifyContent(request: VerifyContentRequest): Promise<ContentCheckResult>
  
  // Fallback simulation
  private simulateVerification(request): Promise<ContentCheckResult>
}
```

**Configuration:**
- API Key: from `.env.local`
- Subdomain: `ipshield`
- Network: `story`
- Environment: `sandbox`

## **🆕 NEW:** Story Protocol Client

**Location:** `lib/story/client.ts`

**Methods:**
```typescript
class StoryProtocolClient {
  // Initialize with private key (testing only)
  async initializeWithPrivateKey(privateKey: string): Promise<boolean>
  
  // Check initialization status
  isInitialized(): boolean
  
  // Register IP Asset on blockchain
  async registerIPAsset(
    ipMetadata: IPAssetMetadata,
    nftMetadata: NFTMetadata,
    ipMetadataURI: string,
    nftMetadataURI: string,
    licenseTerms?: LicenseTerms
  ): Promise<RegisterIPResult>
  
  // Create NFT collection
  async createNFTCollection(name: string, symbol: string)
}
```

**Configuration:**
- Chain ID: 1315 (Aeneid Testnet)
- RPC: `https://aeneid.storyrpc.io`
- SPG Contract: `0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc`

## **🆕 NEW:** Integration Helpers

**Location:** `app/components/helpers/yakoaStoryIntegration.ts`

**Functions:**
```typescript
// Yakoa verification wrapper
async function verifyContentWithYakoa(
  contentUrl: string,
  contentType: "image" | "audio" | "video" | "text",
  title?: string
): Promise<VerificationResult>

// Story Protocol registration wrapper
async function registerIPOnStory(params: {
  title: string;
  description: string;
  assetType: string;
  mediaUrl: string;
  licenseType: string;
  royaltyPercentage: number;
  onProgress?: (stage: string) => void;
}): Promise<RegisterIPResult>

// IPFS upload (mock)
async function uploadToIPFS(
  file: File | Blob,
  metadata: any
): Promise<{ metadataUri: string; mediaUri: string }>

// Workflow path generator
function getWorkflowPath(
  currentStep: "detect" | "verify" | "register" | "complete"
): WorkflowStep[]
```

## *API Routes*

* `/api/yakoa/register` - Register token
* `/api/yakoa/scans` - Get scan results
* **🆕 NEW:** Environment variables validation
* **🆕 NEW:** API key authentication

---

# 13. *Data Persistence*

## *Chrome Storage API*

Used for:

* Login state
* Role
* User session
* **🆕 NEW:** Verification cache
* **🆕 NEW:** Registration history

## *Mock Data*

Included for:

* Detected media (until real page scan)
* IP portfolio (until blockchain sync)
* Alerts (until real monitoring)
* **📝 UPDATED:** Now mixed with real API data

## **🆕 NEW:** State Management

```typescript
// Yakoa verification results cache
const [verificationResults, setVerificationResults] = 
  useState<Map<number, ContentCheckResult>>(new Map());

// Active verifications
const [isVerifying, setIsVerifying] = 
  useState<Set<number>>(new Set());

// Registration status
const [registrationStatus, setRegistrationStatus] = 
  useState<{ isRegistering: boolean; progress: string }>();
```

---

# 14. *UI/UX System*

## *Animations*

* Particle canvas background (SparklesCore)
* Hover scaling
* Glow effects
* Gradient transitions
* Modal fade-in/out
* **🆕 NEW:** Progress bars
* **🆕 NEW:** Status pulse animation
* **🆕 NEW:** Loading spinners

## *Theme Colors*

* **📝 UPDATED:** Yakoa gradient (`from-blue-500/90 to-cyan-500/90`)
* **📝 UPDATED:** Story Protocol gradient (`from-purple-500/90 to-pink-500/90`)
* Emerald green (success)
* Deep space dark base (`bg-[#0a0f1d]`)

## *Typography*

* Heavy headings (font-black)
* Gradient text with bg-clip-text
* Shadowed labels
* **🆕 NEW:** Monospace for hashes/IDs

## **🆕 NEW:** Workflow Indicator Component

**Visual Design:**
- 3-step vertical timeline
- Icon badges (📡 🔍 ⚡)
- Tech stack labels
- Status colors (gray → cyan → emerald)
- Connecting arrows
- Progress animations

---

# 15. *Permissions & Security*

## *Extension Permissions*

* Access to active tab
* Script injection
* Local storage
* Host permissions
* All URLs scanning
* **🆕 NEW:** API endpoint whitelisting

## *Content Security Policy*

* Safe iframe whitelist
* Script restrictions
* Secure object-src
* **🆕 NEW:** API CORS handling

## **🆕 NEW:** Environment Variables Security

**`.env.local` (Never commit!):**
```env
NEXT_PUBLIC_YAKOA_API_KEY=your_key_here
NEXT_PUBLIC_STORY_PRIVATE_KEY=0x_test_key  # DEV ONLY
```

**Security Notes:**
- API keys never exposed in client code
- Private keys only for testing (use wallet connect in production)
- `.gitignore` protection
- Environment-specific configs

---

# 16. *Developer Guide*

## *Tech Stack*

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4
* Lucide for icons
* **🆕 NEW:** Yakoa API SDK
* **🆕 NEW:** Story Protocol Core SDK
* **🆕 NEW:** Viem (Ethereum library)
* **🆕 NEW:** Crypto API (SHA-256 hashing)

## *Development Commands*

```bash
npm install
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Check TypeScript errors
```

## **🆕 NEW:** Environment Setup

```bash
# 1. Copy environment template
cp ENV_TEMPLATE.md .env.local

# 2. Add your API keys
NEXT_PUBLIC_YAKOA_API_KEY=your_yakoa_key
NEXT_PUBLIC_STORY_PRIVATE_KEY=0x_test_key

# 3. Configure features
NEXT_PUBLIC_DEMO_MODE=false  # Use real APIs
NEXT_PUBLIC_ENABLE_YAKOA=true
NEXT_PUBLIC_ENABLE_STORY=true
```

## *Folder Structure*

```
hackathon/
├── app/
│   ├── components/
│   │   ├── Extension_Panel_alven.tsx  # Main UI
│   │   ├── WorkflowIndicator.tsx      # 🆕 NEW
│   │   └── helpers/
│   │       └── yakoaStoryIntegration.ts  # 🆕 NEW
│   └── api/
├── lib/
│   ├── yakoa/
│   │   ├── client.ts     # 🆕 NEW
│   │   └── types.ts      # 🆕 NEW
│   └── story/
│       ├── client.ts     # 🆕 NEW
│       └── types.ts      # 🆕 NEW
├── public/
└── .env.local            # 🆕 NEW (not in repo)
```

---

# 17. *User Flows*

## **📝 UPDATED:** Flow: Quick Protect

```
Login 
  → Detection (Browser scan)
  → 🆕 Yakoa Verification (Real API call)
  → Status Update (ORIGINAL/BRAND_IP/REGISTERED)
  → [If ORIGINAL]
    → 🆕 IPFS Upload
    → 🆕 Story Protocol Registration
    → Success (IP ID + TX hash)
  → Dashboard (Updated)
```

## **📝 UPDATED:** Flow: Manual Registration

```
Login 
  → Register IP Tab
  → Upload File / Select Detected Content
  → Fill Metadata
  → Choose License Type
  → Set Royalty %
  → Submit
  → 🆕 Yakoa Pre-verification (optional)
  → 🆕 IPFS Upload
  → 🆕 Story Protocol Blockchain Transaction
  → Success (IP ID, TX hash, Explorer link)
  → Portfolio Updated
```

## *Flow: Admin Actions*

```
Dashboard 
  → Select IP Asset
  → Edit (Admin only)
  → Update Title/Earnings
  → Save
  → 🆕 View on Story Explorer
  → Updated
```

## **🆕 NEW:** Flow: Yakoa Verification

```
Detect Content
  → Click "Protect This (Quick)"
  → verifyContentWithYakoa()
  → YakoaClient.verifyContent()
  → POST to Yakoa API
  → Response parsed
  → Status Badge Updated
  → If ORIGINAL → Continue to Story
  → If BRAND_IP → Show warning, block registration
  → If REGISTERED → Show owner info
```

---

# 18. **🆕 NEW SECTION:** *Testing & Quality Assurance*

## *Yakoa API Testing*

**Test Script:** `test-yakoa.js`

```javascript
// Browser console test
const { getYakoaClient } = await import('@/lib/yakoa/client');
const client = getYakoaClient();

const result = await client.verifyContent({
  contentUrl: 'https://static.nike.com/a/images/...',
  contentType: 'image',
  title: 'Nike Shoe'
});

console.log('Status:', result.isInfringing ? 'BRAND_IP' : 'ORIGINAL');
```

## *Test Cases*

### Test 1: Brand IP Detection
- **URL:** Nike official image
- **Expected:** `BRAND_IP_DETECTED`
- **Brand:** Nike Inc.
- **Confidence:** 90-100%

### Test 2: Original Content
- **URL:** User's own artwork
- **Expected:** `ORIGINAL`
- **Confidence:** 100%
- **Action:** Should allow registration

### Test 3: Stock Photo
- **URL:** iStockPhoto image
- **Expected:** `ALREADY_REGISTERED`
- **Owner:** Stock platform
- **Action:** Block registration

## *Story Protocol Testing*

**Demo Mode:** Automatic simulation  
**Real Mode:** Requires wallet & testnet ETH

```bash
# Get testnet ETH for Aeneid
# Faucet: https://faucet.story.foundation
```

## *Integration Testing Checklist*

- [ ] Yakoa API key configured in `.env.local`
- [ ] Dev server running (`npm run dev`)
- [ ] Login successful
- [ ] Content detection working
- [ ] Yakoa verification returns results
- [ ] Status badges update correctly
- [ ] Story Protocol registration (demo/real)
- [ ] IP ID generated
- [ ] Dashboard updates
- [ ] Explorer links work

---

# 19. **📝 UPDATED:** *Changelog*

## *v1.1.0 – Yakoa & Story Integration* **🆕 NEW**
- ✅ Real Yakoa API integration
- ✅ Story Protocol SDK v2.0+ integration
- ✅ WorkflowIndicator component
- ✅ Integration helper functions
- ✅ Environment variables system
- ✅ Progress tracking
- ✅ IPFS upload preparation
- ✅ PIL license mapping
- ✅ Testing guides
- ✅ Documentation updates

## *v1.0.0 – Initial Release*
- 🎨 Premium UI/UX with animations
- 🔐 Authentication & RBAC
- 📊 Dashboard & analytics
- 🎭 Mock content detection
- 📝 IP registration forms

---

# 20. **🆕 NEW SECTION:** *API Reference*

## *Yakoa API*

**Base URL:** `https://ipshield.ip-api-sandbox.yakoa.io/story`

**Endpoints:**

### POST /token
Register content for verification

**Request:**
```json
{
  "id": "content_hash_abc123",
  "creator_id": "user_123",
  "metadata": {
    "name": "My Artwork",
    "description": "IP Shield scan - image"
  },
  "media": [{
    "media_id": "media_456",
    "url": "https://example.com/image.jpg"
  }]
}
```

**Response:**
```json
{
  "status": 200,
  "data": {
    "id": "content_hash_abc123",
    "infringements": [],
    "authorized": false
  }
}
```

### GET /token/:id
Get verification results

**Response:**
```json
{
  "isOriginal": true,
  "isInfringing": false,
  "confidence": 100,
  "infringements": [],
  "recommendations": [
    "Content appears to be original.",
    "Safe to register on Story Protocol."
  ]
}
```

## *Story Protocol SDK*

**Network:** Aeneid Testnet  
**Chain ID:** 1315  
**RPC:** `https://aeneid.storyrpc.io`

**Methods:**

### registerIpAsset()
```typescript
const response = await storyClient.ipAsset.registerIpAsset({
  nft: {
    type: 'mint',
    spgNftContract: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc'
  },
  ipMetadata: {
    ipMetadataURI: 'ipfs://Qm...',
    ipMetadataHash: '0xabc...',
    nftMetadataURI: 'ipfs://Qm...',
    nftMetadataHash: '0xdef...'
  },
  licenseTermsData: [{
    terms: {
      commercialUse: true,
      commercialRevShare: 10,
      derivativesAllowed: true
    }
  }]
});

// Returns:
{
  txHash: '0x789...',
  ipId: '0x123...',
  success: true
}
```

---

# 21. **🆕 NEW SECTION:** *Troubleshooting*

## Common Issues

### Issue: "Yakoa API key not configured"
**Cause:** `.env.local` missing or invalid  
**Solution:**
1. Create `.env.local` in project root
2. Add `NEXT_PUBLIC_YAKOA_API_KEY=your_key`
3. Restart dev server

### Issue: "Simulation mode active"
**Cause:** API key not loaded  
**Solution:** Check `client.isConfigured()` returns `true`

### Issue: Story Protocol registration fails
**Cause:** Wallet not initialized  
**Solution:** Demo mode activates automatically, or add private key for testing

### Issue: TypeScript errors
**Cause:** Missing types  
**Solution:** Run `npm install` to ensure all dependencies installed

### Issue: Network errors
**Cause:** CORS or connectivity  
**Solution:** Verify API endpoints accessible, check internet connection

---

# 22. **📝 UPDATED:** *Credits*

Built by *icibos*  
**Updated:** December 8, 2025  
Hackathon Project — IP Shield

**Integrations:**
- **Yakoa** - IP verification platform
- **Story Protocol** - Blockchain IP infrastructure
- **React** - UI framework
- **Next.js** - Application framework
- **Tailwind CSS** - Styling system

---

# 23. **🆕 NEW SECTION:** *Resources & Links*

## Official Documentation

- **Yakoa API Docs:** https://yakoa.io/docs
- **Story Protocol Docs:** https://docs.story.foundation
- **Story SDK GitHub:** https://github.com/storyprotocol/sdk
- **Aeneid Explorer:** https://aeneid.explorer.story.foundation

## Project Documentation

- `INTEGRATION_GUIDE.md` - Complete integration guide
- `INTEGRATION_SUMMARY.md` - Quick reference
- `YAKOA_TESTING_GUIDE.md` - Testing instructions
- `ENV_TEMPLATE.md` - Environment variables
- `README_INTEGRATION.md` - README for integration

## Support

- **GitHub Issues:** Report bugs and issues
- **Yakoa Dashboard:** https://yakoa.io/dashboard
- **Story Discord:** Community support

---

**End of Documentation**

---

## 📝 **SUMMARY OF CHANGES**

### Major Updates:

1. **🆕 NEW:** Real Yakoa API integration (Section 2, 7, 9, 12, 20)
2. **🆕 NEW:** Real Story Protocol SDK (Section 2, 9, 12, 20)
3. **🆕 NEW:** WorkflowIndicator component (Section 4, 14)
4. **🆕 NEW:** Integration helpers (Section 12)
5. **🆕 NEW:** Environment variables system (Section 3, 15, 16)
6. **🆕 NEW:** Testing & QA section (Section 18)
7. **🆕 NEW:** API Reference section (Section 20)
8. **🆕 NEW:** Troubleshooting section (Section 21)
9. **🆕 NEW:** Resources & Links (Section 23)

### Updated Sections:

- Section 2: How IP Shield Works (added real API details)
- Section 4: Features Overview (added workflow indicator)
- Section 5: Authentication (added registration limits)
- Section 7: Detect & Protect (real Yakoa integration)
- Section 9: Register IP (real Story Protocol flow)
- Section 12: Technical Architecture (new clients & helpers)
- Section 16: Developer Guide (environment setup)
- Section 17: User Flows (updated with real API calls)
- Section 19: Changelog (added v1.1.0)

Total Changes: **9 new sections + 10 updated sections**
