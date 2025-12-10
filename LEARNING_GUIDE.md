# IP Shield Extension - Panduan Pembelajaran Code

Panduan lengkap untuk memahami arsitektur dan implementasi IP Shield Extension dari dasar hingga advanced.

---

## Daftar Isi

1. [Konsep Dasar](#konsep-dasar)
2. [Struktur Project](#struktur-project)
3. [Component Architecture](#component-architecture)
4. [State Management](#state-management)
5. [API Integration](#api-integration)
6. [Workflow Implementation](#workflow-implementation)
7. [Advanced Features](#advanced-features)
8. [Best Practices](#best-practices)

---

## Konsep Dasar

### Apa itu Chrome Extension?

Chrome Extension adalah program kecil yang menambahkan fitur ke browser Chrome. Extension ini terdiri dari:

1. **manifest.json** - File konfigurasi yang memberitahu Chrome tentang extension
2. **popup/panel** - UI yang muncul ketika user klik icon extension
3. **background script** - Script yang berjalan di background
4. **content script** - Script yang bisa akses DOM halaman web

### Apa itu React Component?

React Component adalah fungsi JavaScript yang mengembalikan UI (tampilan). Contoh:

```typescript
function MyComponent() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
```

### Apa itu State?

State adalah data yang bisa berubah dalam component. Ketika state berubah, UI akan otomatis update.

```typescript
const [count, setCount] = useState(0); // count = 0 di awal

// Untuk ubah count:
setCount(5); // sekarang count = 5, UI akan update
```

### Apa itu API Call?

API call adalah cara program berkomunikasi dengan server external. Contoh:

```typescript
// Kirim request ke Yakoa API
const response = await fetch('https://yakoa.io/api/verify', {
  method: 'POST',
  body: JSON.stringify({ url: 'image.jpg' })
});

const result = await response.json();
// result berisi data dari server
```

---

## Struktur Project

### File-File Penting

```
hackathon/
├── app/
│   ├── components/
│   │   ├── Extension_Panel_alven.tsx    # MAIN FILE - UI utama extension
│   │   ├── LoginScreen.tsx              # Login page
│   │   ├── WorkflowIndicator.tsx        # Progress indicator
│   │   └── helpers/
│   │       └── yakoaStoryIntegration.ts # Helper functions untuk API
│   │
│   └── api/                             # API routes (untuk Next.js backend)
│
├── lib/
│   ├── yakoa/
│   │   ├── client.ts                    # Yakoa API client
│   │   └── types.ts                     # Type definitions
│   │
│   └── story/
│       ├── client.ts                    # Story Protocol client
│       └── types.ts                     # Type definitions
│
├── .env.local                           # API keys (SECRET)
└── package.json                         # Dependencies
```

### Hierarki Component

```
IPShieldExtension (Main Component)
│
├── LoginScreen (jika belum login)
│
└── MainPanelView (jika sudah login)
    │
    ├── Header (logo, user info, alerts)
    │
    ├── Statistics Cards (detected, protected, alerts)
    │
    ├── Tab Selector (Detect, IP Analysis, Register)
    │
    └── Tab Content
        │
        ├── ContentSidebarView (Detect & Protect tab)
        │   └── Content Cards (detected images, videos, dll)
        │
        ├── IPAnalysisView (IP Analysis tab)
        │   └── Security analysis interface
        │
        └── RegisterIPView (Register IP tab)
            └── Registration form
```

---

## Component Architecture

### 1. Main Component Structure

File: `Extension_Panel_alven.tsx`

Ini adalah komponen utama. Mari kita breakdown bagian per bagian:

#### A. Imports

```typescript
import React, { useState, useEffect, useRef } from "react";
```

**Penjelasan:**
- `React` - Library untuk membuat UI
- `useState` - Hook untuk membuat state (data yang bisa berubah)
- `useEffect` - Hook untuk jalankan code ketika component load atau state berubah
- `useRef` - Hook untuk akses DOM element atau simpan value yang persist

```typescript
import { getYakoaClient } from "@/lib/yakoa/client";
import { getStoryClient } from "@/lib/story/client";
```

**Penjelasan:**
- Import client untuk Yakoa dan Story Protocol
- `@/lib` adalah alias untuk folder `lib/` (configured di Next.js)

```typescript
import { 
  verifyContentWithYakoa, 
  registerIPOnStory 
} from "./helpers/yakoaStoryIntegration";
```

**Penjelasan:**
- Import helper functions yang wrap API calls
- Fungsi-fungsi ini buat API calls jadi lebih mudah dipakai

#### B. Type Definitions

```typescript
interface DetectedContent {
  id: number;
  url: string;
  type: string;
  status: string;
  confidence: number;
  size: string;
  title: string;
  alt: string;
  brand?: string;    // ? artinya optional
  owner?: string;    // bisa ada atau tidak
}
```

**Penjelasan:**
- `interface` mendefinisikan struktur data
- `DetectedContent` adalah objek yang merepresentasikan konten yang terdeteksi
- `?` setelah property name artinya property itu optional (boleh tidak ada)

**Contoh penggunaan:**
```typescript
const content: DetectedContent = {
  id: 1,
  url: "https://example.com/image.jpg",
  type: "image",
  status: "ORIGINAL",
  confidence: 100,
  size: "1920x1080",
  title: "My Artwork",
  alt: "Digital Art"
  // brand dan owner tidak wajib ada
};
```

#### C. State Management

**State untuk Authentication:**

```typescript
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState<typeof DUMMY_USERS[0] | null>(null);
```

**Penjelasan:**
- `isLoggedIn` - Boolean, true jika user sudah login
- `currentUser` - Object yang berisi data user (username, role, dll) atau `null` jika belum login
- `setIsLoggedIn` dan `setCurrentUser` adalah function untuk update state

**Cara kerja:**
```typescript
// Saat login berhasil:
setIsLoggedIn(true);
setCurrentUser({ username: "admin", role: "admin", ... });

// Saat logout:
setIsLoggedIn(false);
setCurrentUser(null);
```

**State untuk UI:**

```typescript
const [currentPage, setCurrentPage] = useState("main");
const [activeTab, setActiveTab] = useState("content");
const [showSidebar, setShowSidebar] = useState(false);
```

**Penjelasan:**
- `currentPage` - String yang menentukan page apa yang ditampilkan ("main", "dashboard", "alerts")
- `activeTab` - Tab mana yang active ("content", "ip", "register")
- `showSidebar` - Boolean, true jika sidebar harus ditampilkan

**Cara kerja:**
```typescript
// User klik tab "Register IP":
setActiveTab("register");

// User klik "Start Detection":
setShowSidebar(true);

// User klik close sidebar:
setShowSidebar(false);
```

**State untuk Data:**

```typescript
const [detectedContent, setDetectedContent] = useState<DetectedContent[]>([
  {
    id: 1,
    url: "...",
    type: "image",
    status: "ORIGINAL",
    // ... other properties
  }
]);
```

**Penjelasan:**
- `detectedContent` adalah array of objects
- `<DetectedContent[]>` artinya array yang isinya harus sesuai type DetectedContent
- Initial value adalah array berisi mock data

**Cara update:**
```typescript
// Tambah content baru:
setDetectedContent(prev => [...prev, newContent]);

// Update status content tertentu:
setDetectedContent(prev => 
  prev.map(content => 
    content.id === 1 
      ? { ...content, status: "PROTECTED" }
      : content
  )
);
```

**State untuk Yakoa & Story Integration:**

```typescript
const [yakoaClient] = useState(() => getYakoaClient());
const [storyClient] = useState(() => getStoryClient());
const [verificationResults, setVerificationResults] = 
  useState<Map<number, ContentCheckResult>>(new Map());
const [isVerifying, setIsVerifying] = useState<Set<number>>(new Set());
```

**Penjelasan:**
- `yakoaClient` - Instance dari YakoaClient, dibuat sekali saat component mount
- `storyClient` - Instance dari StoryProtocolClient
- `verificationResults` - Map yang store hasil verification dari Yakoa (key: content id, value: result)
- `isVerifying` - Set yang track content mana yang sedang di-verify

**Cara kerja Map:**
```typescript
// Simpan verification result:
setVerificationResults(prev => {
  const newMap = new Map(prev);
  newMap.set(contentId, result);
  return newMap;
});

// Ambil result untuk content tertentu:
const result = verificationResults.get(contentId);
```

**Cara kerja Set:**
```typescript
// Tandai content sedang di-verify:
setIsVerifying(prev => {
  const newSet = new Set(prev);
  newSet.add(contentId);
  return newSet;
});

// Check apakah content sedang di-verify:
const isCurrentlyVerifying = isVerifying.has(contentId);
```

---

### 2. Effect Hooks

#### useEffect untuk Background Animation

```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Setup canvas
  canvas.width = 400;
  canvas.height = 600;

  // Create particles
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    });
  }

  // Animation loop
  const animate = () => {
    // Clear canvas
    ctx.fillStyle = "rgba(10, 15, 25, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    particles.forEach(p => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Bounce at edges
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 255, 255, ${p.opacity})`;
      ctx.fill();
    });

    // Continue animation
    requestAnimationFrame(animate);
  };

  animate();

  // Cleanup
  return () => cancelAnimationFrame(animationId);
}, []); // Empty array = run once on mount
```

**Penjelasan:**
- `useEffect` dengan empty dependency array `[]` berarti code di dalamnya hanya run sekali saat component pertama kali di-render
- `canvasRef.current` adalah reference ke `<canvas>` element di DOM
- `getContext("2d")` memberikan API untuk drawing 2D graphics
- Particles adalah array of objects yang store posisi dan velocity setiap partikel
- `animate()` function dipanggil terus-menerus menggunakan `requestAnimationFrame` untuk create smooth animation
- `return () => ...` adalah cleanup function yang dipanggil saat component unmount

#### useEffect untuk Monitoring

```typescript
useEffect(() => {
  let interval;
  
  if (isMonitoring) {
    interval = setInterval(() => {
      setNotificationQueue(prevQueue => {
        if (prevQueue.length === 0) {
          // Create new alert
          const randomAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
          const newAlert = { ...randomAlert, id: Date.now() };
          
          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            setNotificationQueue(currentQueue => 
              currentQueue.filter(a => a.id !== newAlert.id)
            );
          }, 5000);
          
          return [...prevQueue, newAlert];
        }
        return prevQueue;
      });
    }, 10000); // Check every 10 seconds
  } else {
    setNotificationQueue([]);
  }

  return () => clearInterval(interval);
}, [isMonitoring]); // Run when isMonitoring changes
```

**Penjelasan:**
- Dependency array `[isMonitoring]` berarti effect ini re-run setiap kali `isMonitoring` berubah
- `setInterval` membuat timer yang run function setiap 10 detik
- `prevQueue => ...` adalah function update yang terima state sebelumnya
- `...randomAlert` adalah spread operator - copy semua properties dari randomAlert
- `Date.now()` memberikan timestamp unik untuk ID
- Cleanup function `clearInterval` penting untuk prevent memory leaks

---

### 3. Handler Functions

#### Login Handler

```typescript
const handleLogin = (username: string, password: string) => {
  // Find user in DUMMY_USERS array
  const user = DUMMY_USERS.find(u => 
    u.username === username && u.password === password
  );
  
  if (user) {
    // Login successful
    setCurrentUser(user);
    setIsLoggedIn(true);
    setLoginError("");
  } else {
    // Login failed
    setLoginError("Invalid username or password");
  }
};
```

**Penjelasan:**
- `find()` mencari item pertama dalam array yang match condition
- `u => u.username === username` adalah arrow function yang return true/false
- Jika user ditemukan, update state untuk login
- Jika tidak, set error message

**Flow:**
```
User fill form → Submit → handleLogin called
                            ↓
                    Check credentials
                       /        \
                  Match         No Match
                    ↓              ↓
              Set logged in    Set error
                    ↓
              Show dashboard
```

#### Quick Protect Handler (IMPORTANT)

```typescript
const quickProtect = async (content: DetectedContent) => {
  // 1. Close sidebar immediately
  setShowSidebar(false);
  
  // 2. Set initial status
  const registeredIpData = {
    title: content.title,
    assetType: content.type.toUpperCase(),
    previewUrl: content.url,
    status: "PROCESSING",
  };
  setQuickProtectSuccessData(registeredIpData);
  setShowQuickProtectSuccess(true);

  // 3. Simulate registration delay (2 seconds)
  setTimeout(() => {
    // 4. Add to dashboard
    addProtectedIP(registeredIpData);

    // 5. Update status in detected list
    updateContentStatus(content.id, "PROTECTED");

    // 6. Update success view
    setQuickProtectSuccessData({ 
      ...registeredIpData, 
      status: "PROTECTED" 
    });
  }, 2000);
};
```

**Penjelasan:**
- `async` keyword berarti function ini bisa pakai `await` untuk async operations
- Function ini punya 6 steps yang jelas
- `setTimeout` simulate delay untuk show loading state
- `...registeredIpData` copy semua properties lalu override `status`

**Untuk integrate dengan Yakoa & Story (NEW):**

```typescript
const quickProtect = async (content: DetectedContent) => {
  setShowSidebar(false);
  
  try {
    // Step 1: Verify dengan Yakoa
    const yakoaResult = await verifyContentWithYakoa(
      content.url,
      content.type as "image" | "audio" | "video" | "text",
      content.title
    );

    // Step 2: Update status berdasarkan verification
    updateContentStatus(content.id, yakoaResult.status);

    // Step 3: Jika ORIGINAL, register ke Story Protocol
    if (yakoaResult.status === "ORIGINAL") {
      setRegistrationStatus({ 
        isRegistering: true, 
        progress: "Registering..." 
      });
      
      const storyResult = await registerIPOnStory({
        title: content.title,
        description: `Protected by IP Shield`,
        assetType: content.type.toUpperCase() as any,
        mediaUrl: content.url,
        licenseType: "NON_COMMERCIAL",
        royaltyPercentage: 0,
        onProgress: (stage) => {
          setRegistrationStatus({ 
            isRegistering: true, 
            progress: stage 
          });
        },
      });

      if (storyResult.success) {
        addProtectedIP({
          title: content.title,
          assetType: content.type.toUpperCase(),
          previewUrl: content.url,
          status: "PROTECTED",
        });
        updateContentStatus(content.id, "PROTECTED");
      }
      
      setRegistrationStatus({ 
        isRegistering: false, 
        progress: "" 
      });
    }
  } catch (error) {
    console.error("Quick protect error:", error);
    updateContentStatus(content.id, "ERROR");
  }
};
```

**Penjelasan NEW version:**
- `try-catch` untuk handle errors
- `await` menunggu async function selesai
- `onProgress` adalah callback function yang dipanggil saat ada update
- Conditional logic: hanya register jika status ORIGINAL

---

### 4. Helper Functions

#### Add Protected IP

```typescript
const addProtectedIP = (ipData: { 
  title: string; 
  assetType?: string; 
  previewUrl?: string; 
  status?: string;
}) => {
  const perms = getUserPermissions();

  // Check if demo user reached limit
  if (protectedIPs.length >= perms.maxIPRegistrations) {
    alert(`Registration Limit Reached!
    
Demo users can only register up to ${perms.maxIPRegistrations} IP assets.

Upgrade to Admin for unlimited registrations.`);
    return;
  }

  // Add new IP to the front of array
  setProtectedIPs(prev => [
    {
      id: Date.now(),
      url: ipData.previewUrl || "https://via.placeholder.com/200",
      title: ipData.title,
      status: "protected",
      earnings: "$0.00",
      alerts: 0,
      storyId: "0x" + Math.random().toString(16).substring(2, 8) + "...",
    },
    ...prev, // existing IPs
  ]);
};
```

**Penjelasan:**
- Check permission dulu sebelum add
- `prev => [newItem, ...prev]` pattern untuk add item di depan array
- `Date.now()` untuk unique ID
- `Math.random().toString(16)` generate random hex string untuk mock Story ID

#### Update Content Status

```typescript
const updateContentStatus = (id: number, newStatus: string) => {
  setDetectedContent(prev =>
    prev.map(content =>
      content.id === id 
        ? { ...content, status: newStatus }
        : content
    )
  );
};
```

**Penjelasan:**
- `map()` create new array dengan transform setiap item
- Hanya item dengan `id` yang match akan di-update
- Item lain tetap sama (immutability pattern)

**Visualisasi:**
```
Before: [
  { id: 1, status: "ORIGINAL" },
  { id: 2, status: "ORIGINAL" },
  { id: 3, status: "BRAND_IP" }
]

updateContentStatus(1, "PROTECTED")

After: [
  { id: 1, status: "PROTECTED" },  ← Updated
  { id: 2, status: "ORIGINAL" },   ← Unchanged
  { id: 3, status: "BRAND_IP" }    ← Unchanged
]
```

---

## API Integration

### 1. Yakoa Client

File: `lib/yakoa/client.ts`

#### Client Class Structure

```typescript
export class YakoaClient {
  private apiKey: string;
  private subdomain: string;
  private network: string;
  private env: string;

  constructor() {
    // Read from environment variables
    this.apiKey = process.env.NEXT_PUBLIC_YAKOA_API_KEY || "";
    this.subdomain = process.env.NEXT_PUBLIC_YAKOA_SUBDOMAIN || "ipshield";
    this.network = process.env.NEXT_PUBLIC_YAKOA_NETWORK || "story";
    this.env = process.env.NEXT_PUBLIC_YAKOA_ENV || "sandbox";
  }

  private baseUrl(): string {
    if (this.env === "production") {
      return `https://${this.subdomain}.ip-api.yakoa.io/${this.network}`;
    }
    return `https://${this.subdomain}.ip-api-sandbox.yakoa.io/${this.network}`;
  }

  isConfigured(): boolean {
    return !!this.apiKey; // !! converts to boolean
  }
}
```

**Penjelasan:**
- `private` berarti property hanya bisa diakses dari dalam class
- `process.env.XXX` membaca environment variables dari `.env.local`
- `||` adalah OR operator - pakai value kiri jika ada, kalo tidak pakai value kanan
- `!!` adalah double NOT - convert any value ke boolean (truthy → true, falsy → false)

#### Verify Content Method

```typescript
async verifyContent(request: VerifyContentRequest): Promise<ContentCheckResult> {
  // Check if API key configured
  if (!this.isConfigured()) {
    console.warn("Yakoa API key not configured, using simulation mode");
    return this.simulateVerification(request);
  }

  try {
    // Step 1: Create content hash
    const tokenId = await this.createContentHash(request.contentUrl);

    // Step 2: Register token
    const registerPayload: TokenPayload = {
      id: tokenId,
      creator_id: request.creatorId || "anonymous",
      metadata: {
        name: request.title || "Untitled Content",
        description: `IP Shield scan - ${request.contentType}`,
      },
      media: [{
        media_id: `media_${tokenId}`,
        url: request.contentUrl,
      }],
    };

    const registerResponse = await this.registerToken(registerPayload);

    if (registerResponse.status !== 200 && registerResponse.status !== 201) {
      // Fallback to simulation
      return this.simulateVerification(request);
    }

    // Step 3: Wait for processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 4: Get verification results
    const tokenResponse = await this.getToken(tokenId);

    if (tokenResponse.status === 200) {
      return this.parseYakoaResponse(tokenResponse.data);
    }

    // Fallback
    return this.simulateVerification(request);
    
  } catch (error) {
    console.error("Content verification error:", error);
    return this.simulateVerification(request);
  }
}
```

**Penjelasan step-by-step:**

**Step 1: Create content hash**
```typescript
const tokenId = await this.createContentHash(request.contentUrl);
```
- Generate unique ID dari URL menggunakan SHA-256
- `await` menunggu async operation selesai

**Step 2: Register token**
```typescript
const registerPayload = { ... };
const registerResponse = await this.registerToken(registerPayload);
```
- Create payload object dengan format yang di-expect Yakoa API
- Call `registerToken` untuk kirim ke API
- `await` menunggu response

**Step 3: Wait**
```typescript
await new Promise(resolve => setTimeout(resolve, 1000));
```
- Pause 1 second untuk kasih waktu Yakoa process request
- `new Promise` create Promise yang resolve setelah timeout

**Step 4: Get results**
```typescript
const tokenResponse = await this.getToken(tokenId);
return this.parseYakoaResponse(tokenResponse.data);
```
- Fetch hasil verification
- Parse response ke format yang dipakai app

**Error Handling:**
- Multiple fallback ke `simulateVerification` jika API gagal
- `try-catch` untuk catch unexpected errors
- Graceful degradation - app tetap bisa jalan walau API down

#### Register Token Method

```typescript
async registerToken(payload: TokenPayload): Promise<TokenResponse> {
  const endpoint = `${this.baseUrl()}/token`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return {
      status: res.status,
      data: data,
    };
  } catch (error: any) {
    console.error("Yakoa registerToken error:", error);
    return {
      status: 500,
      data: { error: error.message || "Failed to register token" },
    };
  }
}
```

**Penjelasan:**
- `fetch` adalah API untuk HTTP requests
- `method: "POST"` berarti kita kirim data
- `headers` berisi metadata request:
  - `Content-Type` memberitahu server kita kirim JSON
  - `Authorization` berisi API key untuk authentication
- `JSON.stringify(payload)` convert JavaScript object ke JSON string
- `res.json()` parse JSON response ke JavaScript object
- Error handling dengan try-catch

**Flow visualisasi:**
```
Client Code
    ↓
registerToken(payload)
    ↓
fetch(endpoint, { method: POST, headers, body })
    ↓
HTTP Request ke Yakoa API
    ↓
Yakoa Server Process
    ↓
HTTP Response
    ↓
Parse JSON
    ↓
Return { status, data }
    ↓
Caller receives result
```

---

### 2. Story Protocol Client

File: `lib/story/client.ts`

#### Initialize Method

```typescript
async initializeWithPrivateKey(privateKey: string): Promise<boolean> {
  try {
    // Create account from private key
    const account = privateKeyToAccount(privateKey as `0x${string}`);
    this.walletAddress = account.address;

    // Configure Story Protocol client
    const config: StoryConfig = {
      account: account,
      transport: http(STORY_RPC_URL),
      chainId: "aeneid",
    };

    // Create client instance
    this.client = StoryClient.newClient(config);
    return true;
  } catch (error) {
    console.error("Failed to initialize Story Protocol client:", error);
    return false;
  }
}
```

**Penjelasan:**
- `privateKeyToAccount` convert private key string ke account object
- `as \`0x${string}\`` adalah TypeScript type assertion - memberitahu TS bahwa string ini format 0x...
- `http(STORY_RPC_URL)` create HTTP transport untuk communicate dengan blockchain
- `StoryClient.newClient(config)` initialize SDK dengan configuration
- Return boolean untuk indicate success/failure

**Note:** Untuk production, JANGAN pakai private key hardcoded. Pakai wallet connect (MetaMask, dll).

#### Register IP Asset Method

```typescript
async registerIPAsset(
  ipMetadata: IPAssetMetadata,
  nftMetadata: NFTMetadata,
  ipMetadataURI: string,
  nftMetadataURI: string,
  licenseTerms?: LicenseTerms
): Promise<RegisterIPResult> {
  // Check initialization
  if (!this.client) {
    return {
      success: false,
      error: "Client not initialized. Please connect your wallet first.",
    };
  }

  try {
    // Step 1: Create metadata hashes
    const ipHash = await this.createHash(JSON.stringify(ipMetadata));
    const nftHash = await this.createHash(JSON.stringify(nftMetadata));

    // Step 2: Build registration request
    const registrationRequest: any = {
      nft: {
        type: "mint",
        spgNftContract: SPG_NFT_CONTRACT,
      },
      ipMetadata: {
        ipMetadataURI: ipMetadataURI,
        ipMetadataHash: `0x${ipHash}`,
        nftMetadataURI: nftMetadataURI,
        nftMetadataHash: `0x${nftHash}`,
      },
    };

    // Step 3: Add license terms if provided
    if (licenseTerms && licenseTerms.commercialUse) {
      registrationRequest.licenseTermsData = [{
        terms: {
          commercialUse: licenseTerms.commercialUse,
          commercialRevShare: licenseTerms.commercialRevShare,
          derivativesAllowed: licenseTerms.derivativesAllowed,
        },
      }];
    }

    // Step 4: Execute blockchain transaction
    const response = await this.client.ipAsset.registerIpAsset(registrationRequest);

    // Step 5: Return success with blockchain data
    return {
      success: true,
      txHash: response.txHash,
      ipId: response.ipId,
      explorerUrl: `https://aeneid.explorer.story.foundation/ipa/${response.ipId}`,
    };
  } catch (error: any) {
    console.error("Failed to register IP Asset:", error);
    return {
      success: false,
      error: error.message || "Failed to register IP Asset",
    };
  }
}
```

**Penjelasan step-by-step:**

**Guard clause:**
```typescript
if (!this.client) {
  return { success: false, error: "..." };
}
```
- Check dulu apakah client sudah di-initialize
- Early return jika belum - prevent error

**Create hashes:**
```typescript
const ipHash = await this.createHash(JSON.stringify(ipMetadata));
```
- `JSON.stringify` convert object ke string
- `createHash` generate SHA-256 hash untuk verification
- Hash ini penting untuk blockchain immutability

**Build request:**
```typescript
const registrationRequest = {
  nft: { type: "mint", ... },
  ipMetadata: { ... },
  licenseTermsData: [ ... ] // optional
};
```
- Object ini sesuai format yang di-expect Story Protocol SDK
- Conditional `licenseTermsData` - hanya add jika commercial license

**Execute transaction:**
```typescript
const response = await this.client.ipAsset.registerIpAsset(registrationRequest);
```
- Ini actual blockchain transaction
- Bisa take beberapa detik
- Cost gas (ETH)

**Return result:**
```typescript
return {
  success: true,
  txHash: response.txHash,  // Transaction hash untuk track di blockchain
  ipId: response.ipId,      // Unique IP Asset ID
  explorerUrl: "..."        // Link ke explorer untuk lihat detail
};
```

---

### 3. Integration Helpers

File: `app/components/helpers/yakoaStoryIntegration.ts`

#### Verify Content Wrapper

```typescript
export async function verifyContentWithYakoa(
  contentUrl: string,
  contentType: "image" | "audio" | "video" | "text",
  title?: string
): Promise<{
  status: "ORIGINAL" | "BRAND_IP_DETECTED" | "ALREADY_REGISTERED" | "ERROR";
  confidence: number;
  brand?: string;
  owner?: string;
  recommendations: string[];
  yakoaResult?: ContentCheckResult;
}> {
  try {
    // Step 1: Get Yakoa client
    const yakoaClient = getYakoaClient();
    
    // Step 2: Call verification
    const result = await yakoaClient.verifyContent({
      contentUrl,
      contentType,
      title,
    });

    // Step 3: Map result to UI status
    let status: "ORIGINAL" | "BRAND_IP_DETECTED" | "ALREADY_REGISTERED" | "ERROR";
    
    if (result.isInfringing) {
      status = "BRAND_IP_DETECTED";
    } else if (result.matchedOwner) {
      status = "ALREADY_REGISTERED";
    } else if (result.isOriginal) {
      status = "ORIGINAL";
    } else {
      status = "ERROR";
    }

    // Step 4: Return formatted result
    return {
      status,
      confidence: result.confidence,
      brand: result.matchedBrand,
      owner: result.matchedOwner,
      recommendations: result.recommendations,
      yakoaResult: result,
    };
  } catch (error) {
    console.error("Yakoa verification error:", error);
    return {
      status: "ERROR",
      confidence: 0,
      recommendations: ["Verification failed. Please try again."],
    };
  }
}
```

**Kenapa perlu wrapper?**

1. **Simplifikasi** - UI code tidak perlu tau detail Yakoa API
2. **Error handling** - Centralized error management
3. **Type safety** - Return type yang konsisten
4. **Mapping** - Convert API response ke format yang UI butuhkan

**Contoh penggunaan:**

```typescript
// Di component:
const result = await verifyContentWithYakoa(
  "https://example.com/image.jpg",
  "image",
  "My Artwork"
);

if (result.status === "ORIGINAL") {
  // Lanjut ke registration
} else if (result.status === "BRAND_IP_DETECTED") {
  alert(`Cannot register: contains ${result.brand} IP`);
}
```

#### Register IP Wrapper

```typescript
export async function registerIPOnStory(params: {
  title: string;
  description: string;
  assetType: "IMAGE" | "AUDIO" | "VIDEO" | "TEXT";
  mediaUrl: string;
  licenseType: "COMMERCIAL_USE" | "NON_COMMERCIAL" | "NO_DERIVATIVES";
  royaltyPercentage: number;
  creatorAddress?: string;
  creatorName?: string;
  onProgress?: (stage: string) => void;
}): Promise<RegisterIPResult & { ipfsMetadataUri?: string; ipfsMediaUri?: string }> {
  const { onProgress, ...restParams } = params;

  try {
    const storyClient = getStoryClient();

    // Check initialization
    if (!storyClient.isInitialized()) {
      // Demo mode - simulate registration
      onProgress?.("Wallet not connected - using simulation mode");
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        ipId: `0x${Math.random().toString(16).substring(2, 10)}...`,
        txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        explorerUrl: `https://aeneid.explorer.story.foundation/ipa/0x...`,
        ipfsMetadataUri: `ipfs://Qm${Math.random().toString(36).substring(2, 15)}`,
        ipfsMediaUri: `ipfs://Qm${Math.random().toString(36).substring(2, 15)}`,
      };
    }

    // REAL REGISTRATION MODE

    // Step 1: Prepare metadata
    onProgress?.("Preparing IP metadata...");
    
    const ipMetadata: IPAssetMetadata = {
      title: params.title,
      description: params.description,
      image: params.mediaUrl,
      mediaUrl: params.mediaUrl,
      mediaType: params.assetType.toLowerCase(),
      creators: [{
        name: params.creatorName || "Anonymous Creator",
        address: params.creatorAddress || storyClient.getWalletAddress() || "0x0",
        contributionPercent: 100,
      }],
    };

    // Step 2: Upload to IPFS
    onProgress?.("Uploading to IPFS...");
    const { metadataUri, mediaUri } = await uploadToIPFS(
      new Blob([JSON.stringify(ipMetadata)]),
      ipMetadata
    );

    // Step 3: Configure license
    onProgress?.("Configuring license terms...");
    let licenseTerms: LicenseTerms | undefined;
    
    if (params.licenseType === "COMMERCIAL_USE") {
      licenseTerms = {
        commercialUse: true,
        commercialRevShare: params.royaltyPercentage,
        derivativesAllowed: true,
      };
    } else if (params.licenseType === "NON_COMMERCIAL") {
      licenseTerms = {
        commercialUse: false,
        commercialRevShare: 0,
        derivativesAllowed: true,
      };
    } else {
      licenseTerms = {
        commercialUse: false,
        commercialRevShare: 0,
        derivativesAllowed: false,
      };
    }

    // Step 4: Register on blockchain
    onProgress?.("Registering on Story Protocol blockchain...");
    const result = await storyClient.registerIPAsset(
      ipMetadata,
      { name: params.title, description: params.description, image: params.mediaUrl },
      metadataUri,
      metadataUri,
      licenseTerms
    );

    onProgress?.("Registration complete!");

    return {
      ...result,
      ipfsMetadataUri: metadataUri,
      ipfsMediaUri: mediaUri,
    };
  } catch (error: any) {
    console.error("Story Protocol registration error:", error);
    return {
      success: false,
      error: error.message || "Failed to register on Story Protocol",
    };
  }
}
```

**Penjelasan:**

**Parameter destructuring:**
```typescript
const { onProgress, ...restParams } = params;
```
- `onProgress` dipisahkan
- `...restParams` berisi semua parameter lainnya

**Optional chaining:**
```typescript
onProgress?.("Preparing...");
```
- `?.` berarti hanya panggil function jika exists
- Jika `onProgress` undefined, tidak error

**Progress tracking:**
```typescript
onProgress?.("Step 1");
// ... do work ...
onProgress?.("Step 2");
// ... do work ...
onProgress?.("Complete!");
```

Ini memungkinkan UI show real-time progress:
```
UI shows: "Preparing IP metadata..."
UI shows: "Uploading to IPFS..."
UI shows: "Registering on blockchain..."
UI shows: "Complete!"
```

**Demo vs Real mode:**
```typescript
if (!storyClient.isInitialized()) {
  // Demo mode - return mock data
} else {
  // Real mode - actual blockchain transaction
}
```

---

## Workflow Implementation

### Complete Protection Flow (Integration)

Sekarang kita lihat bagaimana semua pieces connect:

#### 1. User clicks "Protect This (Quick)"

```typescript
// Di ContentSidebarView component:
<button
  onClick={() => quickProtect(content)}
  disabled={content.status !== "ORIGINAL"}
>
  Protect This (Quick)
</button>
```

**Penjelasan:**
- `onClick={() => quickProtect(content)}` - arrow function yang call `quickProtect` dengan parameter `content`
- `disabled={...}` - button disabled jika status bukan ORIGINAL

#### 2. quickProtect function executed

```typescript
const quickProtect = async (content: DetectedContent) => {
  // UI update: close sidebar
  setShowSidebar(false);
  
  // UI update: show processing
  setQuickProtectSuccessData({
    title: content.title,
    assetType: content.type.toUpperCase(),
    previewUrl: content.url,
    status: "PROCESSING",
  });
  setShowQuickProtectSuccess(true);

  try {
    // YAKOA VERIFICATION
    const yakoaResult = await verifyContentWithYakoa(
      content.url,
      content.type as "image" | "audio" | "video" | "text",
      content.title
    );

    // Update UI with verification result
    updateContentStatus(content.id, yakoaResult.status);

    // CONDITIONAL REGISTRATION
    if (yakoaResult.status === "ORIGINAL") {
      // Set registering state
      setRegistrationStatus({ isRegistering: true, progress: "Starting..." });
      
      // STORY PROTOCOL REGISTRATION
      const storyResult = await registerIPOnStory({
        title: content.title,
        description: `Protected by IP Shield - ${content.type}`,
        assetType: content.type.toUpperCase() as any,
        mediaUrl: content.url,
        licenseType: "NON_COMMERCIAL",
        royaltyPercentage: 0,
        onProgress: (stage) => {
          // Update progress di UI
          setRegistrationStatus({ isRegistering: true, progress: stage });
        },
      });

      if (storyResult.success) {
        // Add to dashboard
        addProtectedIP({
          title: content.title,
          assetType: content.type.toUpperCase(),
          previewUrl: content.url,
          status: "PROTECTED",
        });

        // Update detected content status
        updateContentStatus(content.id, "PROTECTED");

        // Update success view
        setQuickProtectSuccessData({
          title: content.title,
          assetType: content.type.toUpperCase(),
          previewUrl: content.url,
          status: "PROTECTED",
        });
      }
      
      // Clear registering state
      setRegistrationStatus({ isRegistering: false, progress: "" });
    } else {
      // Not original - show verification result only
      setQuickProtectSuccessData({
        title: content.title,
        assetType: content.type.toUpperCase(),
        previewUrl: content.url,
        status: yakoaResult.status,
      });
    }
  } catch (error) {
    console.error("Quick protect error:", error);
    updateContentStatus(content.id, "ERROR");
    setRegistrationStatus({ isRegistering: false, progress: "" });
  }
};
```

**Flow visualisasi:**

```
User Click
    ↓
quickProtect(content)
    ↓
UI: Close sidebar, show "Processing"
    ↓
Call verifyContentWithYakoa()
    ↓
    [Yakoa Client]
    verifyContent() → API call → Response
    ↓
Parse result
    ↓
Update UI: show verification status
    ↓
Check if ORIGINAL?
    ├─ NO → Show result, stop
    └─ YES → Continue
        ↓
        Call registerIPOnStory()
        ↓
        [Story Client]
        - Prepare metadata
        - Upload IPFS
        - Configure license
        - registerIPAsset() → Blockchain TX
        ↓
        Get IP ID + TX Hash
        ↓
        Update UI: addProtectedIP()
        ↓
        Show success with blockchain data
```

---

## Advanced Features

### 1. Role-Based Access Control (RBAC)

#### Permission Definition

```typescript
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
```

#### Get User Permissions

```typescript
const getUserPermissions = () => {
  if (!currentUser) return PERMISSIONS.demo;
  return PERMISSIONS[currentUser.role as keyof typeof PERMISSIONS] || PERMISSIONS.demo;
};
```

**Penjelasan:**
- `keyof typeof PERMISSIONS` adalah TypeScript type yang berarti "admin" | "demo"
- `|| PERMISSIONS.demo` adalah fallback

#### Check Permission

```typescript
const canUserPerform = (action: 'edit' | 'delete' | 'register') => {
  const perms = getUserPermissions();
  
  if (action === 'edit') return perms.canEdit;
  if (action === 'delete') return perms.canDelete;
  if (action === 'register') return protectedIPs.length < perms.maxIPRegistrations;
  
  return false;
};
```

#### Enforce Permission in UI

```typescript
// Di IP Dashboard:
{getUserPermissions().canEdit && (
  <button onClick={() => openEditModal(ip)}>
    Edit
  </button>
)}

{getUserPermissions().canDelete && (
  <button onClick={() => deleteIP(ip.id)}>
    Delete
  </button>
)}
```

**Penjelasan:**
- `&&` adalah AND operator
- `getUserPermissions().canEdit && <Component>` berarti:
  - Jika `canEdit` true, render `<Component>`
  - Jika false, render nothing

#### Enforce Permission in Function

```typescript
const addProtectedIP = (ipData) => {
  const perms = getUserPermissions();

  // Check limit
  if (protectedIPs.length >= perms.maxIPRegistrations) {
    alert(`Registration Limit Reached!
    
Demo users can only register up to ${perms.maxIPRegistrations} IP assets.

Upgrade to Admin for unlimited registrations.`);
    return; // Stop execution
  }

  // Continue with add...
  setProtectedIPs(prev => [newIP, ...prev]);
};
```

---

### 2. State Persistence (Chrome Storage)

```typescript
// Save to Chrome Storage
chrome.storage.local.set({
  isLoggedIn: true,
  currentUser: userObject
}, () => {
  console.log('Saved to storage');
});

// Read from Chrome Storage
chrome.storage.local.get(['isLoggedIn', 'currentUser'], (result) => {
  setIsLoggedIn(result.isLoggedIn || false);
  setCurrentUser(result.currentUser || null);
});

// Clear storage on logout
chrome.storage.local.clear(() => {
  console.log('Storage cleared');
});
```

**Penjelasan:**
- `chrome.storage.local` adalah API khusus Chrome Extension
- Data persist even after browser close
- `set()` untuk save
- `get()` untuk retrieve
- `clear()` untuk delete all

---

### 3. Notification System

#### Alert Type Definition

```typescript
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
```

#### Generate Alert

```typescript
const mockAlerts = [
  {
    id: 1,
    type: "infringement",
    severity: "high",
    title: "New Infringement Detected",
    description: "Your artwork 'Neon City' appeared on OpenSea",
    detailedInfo: "Similarity: 98% (Exact Match) - User: 0xBad...Actor",
    timestamp: new Date(),
    ipId: "0x123...abc",
    action: "View Report",
    icon: <AlertTriangle />,
    color: "from-red-500 via-rose-500 to-red-600",
  },
  // ... more alerts
];
```

#### Auto-dismiss Logic

```typescript
useEffect(() => {
  let interval;
  
  if (isMonitoring) {
    interval = setInterval(() => {
      setNotificationQueue(prevQueue => {
        if (prevQueue.length === 0) {
          const randomAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
          const newAlert = { ...randomAlert, id: Date.now() };
          
          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            setNotificationQueue(currentQueue => 
              currentQueue.filter(a => a.id !== newAlert.id)
            );
          }, 5000);
          
          return [...prevQueue, newAlert];
        }
        return prevQueue;
      });
    }, 10000);
  }

  return () => clearInterval(interval);
}, [isMonitoring]);
```

**Penjelasan:**
- `setInterval` creates timer yang run setiap 10 detik
- Jika queue empty, add random alert
- `setTimeout` untuk auto-dismiss setelah 5 detik
- `filter(a => a.id !== newAlert.id)` remove alert dengan ID tertentu

---

## Best Practices

### 1. State Updates (Immutability)

**WRONG:**
```typescript
// Jangan direct mutate array
detectedContent.push(newItem);
setDetectedContent(detectedContent); // Won't trigger re-render!
```

**CORRECT:**
```typescript
// Create new array
setDetectedContent(prev => [...prev, newItem]);
```

**WRONG:**
```typescript
// Jangan direct mutate object
content.status = "PROTECTED";
setActiveContent(content); // Won't trigger re-render!
```

**CORRECT:**
```typescript
// Create new object
setActiveContent(prev => ({
  ...prev,
  status: "PROTECTED"
}));
```

### 2. Async Operations

**WRONG:**
```typescript
const handleClick = () => {
  const result = verifyContent(); // Missing await!
  console.log(result); // Will be Promise, not actual result
};
```

**CORRECT:**
```typescript
const handleClick = async () => {
  const result = await verifyContent();
  console.log(result); // Actual result
};
```

### 3. Error Handling

**WRONG:**
```typescript
const verifyContent = async () => {
  const result = await yakoa.verify(url); // What if this fails?
  return result;
};
```

**CORRECT:**
```typescript
const verifyContent = async () => {
  try {
    const result = await yakoa.verify(url);
    return result;
  } catch (error) {
    console.error("Verification failed:", error);
    return { status: "ERROR", message: error.message };
  }
};
```

### 4. Cleanup in useEffect

**WRONG:**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);
  // Missing cleanup!
}, []);
```

**CORRECT:**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);
  
  return () => clearInterval(interval); // Cleanup
}, []);
```

### 5. Conditional Rendering

**WRONG:**
```typescript
{isLoggedIn ? <Dashboard /> : null}
{!isLoggedIn ? <Login /> : null}
```

**BETTER:**
```typescript
{isLoggedIn ? <Dashboard /> : <Login />}
```

**EVEN BETTER:**
```typescript
{isLoggedIn && <Dashboard />}
{!isLoggedIn && <Login />}
```

---

## Summary

### Key Concepts to Remember

1. **Component = Function that returns UI**
2. **State = Data that can change**
3. **useState = Create state**
4. **useEffect = Run code on mount/update**
5. **async/await = Handle async operations**
6. **try/catch = Handle errors**
7. **Immutability = Never mutate state directly**
8. **Props = Data passed to components**
9. **Callbacks = Functions passed as props**
10. **API Integration = fetch() to communicate with servers**

### Learning Path

**Beginner:**
1. Understand component structure
2. Learn useState and basic state management
3. Understand props passing
4. Learn basic event handling (onClick, onChange)

**Intermediate:**
5. Learn useEffect and lifecycle
6. Understand async/await
7. Learn error handling
8. Understand immutability

**Advanced:**
9. Learn API integration
10. Understand state management patterns
11. Learn TypeScript types
12. Implement complex workflows

---

**Selamat belajar! Semoga penjelasan ini membantu Anda memahami code IP Shield Extension.**
