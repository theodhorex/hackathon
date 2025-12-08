# Integrasi Yakoa API & Story Protocol - IP Shield Extension

## 🎯 Status Integrasi

### ✅ Sudah Selesai:
1. **Yakoa Client** (`lib/yakoa/client.ts`)
   - ✓ Content verification API
   - ✓ Brand IP detection
   - ✓ Simulation mode (tanpa API key)
   
2. **Story Protocol Client** (`lib/story/client.ts`)
   - ✓ IP Asset registration
   - ✓ NFT minting
   - ✓ License terms configuration

3. **Integration Helpers** (`app/components/helpers/yakoaStoryIntegration.ts`)
   - ✓ `verifyContentWithYakoa()` - Wrapper untuk Yakoa verification
   - ✓ `registerIPOnStory()` - Wrapper untuk Story registration
   - ✓ `uploadToIPFS()` - IPFS upload helper (mock)
   - ✓ `getWorkflowPath()` - Workflow visualization
   - ✓ `getVerificationStatusInfo()` - Status badge helper

### ⚠️ Perlu Diperbaiki:
File `app/components/Extension_Panel_alven.tsx` memiliki syntax error pada baris 286-293 karena escaped characters.

## 🔧 Langkah Perbaikan (Manual)

### Step 1: Perbaiki Syntax Error

Buka file `app/components/Extension_Panel_alven.tsx` dan ganti baris 286-293 dengan kode berikut:

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

### Step 2: Tambahkan Helper Functions Import

Di bagian atas file `Extension_Panel_alven.tsx` (sekitar baris 5-8), tambahkan import berikut:

```typescript
import { 
  verifyContentWithYakoa, 
  registerIPOnStory, 
  getWorkflowPath,
  getVerificationStatusInfo 
} from "./helpers/yakoaStoryIntegration";
```

### Step 3: Tambahkan Content Verification Handler

Cari fungsi `quickProtect` (sekitar baris 660-683) dan ganti dengan versi yang menggunakan Yakoa:

```typescript
// NEW HANDLER: Quick Protect dengan Yakoa verification
const quickProtect = async (content: DetectedContent) => {
  // 1. Tutup sidebar
  setShowSidebar(false);
  
  // 2. Set status ke PROCESSING
  updateContentStatus(content.id, "PROCESSING");
  setQuickProtectSuccessData({
    title: content.title,
    assetType: content.type.toUpperCase(),
    previewUrl: content.url,
    status: "PROCESSING",
  });
  setShowQuickProtectSuccess(true);

  try {
    // 3. Verify dengan Yakoa
    const yakoaResult = await verifyContentWithYakoa(
      content.url,
      content.type as "image" | "audio" | "video" | "text",
      content.title
    );

    // 4. Update hasil verification
    updateContentStatus(content.id, yakoaResult.status);

    // 5. Jika ORIGINAL, lanjut register ke Story Protocol
    if (yakoaResult.status === "ORIGINAL") {
      setRegistrationStatus({ isRegistering: true, progress: "Preparing..." });
      
      const storyResult = await registerIPOnStory({
        title: content.title,
        description: `IP Shield protected content - ${content.type}`,
        assetType: content.type.toUpperCase() as "IMAGE" | "AUDIO" | "VIDEO" | "TEXT",
        mediaUrl: content.url,
        licenseType: "NON_COMMERCIAL",
        royaltyPercentage: 0,
        onProgress: (stage) => {
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

        updateContentStatus(content.id, "PROTECTED");
        setQuickProtectSuccessData({
          title: content.title,
          assetType: content.type.toUpperCase(),
          previewUrl: content.url,
          status: "PROTECTED",
        });
      }
      
      setRegistrationStatus({ isRegistering: false, progress: "" });
    } else {
      // Tidak original, tampilkan hasil verification saja
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

### Step 4: Update Registration Form Handler

Cari fungsi `handleRegister` dalam komponen `RegisterIPView` (sekitar baris 1343-1373) dan ganti dengan:

```typescript
const handleRegister = async (e) => {
  e.preventDefault();

  // VALIDASI
  if (!localFile && !activeContent) {
    alert("Please upload a file or select detected content first.");
    return;
  }

  setIsLoading(true);
  setStep(2); // Tampilkan loading screen

  try {
    const mediaUrl = previewUrl || "";
    const assetType = formData.assetType as "IMAGE" | "AUDIO" | "VIDEO" | "TEXT";
    
    // Register ke Story Protocol dengan real API
    const result = await registerIPOnStory({
      title: formData.title,
      description: formData.description,
      assetType,
      mediaUrl,
      licenseType: formData.licenseType as "COMMERCIAL_USE" | "NON_COMMERCIAL" | "NO_DERIVATIVES",
      royaltyPercentage: formData.royaltyPercentage,
      creatorName: currentUser?.name || "Anonymous",
      onProgress: (stage) => {
        console.log("Registration progress:", stage);
      },
    });

    if (result.success) {
      // Tambahkan ke dashboard
      addProtectedIP({
        title: formData.title,
        assetType: formData.assetType,
        previewUrl: mediaUrl,
      });

      // Update status konten (jika dari web)
      if (activeContent && !localFile) {
        updateContentStatus(activeContent.id, "PROTECTED");
      }
    } else {
      alert(`Registration failed: ${result.error}`);
      setStep(1); // Kembali ke form
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Please try again.");
    setStep(1); // Kembali ke form
  } finally {
    setIsLoading(false);
  }
};
```

## 📊 Clear Path to Registration

Workflow yang sudah terintegrasi:

```
1. DETECTION (Browser Extension)
   ↓
   User clicks on detected content
   ↓
2. YAKOA VERIFICATION
   ↓
   verifyContentWithYakoa() → API Call
   ↓
   Results: ORIGINAL | BRAND_IP | ALREADY_REGISTERED
   ↓
3. STORY REGISTRATION (if ORIGINAL)
   ↓
   registerIPOnStory() → Blockchain Transaction
   ↓
   Results: IP ID, TX Hash, Explorer Link
   ↓
4. PROTECTED (Added to Dashboard)
```

## 🎨 UI Updates Needed

### Tambahkan Workflow Indicator di Main Panel

Di bagian `MainPanelView`, tambahkan workflow path indicator:

```typescript
{/* Workflow Path - Tambahkan sebelum tab selector */}
<div className="px-6 py-3">
  <div className="flex items-center justify-between gap-2">
    {getWorkflowPath('detect').map((step, idx) => (
      <div key={step.id} className="flex-1">
        <div className={`text-center p-2 rounded-lg ${
          step.status === 'active' ? 'bg-cyan-500/20 border-2 border-cyan-400' :
          step.status === 'complete' ? 'bg-emerald-500/20 border border-emerald-400' :
          'bg-gray-800/50 border border-gray-700'
        }`}>
          <div className="text-2xl mb-1">{step.icon}</div>
          <div className="text-[10px] font-bold text-white">{step.name}</div>
          <div className="text-[8px] text-gray-400">{step.tech}</div>
        </div>
        {idx < getWorkflowPath('detect').length - 1 && (
          <div className="text-center text-cyan-400 text-xs mt-1">→</div>
        )}
      </div>
    ))}
  </div>
</div>
```

### Update Content Card di Sidebar

Tambahkan loading state saat verification:

```typescript
{isVerifying.has(content.id) ? (
  <div className="text-center py-2">
    <Loader2 className="w-4 h-4 animate-spin mx-auto text-cyan-400" />
    <p className="text-xs text-cyan-400 mt-1">Verifying with Yakoa...</p>
  </div>
) : (
  <button
    onClick={() => quickProtect(content)}
    disabled={content.status !== "ORIGINAL"}
    className={`... existing button classes ...`}
  >
    {/* button content */}
  </button>
)}
```

## 🔑 Environment Variables

Tambahkan di `.env.local`:

```env
# Yakoa API
NEXT_PUBLIC_YAKOA_API_KEY=your_yakoa_api_key_here
NEXT_PUBLIC_YAKOA_SUBDOMAIN=ipshield
NEXT_PUBLIC_YAKOA_NETWORK=story
NEXT_PUBLIC_YAKOA_ENV=sandbox

# Story Protocol  
# Note: In production, use wallet connect instead of private key
NEXT_PUBLIC_STORY_PRIVATE_KEY=0x_your_test_private_key
```

## 🚀 Testing

1. **Test Yakoa Verification:**
   - Detect content dengan brand logo (Nike, Adidas, dll) → Harus return "BRAND_IP_DETECTED"
   - Detect original content → Harus return "ORIGINAL"

2. **Test Story Registration:**
   - Pilih content ORIGINAL
   - Click "Protect This (Quick)"
   - Monitor console untuk registration progress
   - Check dashboard untuk IP baru

## 📚 API References

- **Yakoa API Docs:** https://yakoa.io/docs
- **Story Protocol SDK:** https://docs.story.foundation
- **IPFS Upload:** Use Pinata or web3.storage for production

## ⚡ Next Steps

1. Perbaiki syntax error di Extension_Panel_alven.tsx (Step 1-2)
2. Update handler functions (Step 3-4)
3. Test di development
4. Deploy dengan real API keys

---

**Note:** Semua helper functions sudah dibuat di `app/components/helpers/yakoaStoryIntegration.ts`. Tinggal integrate ke UI components.
