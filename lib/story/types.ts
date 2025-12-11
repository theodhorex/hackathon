// lib/story/types.ts
// Type definitions for Story Protocol integration

export type LicenseType = "COMMERCIAL_USE" | "NON_COMMERCIAL" | "NO_DERIVATIVES";

export interface StoryRegistrationRequest {
    title: string;
    description: string;
    assetType: "IMAGE" | "AUDIO" | "VIDEO" | "TEXT";
    mediaUrl: string;
    licenseType: LicenseType;
    royaltyPercentage: number;
    creatorAddress?: string;
    creatorName?: string;
}

export interface StoryRegistrationResponse {
    success: boolean;
    ipId?: string;
    txHash?: string;
    explorerUrl?: string;
    error?: string;
    timestamp?: number;
}

export interface IPAssetInfo {
    ipId: string;
    title: string;
    description: string;
    mediaUrl: string;
    owner: string;
    licenseType: LicenseType;
    royaltyPercentage: number;
    registeredAt: number;
    txHash: string;
    explorerUrl: string;
}

// Mapping from our license types to Story Protocol PIL terms
export const LICENSE_TO_PIL_MAP: Record<LicenseType, { commercialUse: boolean; derivativesAllowed: boolean }> = {
    COMMERCIAL_USE: {
        commercialUse: true,
        derivativesAllowed: true,
    },
    NON_COMMERCIAL: {
        commercialUse: false,
        derivativesAllowed: true,
    },
    NO_DERIVATIVES: {
        commercialUse: false,
        derivativesAllowed: false,
    },
};
