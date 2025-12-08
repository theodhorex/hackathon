// lib/hooks/useYakoa.ts
// React hook for Yakoa content verification

"use client";

import { useState, useCallback } from "react";
import type { YakoaResult, ContentStatus } from "@/lib/yakoa/types";

interface UseYakoaReturn {
    verifyContent: (url: string, type: "image" | "audio" | "video" | "text", title?: string) => Promise<YakoaResult>;
    isVerifying: boolean;
    lastResult: YakoaResult | null;
    error: string | null;
    clearError: () => void;
}

export function useYakoa(): UseYakoaReturn {
    const [isVerifying, setIsVerifying] = useState(false);
    const [lastResult, setLastResult] = useState<YakoaResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const verifyContent = useCallback(async (
        contentUrl: string,
        contentType: "image" | "audio" | "video" | "text",
        title?: string
    ): Promise<YakoaResult> => {
        setIsVerifying(true);
        setError(null);

        try {
            const response = await fetch("/api/yakoa/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contentUrl,
                    contentType,
                    title,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to verify content");
            }

            setLastResult(data.result);
            return data.result;
        } catch (err: any) {
            const errorMessage = err.message || "Content verification failed";
            setError(errorMessage);

            // Return a default result on error
            return {
                isOriginal: false,
                isInfringing: false,
                isAuthorized: false,
                confidence: 0,
                infringements: [],
                recommendations: ["Unable to verify content. Please try again."],
            };
        } finally {
            setIsVerifying(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        verifyContent,
        isVerifying,
        lastResult,
        error,
        clearError,
    };
}

export default useYakoa;
