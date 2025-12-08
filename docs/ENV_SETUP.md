# IP Shield - Environment Variables Setup Guide
# ===========================================

## Required Environment Variables

Create a `.env.local` file in the root directory with these variables:

```
# YAKOA API Configuration
YAKOA_API_KEY=your_yakoa_api_key_here
YAKOA_SUBDOMAIN=ipshield
YAKOA_NETWORK=story
YAKOA_ENV=sandbox

NEXT_PUBLIC_YAKOA_API_KEY=your_yakoa_api_key_here
NEXT_PUBLIC_YAKOA_SUBDOMAIN=ipshield
NEXT_PUBLIC_YAKOA_NETWORK=story
NEXT_PUBLIC_YAKOA_ENV=sandbox

# Story Protocol Configuration
NEXT_PUBLIC_STORY_CHAIN_ID=1315
NEXT_PUBLIC_STORY_RPC_URL=https://aeneid.storyrpc.io
NEXT_PUBLIC_SPG_NFT_CONTRACT=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc

# Pinata IPFS Configuration
PINATA_JWT=your_pinata_jwt_here
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_here

# Application Configuration
NEXT_PUBLIC_APP_NAME=IP Shield
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Getting API Keys

### 1. Yakoa API Key
- Visit https://yakoa.io
- Sign up for a developer account
- Create a new application
- Copy your API key

### 2. Pinata IPFS JWT
- Visit https://pinata.cloud
- Create a free account
- Go to API Keys section
- Generate a new JWT token

### 3. Story Protocol
- No API key needed for testnet
- For mainnet, you'll need:
  - A wallet with IP tokens
  - Private key for transactions (server-side only)

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are accessible in browser code
- Never expose private keys in frontend code
- The `sandbox` environment is for testing with Yakoa
