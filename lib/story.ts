// lib/story.ts
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import crypto from 'crypto';
import { ethers } from 'ethers';
// Jika kamu punya official SDK: import { StoryClient, getStoryClient } from '@story-protocol/core-sdk';

const RPC = process.env.RPC_URL!;
const PRIVATE_KEY = process.env.STORY_PRIVATE_KEY!;
const SPG_NFT_CONTRACT = process.env.SPG_NFT_CONTRACT!;
const ROYALTY_POLICY_ADDRESS = process.env.ROYALTY_POLICY_ADDRESS!;

const provider = new ethers.providers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// --- simple IPFS upload via nft.storage / pinata / story ipfs endpoint ---
// Here: example using ipfs.infura (you should use pinata or nft.storage with API key)
async function uploadToIPFS(json: string) {
  // prefer to use a proper pinning service in production
  const resp = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', JSON.parse(json), {
    headers: {
      'Content-Type': 'application/json',
      'pinata_api_key': process.env.PINATA_KEY || '',
      'pinata_secret_api_key': process.env.PINATA_SECRET || ''
    }
  }).catch(e => { throw new Error('IPFS upload failed: ' + e?.message); });

  return `ipfs://${resp.data.IpfsHash}`;
}

export async function registerToStory({ imageUrl, yakoaId, licenseType }: { imageUrl: string, yakoaId: string, licenseType?: string }) {
  // build metadata
  const meta = {
    title: 'Protected Content',
    description: 'Auto-registered via Yakoa+Story integration',
    image: imageUrl,
    license: licenseType || 'COMMERCIAL_USE'
  };

  const metaJson = JSON.stringify(meta);
  const metadataURI = await uploadToIPFS(metaJson);
  const metadataHash = crypto.createHash('sha256').update(metaJson).digest('hex');

  // --- Example: call to Story SDK (pseudo) ---
  // If you have official SDK:
  // const storyClient = StoryClient.newClient({ transport: getStoryClient(provider, wallet) });
  // const tx = await storyClient.ipAsset.mintAndRegisterIpAssetWithPilTerms({...});

  // For demo: if you cannot call Story SDK, you can mock/dummy-return an ipId and txHash:
  // In real integration, replace this block with official SDK calls.
  const fakeIpId = 'ip_' + crypto.randomBytes(8).toString('hex');
  const fakeTokenId = Math.floor(Math.random() * 1000000).toString();
  const fakeTxHash = '0x' + crypto.randomBytes(32).toString('hex');

  // RETURN shape that frontend expects
  return {
    success: true,
    ipId: fakeIpId,
    tokenId: fakeTokenId,
    txHash: fakeTxHash,
    explorerUrl: `https://explorer.story.foundation/ip/${fakeIpId}`,
    metadataURI,
    metadataHash,
    yakoaId
  };
}
