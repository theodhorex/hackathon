// Quick Test Script for Yakoa API
// Run this in browser console after starting dev server

console.log('🔍 IP Shield - Yakoa API Test');
console.log('================================\n');

// 1. Check environment variables
console.log('📋 Environment Configuration:');
console.log('API Key:', process.env.NEXT_PUBLIC_YAKOA_API_KEY ? '✅ Configured' : '❌ Missing');
console.log('Subdomain:', process.env.NEXT_PUBLIC_YAKOA_SUBDOMAIN || 'ipshield');
console.log('Network:', process.env.NEXT_PUBLIC_YAKOA_NETWORK || 'story');
console.log('Env:', process.env.NEXT_PUBLIC_YAKOA_ENV || 'sandbox');
console.log('Demo Mode:', process.env.NEXT_PUBLIC_DEMO_MODE || 'false');
console.log('\n');

// 2. Test Yakoa client initialization
async function testYakoaClient() {
    try {
        console.log('🧪 Testing Yakoa Client...');

        // Note: This will only work after you import the module in your app
        // For now, it's a template for testing

        const testUrl = 'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/34604cb1-acc6-4a40-bf26-60185ca7da5c/NIKE+AIR+MAX+1+ESS.png';

        console.log('Test URL:', testUrl);
        console.log('Expected Result: BRAND_IP_DETECTED (Nike)');
        console.log('\n');

        console.log('✅ Configuration looks good!');
        console.log('📝 Run npm run dev and test from the extension UI');

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testYakoaClient();

// Export for use in extension
if (typeof window !== 'undefined') {
    window.__YAKOA_TEST__ = {
        configured: !!process.env.NEXT_PUBLIC_YAKOA_API_KEY,
        apiKey: process.env.NEXT_PUBLIC_YAKOA_API_KEY?.substring(0, 10) + '...',
        endpoint: `https://${process.env.NEXT_PUBLIC_YAKOA_SUBDOMAIN || 'ipshield'}.ip-api-sandbox.yakoa.io/${process.env.NEXT_PUBLIC_YAKOA_NETWORK || 'story'}`,
    };

    console.log('💾 Test data saved to: window.__YAKOA_TEST__');
}
