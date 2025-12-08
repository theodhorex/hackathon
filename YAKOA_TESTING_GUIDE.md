# 🚀 Quick Testing Guide - Yakoa API Integration

## ✅ Setup Complete!

Your Yakoa API key has been configured in `.env.local`:
```
NEXT_PUBLIC_YAKOA_API_KEY=jo6SX55jSS42wiq0ntqdV9qIDLBmgfFaFNvIftd0
```

---

## 🧪 Test Yakoa Integration

### Step 1: Start Development Server

```bash
npm run dev
```

### Step 2: Test Yakoa API Call (Console)

Open browser console and run:

```javascript
// Test Yakoa verification
const testYakoa = async () => {
  const { getYakoaClient } = await import('@/lib/yakoa/client');
  const client = getYakoaClient();
  
  console.log('🔍 Testing Yakoa API...');
  console.log('API Key configured:', client.isConfigured());
  
  // Test with a sample image URL
  const result = await client.verifyContent({
    contentUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
    contentType: 'image',
    title: 'Test Nike Image'
  });
  
  console.log('✅ Yakoa Result:', result);
  console.log('Status:', result.isInfringing ? 'BRAND_IP_DETECTED' : 'ORIGINAL');
  console.log('Confidence:', result.confidence + '%');
  console.log('Recommendations:', result.recommendations);
  
  return result;
};

testYakoa();
```

**Expected Output:**
```
🔍 Testing Yakoa API...
API Key configured: true
✅ Yakoa Result: { isOriginal: false, isInfringing: true, ... }
Status: BRAND_IP_DETECTED
Confidence: 95%
Recommendations: ["Content appears to contain Nike Inc. intellectual property."]
```

---

### Step 3: Test from Extension UI

1. **Open Extension** (localhost:3000 or your dev URL)
2. **Login** (use: admin/admin123 or demo/demo123)
3. **Click "Start Detection"** tab
4. **Monitor Browser Console** for Yakoa API calls
5. **Click "Protect This (Quick)"** on any detected content

**What to Look For:**
```
Console Output:
✓ Yakoa verification started...
✓ API call to: https://ipshield.ip-api-sandbox.yakoa.io/story/token
✓ Response status: 200
✓ Content status: ORIGINAL / BRAND_IP_DETECTED / ALREADY_REGISTERED
```

---

## 🎯 Test Cases

### Test Case 1: Brand IP Detection ✅

**URL to test:**
```
https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/34604cb1-acc6-4a40-bf26-60185ca7da5c/NIKE+AIR+MAX+1+ESS.png
```

**Expected Result:**
- Status: `BRAND_IP_DETECTED`
- Brand: `Nike Inc.`
- Confidence: 90-100%
- Can Protect: ❌ No

---

### Test Case 2: Original Content ✅

**URL to test:** (upload your own image)
```
Your own original artwork URL
```

**Expected Result:**
- Status: `ORIGINAL`
- Confidence: 100%
- Can Protect: ✅ Yes
- Should trigger Story Protocol registration

---

### Test Case 3: Stock Photo ✅

**URL to test:**
```
https://media.istockphoto.com/id/1471683196/vector/black-wavy-lines-isolated-on-white-abstract-background-design.jpg
```

**Expected Result:**
- Status: `ALREADY_REGISTERED`
- Owner: Stock photo platform
- Can Protect: ❌ No

---

## 🔍 Debug Yakoa API

### Check API Configuration

```javascript
// In browser console
const checkConfig = async () => {
  const { getYakoaClient } = await import('@/lib/yakoa/client');
  const client = getYakoaClient();
  
  console.log('Yakoa Configuration:');
  console.log('- API Key Set:', client.isConfigured());
  console.log('- Subdomain:', 'ipshield');
  console.log('- Network:', 'story');
  console.log('- Environment:', 'sandbox');
  console.log('- Base URL:', 'https://ipshield.ip-api-sandbox.yakoa.io/story');
};

checkConfig();
```

---

### Monitor API Calls

Open **Network Tab** in DevTools:
1. Filter by: `yakoa`
2. Look for requests to: `ip-api-sandbox.yakoa.io`
3. Check request headers for: `Authorization: Bearer jo6SX55j...`
4. Check response status: `200 OK`

---

## 📊 Yakoa Response Format

```json
{
  "isOriginal": true/false,
  "isInfringing": true/false,
  "isAuthorized": true/false,
  "confidence": 95,
  "matchedBrand": "Nike Inc." or undefined,
  "matchedOwner": "0x123..." or undefined,
  "infringements": [
    {
      "type": "brand_ip",
      "brand": "Nike Inc.",
      "similarity": 95,
      "source": "Yakoa Brand Database"
    }
  ],
  "recommendations": [
    "This content cannot be registered as original IP."
  ]
}
```

---

## ⚠️ Troubleshooting

### Issue: "API key not configured"
**Solution:** 
- Check `.env.local` exists in project root
- Restart dev server: `npm run dev`
- Check console: `process.env.NEXT_PUBLIC_YAKOA_API_KEY`

### Issue: "401 Unauthorized"
**Solution:**
- Verify API key is correct
- Check Yakoa dashboard for key status
- Ensure key has proper permissions

### Issue: "Network Error"
**Solution:**
- Check internet connection
- Verify URL: `https://ipshield.ip-api-sandbox.yakoa.io/story`
- Check CORS settings (should work from localhost)

### Issue: "Simulation mode active"
**Solution:**
- This means API key is missing/invalid
- Check `.env.local` file
- Restart dev server

---

## 🎉 Success Indicators

✅ **Yakoa Integration Working When:**
1. Console shows: "API Key configured: true"
2. Network tab shows requests to yakoa.io
3. Response status is 200
4. Content gets proper status (ORIGINAL/BRAND_IP/REGISTERED)
5. UI updates with verification results

---

## 📝 Next Steps After Testing

1. ✅ Verify Yakoa API calls work
2. ✅ Test different content types (image, video, audio)
3. ✅ Test brand detection with Nike, Adidas, etc.
4. ⬜ Add Story Protocol wallet for real registration
5. ⬜ Test full workflow: Detection → Yakoa → Story → Dashboard

---

## 🔗 Useful Links

- **Yakoa Dashboard:** https://yakoa.io/dashboard
- **Yakoa API Docs:** https://yakoa.io/docs
- **API Endpoint:** https://ipshield.ip-api-sandbox.yakoa.io/story
- **Story Protocol:** https://docs.story.foundation

---

**Ready to test!** 🚀

Run `npm run dev` and start testing Yakoa integration!
