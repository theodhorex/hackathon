# IP Shield - Visual Architecture Guide

Panduan visual untuk memahami arsitektur dan data flow IP Shield Extension.

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     IP SHIELD EXTENSION                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    FRONTEND LAYER                          │ │
│  │                                                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │ │
│  │  │LoginScreen   │  │MainPanel     │  │Workflow      │   │ │
│  │  │Component     │  │Component     │  │Indicator     │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │ │
│  │                                                            │ │
│  │  State: isLoggedIn, currentUser, detectedContent, etc.    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↕                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  INTEGRATION LAYER                         │ │
│  │                                                            │ │
│  │  ┌────────────────────┐      ┌────────────────────┐      │ │
│  │  │ yakoaStory         │      │ Helper Functions   │      │ │
│  │  │ Integration.ts     │      │ Utilities          │      │ │
│  │  └────────────────────┘      └────────────────────┘      │ │
│  │                                                            │ │
│  │  verifyContentWithYakoa(), registerIPOnStory()            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↕                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    CLIENT LAYER                            │ │
│  │                                                            │ │
│  │  ┌──────────────┐                  ┌──────────────┐      │ │
│  │  │YakoaClient   │                  │StoryClient   │      │ │
│  │  │              │                  │              │      │ │
│  │  │verifyContent │                  │registerIPAsset│     │ │
│  │  │registerToken │                  │initializeWith│      │ │
│  │  │getToken      │                  │PrivateKey    │      │ │
│  │  └──────────────┘                  └──────────────┘      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
│                                                                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │  Yakoa API       │              │ Story Protocol   │        │
│  │                  │              │ Blockchain       │        │
│  │  Endpoint:       │              │                  │        │
│  │  ipshield.ip-api-│              │  Network:        │        │
│  │  sandbox.yakoa.io│              │  Aeneid Testnet  │        │
│  │                  │              │  Chain ID: 1315  │        │
│  │  Auth: Bearer    │              │  RPC: aeneid...  │        │
│  └──────────────────┘              └──────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
IPShieldExtension (Root)
│
├─ isLoggedIn === false
│  └─ LoginScreen
│     ├─ SparklesCore (background animation)
│     ├─ Login Form
│     │  ├─ Username Input
│     │  ├─ Password Input
│     │  └─ Submit Button
│     └─ Demo Account Info
│
└─ isLoggedIn === true
   └─ MainPanelView
      │
      ├─ Header Section
      │  ├─ IPShield Logo
      │  ├─ Yakoa x Story Badge
      │  ├─ User Info
      │  │  ├─ Avatar
      │  │  ├─ Role Badge (Admin/Demo)
      │  │  └─ Logout Button
      │  └─ Alerts Bell (with count)
      │
      ├─ Monitoring Toggle
      │  ├─ On/Off Switch
      │  └─ Status Indicator (pulse animation)
      │
      ├─ Statistics Cards
      │  ├─ Detected (Y) - from Yakoa
      │  ├─ Protected (S) - on Story
      │  └─ Alerts - notification count
      │
      ├─ Tab Navigation
      │  ├─ [Detect & Protect] 
      │  ├─ [IP Analysis]
      │  └─ [Register IP]
      │
      └─ Tab Content (conditional based on activeTab)
         │
         ├─ activeTab === "content"
         │  └─ ContentSidebarView
         │     ├─ Header "Detected Content"
         │     ├─ Content Grid
         │     │  └─ ContentCard (for each detected)
         │     │     ├─ Thumbnail
         │     │     ├─ Title & Type
         │     │     ├─ Status Badge
         │     │     ├─ Confidence %
         │     │     ├─ File Size/Duration
         │     │     └─ Quick Protect Button
         │     └─ Empty State (if no content)
         │
         ├─ activeTab === "ip"
         │  └─ IPAnalysisView
         │     ├─ Selected Content Display
         │     ├─ Analysis Progress Steps
         │     │  ├─ Domain Reputation
         │     │  ├─ Blockchain Registry
         │     │  ├─ Content Fingerprint
         │     │  └─ Security Score
         │     └─ Results Display
         │
         └─ activeTab === "register"
            └─ RegisterIPView
               ├─ step === 1 (Form)
               │  ├─ File Upload Area
               │  ├─ Metadata Fields
               │  │  ├─ Title Input
               │  │  ├─ Description Textarea
               │  │  ├─ Asset Type Dropdown
               │  │  └─ License Type Selector
               │  ├─ Royalty Slider
               │  └─ Register Button
               │
               └─ step === 2 (Success)
                  ├─ Success Icon
                  ├─ IP ID Display
                  ├─ Transaction Hash
                  ├─ Explorer Link
                  └─ Action Buttons
                     ├─ Register Another
                     └─ View Dashboard
```

---

## State Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       STATE STRUCTURE                        │
└─────────────────────────────────────────────────────────────┘

Authentication State
├─ isLoggedIn: boolean
└─ currentUser: User | null
   ├─ username: string
   ├─ name: string
   ├─ email: string
   ├─ avatar: string
   └─ role: "admin" | "demo"

UI State
├─ currentPage: string ("main" | "dashboard" | "alerts")
├─ activeTab: string ("content" | "ip" | "register")
├─ showSidebar: boolean
├─ showAnalysisView: boolean
└─ showRegisterView: boolean

Data State
├─ detectedContent: DetectedContent[]
│  └─ DetectedContent
│     ├─ id: number
│     ├─ url: string
│     ├─ type: string
│     ├─ status: string
│     ├─ confidence: number
│     ├─ title: string
│     └─ brand?: string
│
├─ protectedIPs: ProtectedIP[]
│  └─ ProtectedIP
│     ├─ id: number
│     ├─ title: string
│     ├─ storyId: string
│     ├─ earnings: string
│     └─ alerts: number
│
└─ notificationQueue: AlertItem[]
   └─ AlertItem
      ├─ id: number
      ├─ type: string
      ├─ title: string
      └─ timestamp: Date

Integration State (NEW)
├─ yakoaClient: YakoaClient
├─ storyClient: StoryProtocolClient
├─ verificationResults: Map<number, ContentCheckResult>
├─ isVerifying: Set<number>
└─ registrationStatus: { isRegistering: boolean; progress: string }
```

---

## Data Flow: Quick Protect Action

```
USER ACTION: Click "Protect This (Quick)"
    ↓
┌──────────────────────────────────────────────┐
│ quickProtect(content)                        │
│ - Close sidebar                              │
│ - Set status to "PROCESSING"                 │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ verifyContentWithYakoa()                     │
│ - Get Yakoa client                           │
│ - Call verifyContent()                       │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ YakoaClient.verifyContent()                  │
│ 1. Create content hash (SHA-256)             │
│ 2. POST /token (register)                    │
│ 3. Wait 1 second                             │
│ 4. GET /token/:id (get results)              │
│ 5. Parse response                            │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ HTTP Request → Yakoa API                     │
│ POST https://ipshield.ip-api-sandbox...     │
│ Authorization: Bearer <API_KEY>              │
│ Body: { id, creator_id, metadata, media }   │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Yakoa Server Processing                      │
│ - Check brand database (Nike, Adidas, etc)   │
│ - Check existing registrations               │
│ - Calculate confidence score                 │
│ - Generate recommendations                   │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ HTTP Response ← Yakoa API                    │
│ {                                            │
│   isOriginal: true/false,                    │
│   isInfringing: true/false,                  │
│   confidence: 95,                            │
│   matchedBrand: "Nike Inc.",                 │
│   recommendations: [...]                     │
│ }                                            │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Parse & Map Status                           │
│ isInfringing → BRAND_IP_DETECTED             │
│ matchedOwner → ALREADY_REGISTERED            │
│ isOriginal → ORIGINAL                        │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Update UI                                    │
│ updateContentStatus(id, status)              │
│ - Update detectedContent array               │
│ - Badge shows new status                     │
└──────────────────────────────────────────────┘
    ↓
    Decision Point
    ┌──────────────┬──────────────┐
    │              │              │
status != ORIGINAL  status == ORIGINAL
    │              │
    ↓              ↓
Stop Here      Continue to Story
               Registration
    ↓
┌──────────────────────────────────────────────┐
│ registerIPOnStory()                          │
│ - Prepare IP metadata                        │
│ - Upload to IPFS                             │
│ - Configure license terms                    │
│ - Call registerIPAsset()                     │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ StoryClient.registerIPAsset()                │
│ 1. Check initialization                      │
│ 2. Create metadata hashes                    │
│ 3. Build registration request                │
│ 4. Execute blockchain transaction            │
│ 5. Wait for confirmation                     │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Blockchain Transaction                       │
│ Network: Aeneid Testnet                      │
│ Contract: SPG NFT Contract                   │
│ Action: Mint NFT + Register IP               │
│ Gas: ~0.0001 ETH                             │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Transaction Confirmed                        │
│ {                                            │
│   txHash: "0x789...",                        │
│   ipId: "0x123...",                          │
│   success: true                              │
│ }                                            │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Update Dashboard                             │
│ addProtectedIP({                             │
│   title, assetType, previewUrl, storyId      │
│ })                                           │
└──────────────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────┐
│ Show Success                                 │
│ - Status: PROTECTED                          │
│ - Display IP ID                              │
│ - Show Explorer link                         │
│ - Add to portfolio grid                      │
└──────────────────────────────────────────────┘
```

---

## API Communication Pattern

```
┌─────────────────────────────────────────────────────────┐
│                   EXTENSION (Client)                     │
└─────────────────────────────────────────────────────────┘
                        ↓ (1) Call function
┌─────────────────────────────────────────────────────────┐
│            verifyContentWithYakoa(url, type)            │
│                  (Helper Function)                       │
└─────────────────────────────────────────────────────────┘
                        ↓ (2) Delegate to client
┌─────────────────────────────────────────────────────────┐
│              yakoaClient.verifyContent()                │
│                  (Client Class)                          │
└─────────────────────────────────────────────────────────┘
                        ↓ (3) HTTP Request
┌─────────────────────────────────────────────────────────┐
│                   fetch(endpoint, {                      │
│                     method: "POST",                      │
│                     headers: { Authorization: ... },     │
│                     body: JSON.stringify(payload)        │
│                   })                                     │
└─────────────────────────────────────────────────────────┘
                        ↓ (4) Network
┌─────────────────────────────────────────────────────────┐
│             Yakoa API Server (External)                  │
│       https://ipshield.ip-api-sandbox.yakoa.io          │
└─────────────────────────────────────────────────────────┘
                        ↓ (5) Processing
┌─────────────────────────────────────────────────────────┐
│  Database Check → AI Analysis → Result Generation       │
└─────────────────────────────────────────────────────────┘
                        ↓ (6) HTTP Response
┌─────────────────────────────────────────────────────────┐
│              { status: 200, data: {...} }                │
└─────────────────────────────────────────────────────────┘
                        ↓ (7) Parse
┌─────────────────────────────────────────────────────────┐
│         response.json() → JavaScript Object              │
└─────────────────────────────────────────────────────────┘
                        ↓ (8) Map to UI format
┌─────────────────────────────────────────────────────────┐
│      { status: "ORIGINAL", confidence: 100, ... }        │
└─────────────────────────────────────────────────────────┘
                        ↓ (9) Return to caller
┌─────────────────────────────────────────────────────────┐
│                  Extension (Client)                      │
│              Update UI based on result                   │
└─────────────────────────────────────────────────────────┘
```

---

## State Update Pattern

```
Initial State:
detectedContent = [
  { id: 1, title: "Image 1", status: "ORIGINAL" },
  { id: 2, title: "Image 2", status: "ORIGINAL" }
]

User Action: Protect content with id=1
    ↓
updateContentStatus(1, "PROCESSING")
    ↓
┌──────────────────────────────────────────┐
│ setDetectedContent(prev =>              │
│   prev.map(content =>                   │
│     content.id === 1                    │
│       ? { ...content, status: "PROCESSING" }
│       : content                         │
│   )                                     │
│ )                                       │
└──────────────────────────────────────────┘
    ↓
Updated State:
detectedContent = [
  { id: 1, title: "Image 1", status: "PROCESSING" }, ← Changed
  { id: 2, title: "Image 2", status: "ORIGINAL" }     ← Unchanged
]
    ↓
React Re-renders Component
    ↓
UI Updates (badge shows "Processing")
```

---

## Permission Flow

```
User performs action (e.g., Edit IP)
    ↓
Check Current User
    ├─ currentUser = null
    │  └─ Redirect to Login
    │
    └─ currentUser exists
       └─ Check Role
          ├─ role === "admin"
          │  └─ Allow action
          │     ├─ canEdit = true
          │     ├─ canDelete = true
          │     ├─ maxRegistrations = ∞
          │     └─ Execute action
          │
          └─ role === "demo"
             └─ Check Permission
                ├─ canEdit = false
                │  └─ Block action
                │     └─ Show error message
                │
                ├─ canDelete = false
                │  └─ Block action
                │
                └─ Register action
                   └─ Check Count
                      ├─ count < 5
                      │  └─ Allow
                      │
                      └─ count >= 5
                         └─ Block
                            └─ Show limit message
```

---

## Error Handling Flow

```
API Call Started
    ↓
try {
    ↓
Perform Operation
    ├─ Success
    │  ├─ Parse response
    │  ├─ Update state
    │  └─ Show success message
    │
    └─ Network Error / API Error
       └─ throw Error
          ↓
} catch (error) {
          ↓
    Log Error
    console.error(error)
          ↓
    Check Error Type
    ├─ Network Error
    │  └─ Try Fallback (simulation mode)
    │
    ├─ API Error (4xx, 5xx)
    │  ├─ Parse error message
    │  └─ Show user-friendly message
    │
    └─ Unknown Error
       └─ Generic error message
          ↓
    Update UI
    ├─ Set error state
    ├─ Show error badge
    └─ Enable retry button
          ↓
} finally {
          ↓
    Cleanup
    ├─ Clear loading state
    ├─ Reset processing flag
    └─ Enable UI controls
}
```

---

## Component Lifecycle

```
Component Mount
    ↓
┌──────────────────────────────────────┐
│ Constructor / Function Body          │
│ - Declare state variables            │
│ - Define event handlers              │
│ - Setup refs                         │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ useEffect with [] (mount)            │
│ - Initialize clients                 │
│ - Load saved state                   │
│ - Setup background animation         │
│ - Start monitoring                   │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ Render (Initial)                     │
│ - Calculate derived values           │
│ - Evaluate conditions                │
│ - Return JSX                         │
└──────────────────────────────────────┘
    ↓
Component Mounted (Displayed to User)
    ↓
User Interaction / State Change
    ↓
┌──────────────────────────────────────┐
│ Event Handler Called                 │
│ - setState(newValue)                 │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ Re-render Scheduled                  │
│ - React compares virtual DOM         │
│ - Update only changed parts          │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ useEffect with [deps] (update)       │
│ - Run effects when deps change       │
│ - Cleanup previous effects           │
└──────────────────────────────────────┘
    ↓
Component Updated (New state displayed)
    ↓
User Closes Extension / Navigates Away
    ↓
┌──────────────────────────────────────┐
│ useEffect Cleanup                    │
│ - Clear intervals                    │
│ - Cancel animation frames            │
│ - Clean up listeners                 │
└──────────────────────────────────────┘
    ↓
Component Unmounted
```

---

## File Organization

```
hackathon/
│
├── app/
│   ├── components/
│   │   ├── Extension_Panel_alven.tsx
│   │   │   ├─ Main extension component
│   │   │   ├─ All state management
│   │   │   ├─ Event handlers
│   │   │   └─ UI rendering
│   │   │
│   │   ├── LoginScreen.tsx
│   │   │   ├─ Login form
│   │   │   ├─ Authentication logic
│   │   │   └─ Background animation
│   │   │
│   │   ├── WorkflowIndicator.tsx
│   │   │   ├─ 3-step progress display
│   │   │   ├─ Status visualization
│   │   │   └─ Real-time updates
│   │   │
│   │   └── helpers/
│   │       └── yakoaStoryIntegration.ts
│   │           ├─ verifyContentWithYakoa()
│   │           ├─ registerIPOnStory()
│   │           ├─ uploadToIPFS()
│   │           └─ getWorkflowPath()
│   │
│   └── api/ (Next.js API routes - optional)
│
├── lib/
│   ├── yakoa/
│   │   ├── client.ts
│   │   │   ├─ YakoaClient class
│   │   │   ├─ verifyContent()
│   │   │   ├─ registerToken()
│   │   │   └─ getToken()
│   │   │
│   │   └── types.ts
│   │       ├─ ContentCheckResult
│   │       ├─ VerifyContentRequest
│   │       └─ TokenResponse
│   │
│   └── story/
│       ├── client.ts
│       │   ├─ StoryProtocolClient class
│       │   ├─ registerIPAsset()
│       │   ├─ initializeWithPrivateKey()
│       │   └─ createNFTCollection()
│       │
│       └── types.ts
│           ├─ IPAssetMetadata
│           ├─ NFTMetadata
│           ├─ LicenseTerms
│           └─ RegisterIPResult
│
├── .env.local (API keys - NOT in git)
│   ├─ NEXT_PUBLIC_YAKOA_API_KEY
│   ├─ NEXT_PUBLIC_YAKOA_SUBDOMAIN
│   ├─ NEXT_PUBLIC_STORY_PRIVATE_KEY
│   └─ Feature flags
│
└── Documentation/
    ├── DOCUMENTATION_FINAL.md (Technical docs)
    ├── LEARNING_GUIDE.md (Learning path)
    ├── QUICK_REFERENCE.md (Code snippets)
    └── VISUAL_ARCHITECTURE.md (This file)
```

---

## Key Takeaways

1. **Layered Architecture**: Frontend → Integration → Client → API
2. **State-Driven UI**: All UI updates based on state changes
3. **Async by Default**: Most operations are asynchronous
4. **Error Handling**: Try-catch at every API call level
5. **Graceful Degradation**: Simulation mode if API unavailable
6. **Role-Based Access**: Permission checks before actions
7. **Immutable Updates**: Never mutate state directly
8. **Type Safety**: TypeScript for compile-time checking

---

**Gunakan diagram-diagram ini sebagai reference visual saat membaca code!**
