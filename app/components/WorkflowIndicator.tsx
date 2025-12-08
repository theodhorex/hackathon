// app/components/WorkflowIndicator.tsx
// Visual workflow indicator showing Detection → Yakoa → Story path

import React from "react";
import { Check, Loader2, Circle } from "lucide-react";

type WorkflowStep = {
    id: string;
    name: string;
    shortName: string;
    tech: string;
    icon: string;
    status: "pending" | "active" | "complete" | "error";
    description?: string;
};

interface WorkflowIndicatorProps {
    currentStep: "idle" | "detecting" | "verifying" | "registering" | "complete" | "error";
    compact?: boolean;
    showDetails?: boolean;
}

export function WorkflowIndicator({ currentStep, compact = false, showDetails = true }: WorkflowIndicatorProps) {
    const getStepStatus = (stepId: string): WorkflowStep["status"] => {
        const stepOrder = ["detect", "verify", "register"];
        const currentOrder = ["idle", "detecting", "verifying", "registering", "complete", "error"];

        const currentIndex = currentOrder.indexOf(currentStep);
        const stepIndex = stepOrder.indexOf(stepId);

        if (currentStep === "error") return "error";
        if (currentStep === "idle") return "pending";

        if (currentStep === "detecting" && stepId === "detect") return "active";
        if (currentStep === "verifying" && stepId === "verify") return "active";
        if (currentStep === "registering" && stepId === "register") return "active";
        if (currentStep === "complete") return "complete";

        // Determine if step is complete based on progression
        if (stepId === "detect" && currentIndex > 1) return "complete";
        if (stepId === "verify" && currentIndex > 2) return "complete";
        if (stepId === "register" && currentIndex === 4) return "complete";

        return "pending";
    };

    const steps: WorkflowStep[] = [
        {
            id: "detect",
            name: "Content Detection",
            shortName: "Detect",
            tech: "Extension",
            icon: "📡",
            status: getStepStatus("detect"),
            description: "Auto-scan page content",
        },
        {
            id: "verify",
            name: "IP Verification",
            shortName: "Verify",
            tech: "Yakoa API",
            icon: "🔍",
            status: getStepStatus("verify"),
            description: "Check for infringement",
        },
        {
            id: "register",
            name: "IP Registration",
            shortName: "Register",
            tech: "Story Protocol",
            icon: "⚡",
            status: getStepStatus("register"),
            description: "Mint IP NFT on-chain",
        },
    ];

    const getStatusColor = (status: WorkflowStep["status"]) => {
        switch (status) {
            case "complete":
                return "bg-emerald-500/20 border-emerald-400 text-emerald-300";
            case "active":
                return "bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse";
            case "error":
                return "bg-red-500/20 border-red-400 text-red-300";
            default:
                return "bg-gray-800/50 border-gray-700 text-gray-500";
        }
    };

    const getStatusIcon = (status: WorkflowStep["status"]) => {
        switch (status) {
            case "complete":
                return <Check className="w-3 h-3" />;
            case "active":
                return <Loader2 className="w-3 h-3 animate-spin" />;
            case "error":
                return <span className="text-xs">✗</span>;
            default:
                return <Circle className="w-2 h-2" />;
        }
    };

    if (compact) {
        // Compact horizontal version
        return (
            <div className="flex items-center gap-1">
                {steps.map((step, idx) => (
                    <React.Fragment key={step.id}>
                        <div
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-bold transition-all ${getStatusColor(
                                step.status
                            )}`}
                            title={`${step.name} (${step.tech})`}
                        >
                            <span className="text-sm">{step.icon}</span>
                            <span className="hidden sm:inline">{step.shortName}</span>
                            <span className="ml-1">{getStatusIcon(step.status)}</span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className="text-gray-600 text-xs px-1">→</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    // Full version with details
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-4 text-center">
                <h3 className="text-white font-bold text-sm mb-1">IP Protection Workflow</h3>
                <p className="text-gray-400 text-xs">Powered by Yakoa & Story Protocol</p>
            </div>

            {/* Steps */}
            <div className="space-y-3">
                {steps.map((step, idx) => (
                    <div key={step.id} className="relative">
                        {/* Step Card */}
                        <div
                            className={`relative p-3 rounded-xl border-2 transition-all duration-300 ${getStatusColor(
                                step.status
                            )}`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Icon */}
                                <div className="text-2xl flex-shrink-0">{step.icon}</div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-sm">{step.name}</h4>
                                        {getStatusIcon(step.status)}
                                    </div>

                                    {showDetails && (
                                        <>
                                            <p className="text-xs opacity-80 mb-1">{step.description}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded font-mono">
                                                    {step.tech}
                                                </span>
                                                {step.status === "active" && (
                                                    <span className="text-[10px] text-cyan-400 animate-pulse">
                                                        Processing...
                                                    </span>
                                                )}
                                                {step.status === "complete" && (
                                                    <span className="text-[10px] text-emerald-400">✓ Done</span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar for active step */}
                            {step.status === "active" && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 rounded-b-xl overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
                                </div>
                            )}
                        </div>

                        {/* Connector */}
                        {idx < steps.length - 1 && (
                            <div className="flex justify-center py-2">
                                <div
                                    className={`w-px h-4 ${step.status === "complete"
                                            ? "bg-emerald-400"
                                            : step.status === "active"
                                                ? "bg-cyan-400"
                                                : "bg-gray-700"
                                        }`}
                                ></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Status Message */}
            {currentStep !== "idle" && (
                <div className="mt-4 p-3 bg-gray-900/50 border border-cyan-500/20 rounded-xl">
                    <p className="text-xs text-center text-gray-400">
                        {currentStep === "detecting" && "🔍 Scanning page for IP assets..."}
                        {currentStep === "verifying" && "⚡ Verifying with Yakoa API..."}
                        {currentStep === "registering" && "🛡 Minting IP NFT on Story Protocol..."}
                        {currentStep === "complete" && "✅ IP Asset Protected Successfully!"}
                        {currentStep === "error" && "❌ An error occurred during the process"}
                    </p>
                </div>
            )}
        </div>
    );
}

// Compact version for header/navbar
export function WorkflowBadge({ currentStep }: { currentStep: WorkflowIndicatorProps["currentStep"] }) {
    return <WorkflowIndicator currentStep={currentStep} compact={true} showDetails={false} />;
}

export default WorkflowIndicator;
