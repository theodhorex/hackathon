# IP Shield Extension - Environment Variables
# Copy this file to .env.local and fill in your actual values

# ============================================
# YAKOA API CONFIGURATION
# ============================================
# Get your API key from: https://yakoa.io/dashboard
NEXT_PUBLIC_YAKOA_API_KEY=your_yakoa_api_key_here
NEXT_PUBLIC_YAKOA_SUBDOMAIN=ipshield
NEXT_PUBLIC_YAKOA_NETWORK=story
NEXT_PUBLIC_YAKOA_ENV=sandbox

# Yakoa API Endpoints:
# - Sandbox: https://ipshield.ip-api-sandbox.yakoa.io/story
# - Production: https://ipshield.ip-api.yakoa.io/story

# ============================================
# STORY PROTOCOL CONFIGURATION
# ============================================
# Story Protocol Network: Aeneid Testnet
# Chain ID: 1315
# RPC: https://aeneid.storyrpc.io
# Explorer: https://aeneid.explorer.story.foundation

# IMPORTANT: For development/testing only!
# In production, use wallet connect (MetaMask, WalletConnect, etc.)
# Never commit your private key to version control!
NEXT_PUBLIC_STORY_PRIVATE_KEY=0x_your_test_wallet_private_key_here

# Alternative: Use wallet connect (recommended for production)
# NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# ============================================
# IPFS CONFIGURATION
# ============================================
# Option 1: Pinata (Recommended)
# Get API key from: https://pinata.cloud
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key

# Option 2: web3.storage
# Get token from: https://web3.storage
# NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3_storage_token

# Option 3: NFT.Storage
# Get token from: https://nft.storage
# NEXT_PUBLIC_NFT_STORAGE_TOKEN=your_nft_storage_token

# ============================================
# APPLICATION SETTINGS
# ============================================
NEXT_PUBLIC_APP_NAME="IP Shield"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_ENVIRONMENT=development

# Enable/disable features
NEXT_PUBLIC_ENABLE_YAKOA=true
NEXT_PUBLIC_ENABLE_STORY=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# ============================================
# OPTIONAL: ANALYTICS & MONITORING
# ============================================
# Google Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry Error Tracking
# NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# ============================================
# TESTING & DEMO
# ============================================
# Set to true to use mock data instead of real API calls
NEXT_PUBLIC_USE_MOCK_DATA=false

# Demo mode: Allows testing without real API keys
NEXT_PUBLIC_DEMO_MODE=true

# ============================================
# NOTES
# ============================================
# 1. Never commit .env.local to version control
# 2. Keep your API keys and private keys secure
# 3. For production deployment:
#    - Use environment variables in your hosting platform
#    - Enable wallet connect instead of private keys
#    - Use production API endpoints
#    - Enable HTTPS only
