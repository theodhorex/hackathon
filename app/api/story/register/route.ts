// app/api/story/register/route.ts
// API Route for Story Protocol IP Registration

import { NextRequest, NextResponse } from "next/server";
import type { StoryRegistrationRequest, StoryRegistrationResponse, LICENSE_TO_PIL_MAP } from "@/lib/story/types";

// Note: For actual blockchain transactions, the Story Protocol SDK should be
// initialized on the client-side with the user's wallet. This API route
// handles the metadata preparation and can be used for server-side operations.

export interface RegisterIPRequest {
    title: string;
    description: string;
    assetType: "IMAGE" | "AUDIO" | "VIDEO" | "TEXT";
    mediaUrl: string;
    licenseType: "COMMERCIAL_USE" | "NON_COMMERCIAL" | "NO_DERIVATIVES";
    royaltyPercentage: number;
    creatorName?: string;
    creatorAddress?: string;
}

export interface RegisterIPResponse {
    success: boolean;
    message: string;
    data?: {
        ipId: string;
        txHash: string;
        explorerUrl: string;
        ipMetadata: any;
        nftMetadata: any;
    };
    error?: string;
}

export async function POST(req: NextRequest) {
    try {
        const payload = (await req.json()) as RegisterIPRequest;

        // Validate required fields
        if (!payload.title || !payload.mediaUrl) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields: title and mediaUrl are required",
                },
                { status: 400 }
            );
        }

        // Prepare IP Metadata (following Story Protocol IPA Metadata Standard)
        const ipMetadata = {
            title: payload.title,
            description: payload.description || `IP Asset registered via IP Shield`,
            image: payload.mediaUrl,
            mediaUrl: payload.mediaUrl,
            mediaType: getMediaType(payload.assetType),
            creators: [
                {
                    name: payload.creatorName || "IP Shield User",
                    address: payload.creatorAddress || "0x0000000000000000000000000000000000000000",
                    contributionPercent: 100,
                },
            ],
            attributes: {
                assetType: payload.assetType,
                licenseType: payload.licenseType,
                royaltyPercentage: payload.royaltyPercentage,
                registeredAt: new Date().toISOString(),
                registeredVia: "IP Shield Extension",
            },
        };

        // Prepare NFT Metadata (ERC-721 standard)
        const nftMetadata = {
            name: `IP: ${payload.title}`,
            description: `IP Asset NFT representing ownership of "${payload.title}". Licensed under ${formatLicenseType(payload.licenseType)}.`,
            image: payload.mediaUrl,
            attributes: [
                { trait_type: "Asset Type", value: payload.assetType },
                { trait_type: "License Type", value: payload.licenseType },
                { trait_type: "Royalty %", value: payload.royaltyPercentage },
            ],
        };

        // Generate mock transaction data for demo
        // In production, this would be replaced with actual Story Protocol SDK call
        const mockTxHash = `0x${generateRandomHex(64)}`;
        const mockIpId = `0x${generateRandomHex(40)}`;

        const response: RegisterIPResponse = {
            success: true,
            message: "IP Asset registration prepared successfully",
            data: {
                ipId: mockIpId,
                txHash: mockTxHash,
                explorerUrl: `https://aeneid.explorer.story.foundation/ipa/${mockIpId}`,
                ipMetadata,
                nftMetadata,
            },
        };

        // Log for debugging
        console.log("Story Protocol Registration Request:", payload);
        console.log("Generated IP Metadata:", ipMetadata);

        return NextResponse.json(response, { status: 200 });
    } catch (err: unknown) {
        console.error("Story registration error:", err);
        const errorMessage = err instanceof Error ? err.message : "Server error";
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

// GET endpoint for service info
export async function GET() {
    return NextResponse.json({
        service: "Story Protocol Registration",
        status: "operational",
        network: "aeneid", // Testnet
        chainId: 1315,
        spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc",
        explorerUrl: "https://aeneid.explorer.story.foundation",
        timestamp: new Date().toISOString(),
    });
}

// Helper functions
function getMediaType(assetType: string): string {
    switch (assetType) {
        case "IMAGE":
            return "image/png";
        case "AUDIO":
            return "audio/mpeg";
        case "VIDEO":
            return "video/mp4";
        case "TEXT":
            return "text/plain";
        default:
            return "application/octet-stream";
    }
}

function formatLicenseType(licenseType: string): string {
    switch (licenseType) {
        case "COMMERCIAL_USE":
            return "Commercial Use License";
        case "NON_COMMERCIAL":
            return "Non-Commercial License";
        case "NO_DERIVATIVES":
            return "No Derivatives License";
        default:
            return licenseType;
    }
}

function generateRandomHex(length: number): string {
    const chars = "0123456789abcdef";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
