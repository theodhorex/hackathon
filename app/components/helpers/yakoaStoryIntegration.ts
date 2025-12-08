// app/components/helpers/yakoaStoryIntegration.ts
// Integration helpers for Yakoa API and Story Protocol

import { getYakoaClient, type ContentCheckResult } from "@/lib/yakoa/client";
import { getStoryClient, type IPAssetMetadata, type NFTMetadata, type LicenseTerms, type RegisterIPResult } from "@/lib/story/client";

/**
 * Verify content using Yakoa API
 * Maps to UI status codes
 */
export async function verifyContentWithYakoa(
    contentUrl: string,
    contentType: "image" | "audio" | "video" | "text",
    title?: string
): Promise\u003c{
    status: "ORIGINAL" | "BRAND_IP_DETECTED" | "ALREADY_REGISTERED" | "ERROR";
    confidence: number;
    brand ?: string;
    owner ?: string;
    recommendations: string[];
    yakoaResult ?: ContentCheckResult;
} \u003e {
    try {
        const yakoaClient = getYakoaClient();

        const result = await yakoaClient.verifyContent({
            contentUrl,
            contentType,
            title,
        });

        // Map Yakoa result to UI status
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

/**
 * Upload file to IPFS (Mock implementation - replace with actual IPFS client)
 * In production, use Pinata, web3.storage, or similar service
 */
export async function uploadToIPFS(file: File | Blob, metadata: any): Promise\u003c{
    metadataUri: string;
    metadataHash: string;
    mediaUri: string;
    mediaHash: string;
} \u003e {
    try {
        // Mock implementation - replace with actual IPFS upload
        // Example using Pinata: await pinata.upload.file(file)

        // For now, create mock URIs
        const mockMediaHash = `Qm${Math.random().toString(36).substring(2, 15)}`;
        const mockMetadataHash = `Qm${Math.random().toString(36).substring(2, 15)}`;

        const metadataUri = `ipfs://${mockMetadataHash}`;
        const mediaUri = `ipfs://${mockMediaHash}`;

        // Simulate upload delay
        await new Promise(resolve =\u003e setTimeout(resolve, 1000));

        return {
            metadataUri,
            metadataHash: mockMetadataHash,
            mediaUri,
            mediaHash: mockMediaHash,
        };
    } catch (error) {
        console.error("IPFS upload error:", error);
        throw new Error("Failed to upload to IPFS");
    }
}

/**
 * Register IP Asset on Story Protocol
 * This is the main registration function
 */
export async function registerIPOnStory(params: {
    title: string;
    description: string;
    assetType: "IMAGE" | "AUDIO" | "VIDEO" | "TEXT";
    mediaUrl: string;
    licenseType: "COMMERCIAL_USE" | "NON_COMMERCIAL" | "NO_DERIVATIVES";
    royaltyPercentage: number;
    creatorAddress?: string;
    creatorName?: string;
    onProgress?: (stage: string) =\u003e void;
}): Promise\u003cRegisterIPResult \u0026 { ipfsMetadataUri ?: string; ipfsMediaUri ?: string } \u003e {
    const {
        title,
        description,
        assetType,
        mediaUrl,
        licenseType,
        royaltyPercentage,
        creatorAddress,
        creatorName,
        onProgress,
    } = params;

    try {
        const storyClient = getStoryClient();

        // Check if Story client is initialized
        if (!storyClient.isInitialized()) {
            // For demo purposes, we'll simulate the response
            // In production, user needs to connect wallet first
            onProgress?.("Wallet not connected - using simulation mode");

            await new Promise(resolve =\u003e setTimeout(resolve, 2000));

            const mockIpId = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
            const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`;

            return {
                success: true,
                ipId: mockIpId,
                txHash: mockTxHash,
                explorerUrl: `https://aeneid.explorer.story.foundation/ipa/${mockIpId}`,
                ipfsMetadataUri: `ipfs://Qm${Math.random().toString(36).substring(2, 15)}`,
                ipfsMediaUri: `ipfs://Qm${Math.random().toString(36).substring(2, 15)}`,
            };
        }

        // STEP 1: Prepare metadata
        onProgress?.("Preparing IP metadata...");

        const ipMetadata: IPAssetMetadata = {
            title,
            description,
            image: mediaUrl,
            mediaUrl,
            mediaType: assetType.toLowerCase(),
            creators: [
                {
                    name: creatorName || "Anonymous Creator",
                    address: creatorAddress || storyClient.getWalletAddress() || "0x0",
                    contributionPercent: 100,
                },
            ],
        };

        const nftMetadata: NFTMetadata = {
            name: title,
            description,
            image: mediaUrl,
        };

        // STEP 2: Upload to IPFS
        onProgress?.("Uploading to IPFS...");
        const { metadataUri, mediaUri } = await uploadToIPFS(
            new Blob([JSON.stringify(ipMetadata)]),
            ipMetadata
        );

        // STEP 3: Prepare license terms
        onProgress?.("Configuring license terms...");
        let licenseTerms: LicenseTerms | undefined;

        if (licenseType === "COMMERCIAL_USE") {
            licenseTerms = {
                commercialUse: true,
                commercialRevShare: royaltyPercentage,
                derivativesAllowed: true,
            };
        } else if (licenseType === "NON_COMMERCIAL") {
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

        // STEP 4: Register on Story Protocol
        onProgress?.("Registering on Story Protocol blockchain...");
        const result = await storyClient.registerIPAsset(
            ipMetadata,
            nftMetadata,
            metadataUri,
            metadataUri, // Using same URI for NFT metadata
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

/**
 * Get verification status badge info
 */
export function getVerificationStatusInfo(status: string) {
    const statusMap = {
        ORIGINAL: {
            label: "Original",
            color: "emerald",
            icon: "✓",
            description: "Content appears to be original and safe to register",
        },
        BRAND_IP_DETECTED: {
            label: "Brand IP",
            color: "orange",
            icon: "⚠",
            description: "Brand intellectual property detected",
        },
        ALREADY_REGISTERED: {
            label: "Registered",
            color: "red",
            icon: "🔒",
            description: "Content is already registered by another party",
        },
        PROCESSING: {
            label: "Analyzing",
            color: "blue",
            icon: "⏳",
            description: "Verifying content with Yakoa...",
        },
        PROTECTED: {
            label: "Protected",
            color: "purple",
            icon: "🛡",
            description: "Successfully registered on Story Protocol",
        },
        ERROR: {
            label: "Error",
            color: "gray",
            icon: "✗",
            description: "Verification failed",
        },
    };

    return statusMap[status as keyof typeof statusMap] || statusMap.ERROR;
}

/**
 * Create workflow path visualization data
 * Shows: Detection → Yakoa Verification → Story Registration
 */
export function getWorkflowPath(currentStep: "detect" | "verify" | "register" | "complete") {
    const steps = [
        {
            id: "detect",
            name: "Content Detection",
            description: "Auto-scan page for IP assets",
            status: currentStep === "detect" ? "active" : "complete",
            icon: "📡",
            tech: "Browser Extension",
        },
        {
            id: "verify",
            name: "Yakoa Verification",
            description: "Check for IP infringement",
            status:
                currentStep === "detect"
                    ? "pending"
                    : currentStep === "verify"
                        ? "active"
                        : "complete",
            icon: "🔍",
            tech: "Yakoa API",
        },
        {
            id: "register",
            name: "Story Registration",
            description: "Mint IP NFT on-chain",
            status:
                currentStep === "complete"
                    ? "complete"
                    : currentStep === "register"
                        ? "active"
                        : "pending",
            icon: "⚡",
            tech: "Story Protocol",
        },
    ];

    return steps;
}
