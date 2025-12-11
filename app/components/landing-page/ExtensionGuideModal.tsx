'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Chrome, MousePointer2, ArrowRight } from 'lucide-react'

interface ExtensionGuideModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ExtensionGuideModal({ isOpen, onClose }: ExtensionGuideModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-3xl shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10 group"
                        >
                            <X size={20} className="text-white group-hover:rotate-90 transition-transform" />
                        </button>

                        {/* Header with Glow Effect */}
                        <div className="relative p-8 pb-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <Chrome size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            How to Open IP Shield Extension
                                        </h2>
                                        <p className="text-sm text-gray-400">Follow these simple steps</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="px-8 pb-8 space-y-6">
                            {/* Step 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex gap-4 items-start"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                                    <span className="text-purple-400 font-bold">1</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                        Find the Extension Icon
                                        <MousePointer2 size={16} className="text-purple-400" />
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">
                                        Look for the <span className="text-white font-semibold">puzzle piece icon (🧩)</span> in your Chrome toolbar (top-right corner)
                                    </p>
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                                        <p className="text-xs text-gray-500 mb-2">Chrome Toolbar Location:</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-400">Extensions Icon →</span>
                                            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                                                <span className="font-mono text-purple-400">🧩 Extensions</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex gap-4 items-start"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                                    <span className="text-purple-400 font-bold">2</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Click IP Shield
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">
                                        In the dropdown, find and click on <span className="text-white font-semibold">"IP Shield"</span>
                                    </p>
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-xs">IP</span>
                                            </div>
                                            <span className="text-white font-semibold">IP Shield</span>
                                            <ArrowRight size={16} className="text-gray-500 ml-auto" />
                                        </div>
                                        <p className="text-xs text-gray-500">Click here to open the extension</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 3 - Optional: Pin Extension */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-4 items-start bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-500/30 border border-purple-500/50 rounded-full flex items-center justify-center">
                                    <span className="text-purple-300 font-bold">💡</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        Pro Tip: Pin for Quick Access
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        Click the <span className="font-semibold">pin icon (📌)</span> next to IP Shield to keep it visible in your toolbar for one-click access!
                                    </p>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full text-white font-semibold transition-all shadow-lg hover:shadow-purple-500/50"
                                >
                                    Got It!
                                </button>
                                <button
                                    onClick={() => {
                                        window.open('/extension', '_blank')
                                        onClose()
                                    }}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all"
                                >
                                    Open Demo
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
