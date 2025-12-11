// lib/hooks/useStoryProtocol.ts
// React hook for Story Protocol IP registration

"use client";

import { useState, useCallback } from "react";
import type { StoryRegistrationResponse, LicenseType } from "@/lib/story/types";

interface RegisterIPParams {
    title: string;
    description?: string;
    assetType: "IMAGE" | "AUDIO" | "VIDEO" | "TEXT";
    mediaUrl: string;
    licenseType: LicenseType;
    royaltyPercentage: number;
    creatorName?: string;
    creatorAddress?: string;
}

interface UseStoryProtocolReturn {
    registerIP: (params: RegisterIPParams) => Promise<StoryRegistrationResponse>;
    isRegistering: boolean;
    lastRegistration: StoryRegistrationResponse | null;
    error: string | null;
    clearError: () => void;
}

export function useStoryProtocol(): UseStoryProtocolReturn {
    const [isRegistering, setIsRegistering] = useState(false);
    const [lastRegistration, setLastRegistration] = useState<StoryRegistrationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const registerIP = useCallback(async (params: RegisterIPParams): Promise<StoryRegistrationResponse> => {
        setIsRegistering(true);
        setError(null);

        try {
            const response = await fetch("/api/story/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to register IP");
            }

            const result: StoryRegistrationResponse = {
                success: true,
                ipId: data.data?.ipId,
                txHash: data.data?.txHash,
                explorerUrl: data.data?.explorerUrl,
                timestamp: Date.now(),
            };

            setLastRegistration(result);
            return result;
        } catch (err: any) {
            const errorMessage = err.message || "IP registration failed";
            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setIsRegistering(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        registerIP,
        isRegistering,
        lastRegistration,
        error,
        clearError,
    };
}

export default useStoryProtocol;
