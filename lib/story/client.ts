// lib/story/client.ts
// Story Protocol SDK Integration for IP Shield Extension

import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http, createWalletClient, createPublicClient } from "viem";
import { privateKeyToAccount, Address } from "viem/accounts";

// Story Protocol Network Configuration
const STORY_CHAIN_ID = 1315; // Aeneid Testnet
const STORY_RPC_URL = "https://aeneid.storyrpc.io";
const SPG_NFT_CONTRACT = "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc" as Address;

export interface IPAssetMetadata {
    title: string;
    description: string;
    image: string;
    imageHash?: string;
    mediaUrl: string;
    mediaHash?: string;
    mediaType: string;
    creators: Array<{
        name: string;
        address: string;
        description?: string;
        contributionPercent: number;
    }>;
}

export interface NFTMetadata {
    name: string;
    description: string;
    image: string;
}

export interface RegisterIPResult {
    success: boolean;
    txHash?: string;
    ipId?: string;
    explorerUrl?: string;
    error?: string;
}

export interface LicenseTerms {
    commercialUse: boolean;
    commercialRevShare: number; // Percentage (0-100)
    derivativesAllowed: boolean;
    mintingFee?: string;
}

/**
 * Story Protocol Client Wrapper for IP Shield
 * Handles IP Asset registration on Story Protocol blockchain
 */
export class StoryProtocolClient {
    private client: StoryClient | null = null;
    private walletAddress: Address | null = null;

    constructor() {
        // Client will be initialized when needed with user's wallet
    }

    /**
     * Initialize the Story Protocol client with a private key
     * For production, this should use wallet connect instead
     */
    async initializeWithPrivateKey(privateKey: string): Promise<boolean> {
        try {
            const account = privateKeyToAccount(privateKey as `0x${string}`);
            this.walletAddress = account.address;

            const config: StoryConfig = {
                account: account,
                transport: http(STORY_RPC_URL),
                chainId: "aeneid",
            };

            this.client = StoryClient.newClient(config);
            return true;
        } catch (error) {
            console.error("Failed to initialize Story Protocol client:", error);
            return false;
        }
    }

    /**
     * Check if client is initialized
     */
    isInitialized(): boolean {
        return this.client !== null;
    }

    /**
     * Get the connected wallet address
     */
    getWalletAddress(): string | null {
        return this.walletAddress;
    }

    /**
     * Register an IP Asset on Story Protocol
     * This mints an NFT and registers it as an IP Asset in one transaction
     */
    async registerIPAsset(
        ipMetadata: IPAssetMetadata,
        nftMetadata: NFTMetadata,
        ipMetadataURI: string,
        nftMetadataURI: string,
        licenseTerms?: LicenseTerms
    ): Promise<RegisterIPResult> {
        if (!this.client) {
            return {
                success: false,
                error: "Client not initialized. Please connect your wallet first.",
            };
        }

        try {
            // Create hash of metadata for verification
            const ipHash = await this.createHash(JSON.stringify(ipMetadata));
            const nftHash = await this.createHash(JSON.stringify(nftMetadata));

            // Build registration request
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

            // Add license terms if provided
            if (licenseTerms && licenseTerms.commercialUse) {
                registrationRequest.licenseTermsData = [
                    {
                        terms: {
                            commercialUse: licenseTerms.commercialUse,
                            commercialRevShare: licenseTerms.commercialRevShare,
                            derivativesAllowed: licenseTerms.derivativesAllowed,
                        },
                    },
                ];
            }

            // Register the IP Asset
            const response = await this.client.ipAsset.registerIpAsset(registrationRequest);

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

    /**
     * Create a new SPG NFT Collection for the user
     */
    async createNFTCollection(name: string, symbol: string): Promise<{
        success: boolean;
        contractAddress?: string;
        txHash?: string;
        error?: string;
    }> {
        if (!this.client) {
            return {
                success: false,
                error: "Client not initialized",
            };
        }

        try {
            const newCollection = await this.client.nftClient.createNFTCollection({
                name: name,
                symbol: symbol,
                isPublicMinting: false,
                mintOpen: true,
                mintFeeRecipient: "0x0000000000000000000000000000000000000000" as Address,
                contractURI: "",
            });

            return {
                success: true,
                contractAddress: newCollection.spgNftContract,
                txHash: newCollection.txHash,
            };
        } catch (error: any) {
            console.error("Failed to create NFT collection:", error);
            return {
                success: false,
                error: error.message || "Failed to create NFT collection",
            };
        }
    }

    /**
     * Helper function to create SHA256 hash
     */
    private async createHash(data: string): Promise<string> {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        return hashHex;
    }
}

// Singleton instance
let storyClient: StoryProtocolClient | null = null;

export function getStoryClient(): StoryProtocolClient {
    if (!storyClient) {
        storyClient = new StoryProtocolClient();
    }
    return storyClient;
}

export default StoryProtocolClient;
