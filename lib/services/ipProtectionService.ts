// lib/services/ipProtectionService.ts
// Unified service for IP Protection combining Yakoa and Story Protocol

import type { YakoaResult, ContentStatus } from "@/lib/yakoa/types";
import type { StoryRegistrationResponse, LicenseType } from "@/lib/story/types";

export interface ContentItem {
    id: number;
    url: string;
    title: string;
    type: "image" | "audio" | "video" | "text";
    status: ContentStatus;
    confidence: number;
    size?: string;
    alt?: string;
    brand?: string;
    owner?: string;
}

export interface ProtectedIP {
    id: number;
    url: string;
    title: string;
    status: "protected";
    earnings: string;
    alerts: number;
    storyId: string;
    txHash?: string;
    explorerUrl?: string;
    registeredAt?: number;
}

export interface VerifyAndRegisterResult {
    verified: boolean;
    registered: boolean;
    yakoaResult?: YakoaResult;
    storyResult?: StoryRegistrationResponse;
    error?: string;
}

/**
 * IP Protection Service
 * Provides unified interface for content verification and IP registration
 */
class IPProtectionService {
    private apiBaseUrl: string;

    constructor() {
        this.apiBaseUrl = typeof window !== "undefined" ? window.location.origin : "";
    }

    /**
     * Verify content using Yakoa API
     */
    async verifyContent(content: ContentItem): Promise<{
        success: boolean;
        result?: YakoaResult;
        newStatus: ContentStatus;
        error?: string;
    }> {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/yakoa/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contentUrl: content.url,
                    contentType: content.type,
                    title: content.title,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                return {
                    success: false,
                    newStatus: "ERROR",
                    error: data.error || "Verification failed",
                };
            }

            // Map Yakoa result to content status
            let newStatus: ContentStatus = "PROCESSING";
            if (data.result.isInfringing) {
                newStatus = "BRAND_IP_DETECTED";
            } else if (data.result.matchedOwner) {
                newStatus = "ALREADY_REGISTERED";
            } else if (data.result.isOriginal) {
                newStatus = "ORIGINAL";
            }

            return {
                success: true,
                result: data.result,
                newStatus,
            };
        } catch (error: any) {
            console.error("Content verification error:", error);
            return {
                success: false,
                newStatus: "ERROR",
                error: error.message || "Verification failed",
            };
        }
    }

    /**
     * Register IP on Story Protocol
     */
    async registerIP(
        content: ContentItem,
        licenseType: LicenseType = "COMMERCIAL_USE",
        royaltyPercentage: number = 10,
        description?: string
    ): Promise<{
        success: boolean;
        protectedIP?: ProtectedIP;
        storyResult?: StoryRegistrationResponse;
        error?: string;
    }> {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/story/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: content.title,
                    description: description || `IP Asset: ${content.title}`,
                    assetType: content.type.toUpperCase(),
                    mediaUrl: content.url,
                    licenseType,
                    royaltyPercentage,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                return {
                    success: false,
                    error: data.error || "Registration failed",
                };
            }

            // Create protected IP record
            const protectedIP: ProtectedIP = {
                id: Date.now(),
                url: content.url,
                title: content.title,
                status: "protected",
                earnings: "$0.00",
                alerts: 0,
                storyId: data.data?.ipId || `0x${Math.random().toString(16).substring(2, 10)}...`,
                txHash: data.data?.txHash,
                explorerUrl: data.data?.explorerUrl,
                registeredAt: Date.now(),
            };

            return {
                success: true,
                protectedIP,
                storyResult: {
                    success: true,
                    ipId: data.data?.ipId,
                    txHash: data.data?.txHash,
                    explorerUrl: data.data?.explorerUrl,
                    timestamp: Date.now(),
                },
            };
        } catch (error: any) {
            console.error("IP registration error:", error);
            return {
                success: false,
                error: error.message || "Registration failed",
            };
        }
    }

    /**
     * Quick protect: Verify and register in one flow
     */
    async quickProtect(
        content: ContentItem,
        licenseType: LicenseType = "COMMERCIAL_USE",
        royaltyPercentage: number = 10
    ): Promise<VerifyAndRegisterResult> {
        // Step 1: Verify content
        const verifyResult = await this.verifyContent(content);

        if (!verifyResult.success) {
            return {
                verified: false,
                registered: false,
                error: verifyResult.error,
            };
        }

        // Check if content can be registered
        if (verifyResult.newStatus !== "ORIGINAL") {
            return {
                verified: true,
                registered: false,
                yakoaResult: verifyResult.result,
                error: `Cannot register: Content status is ${verifyResult.newStatus}`,
            };
        }

        // Step 2: Register on Story Protocol
        const registerResult = await this.registerIP(content, licenseType, royaltyPercentage);

        return {
            verified: true,
            registered: registerResult.success,
            yakoaResult: verifyResult.result,
            storyResult: registerResult.storyResult,
            error: registerResult.error,
        };
    }

    /**
     * Batch verify multiple content items
     */
    async batchVerify(contents: ContentItem[]): Promise<Map<number, ContentStatus>> {
        const results = new Map<number, ContentStatus>();

        // Process in parallel with rate limiting
        const batchSize = 3;
        for (let i = 0; i < contents.length; i += batchSize) {
            const batch = contents.slice(i, i + batchSize);
            const promises = batch.map((content) => this.verifyContent(content));
            const batchResults = await Promise.all(promises);

            batch.forEach((content, index) => {
                results.set(content.id, batchResults[index].newStatus);
            });

            // Small delay between batches to prevent rate limiting
            if (i + batchSize < contents.length) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }

        return results;
    }

    /**
     * Get service health status
     */
    async getHealth(): Promise<{
        yakoa: { status: string; configured: boolean; mode: string };
        story: { status: string; network: string; chainId: number };
    }> {
        try {
            const [yakoaResponse, storyResponse] = await Promise.all([
                fetch(`${this.apiBaseUrl}/api/yakoa/check`),
                fetch(`${this.apiBaseUrl}/api/story/register`),
            ]);

            const yakoaData = await yakoaResponse.json();
            const storyData = await storyResponse.json();

            return {
                yakoa: {
                    status: yakoaData.status || "unknown",
                    configured: yakoaData.configured || false,
                    mode: yakoaData.mode || "simulation",
                },
                story: {
                    status: storyData.status || "unknown",
                    network: storyData.network || "aeneid",
                    chainId: storyData.chainId || 1315,
                },
            };
        } catch (error) {
            return {
                yakoa: { status: "error", configured: false, mode: "unknown" },
                story: { status: "error", network: "unknown", chainId: 0 },
            };
        }
    }
}

// Singleton instance
let ipProtectionService: IPProtectionService | null = null;

export function getIPProtectionService(): IPProtectionService {
    if (!ipProtectionService) {
        ipProtectionService = new IPProtectionService();
    }
    return ipProtectionService;
}

export default IPProtectionService;
