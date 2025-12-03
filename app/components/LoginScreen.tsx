import React, { useState } from "react";
import { Shield, Loader2, AlertCircle } from "lucide-react";

interface IPShieldLogoProps {
    size?: number;
}

const IPShieldLogo: React.FC<IPShieldLogoProps> = ({ size = 24 }) => (
    <Shield className="text-white" style={{ width: size, height: size }} />
);

interface LoginScreenProps {
    onLogin: (username: string, password: string) => void;
    loginError: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, loginError }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onLogin(username, password);
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="w-[400px] h-[600px] relative overflow-hidden bg-black">
            {/* SxY Logo - Top Right Corner */}
            <div className="absolute top-1 right-1 z-20 animate-in fade-in slide-in-from-top duration-700">
                <div className="relative bg-black p-2 rounded">
                    <img
                        src="/sxy-logo.png"
                        alt="SxY Logo"
                        className="w-8 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 relative z-10"
                    />
                </div>
            </div>

            {/* Foreground Layer - Login Form */}
            <div className="absolute inset-0 flex items-center justify-end flex-col pb-4 z-10">
                <div className="w-72 p-4 space-y-6 mt-52 animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-1">
                        <div className="flex justify-center mb-1">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-2xl shadow-2xl">
                                    <IPShieldLogo size={28} />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-xl font-black text-white bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(100,255,255,0.5)]">
                            IP Shield
                        </h2>
                        <p className="text-cyan-400 text-xs font-bold">Secure Your Digital Assets</p>

                        {/* Gradient Lines below subtitle */}
                        <div className="relative w-full h-4 mt-2">
                            <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
                            <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
                            <div className="absolute left-1/4 right-1/4 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] blur-sm" />
                            <div className="absolute left-1/4 right-1/4 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
                        <div>
                            <label htmlFor="username" className="block text-xs font-bold text-gray-300 mb-2">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-gray-900/50 border border-cyan-500/30 focus:border-cyan-400 text-white px-4 py-2.5 rounded-lg placeholder-gray-500 transition-all duration-300 backdrop-blur-sm focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-50 hover:border-cyan-500/50"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold text-gray-300 mb-2">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-gray-900/50 border border-cyan-500/30 focus:border-cyan-400 text-white px-4 py-2.5 rounded-lg placeholder-gray-500 transition-all duration-300 backdrop-blur-sm focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-50 hover:border-cyan-500/50"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {loginError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-in fade-in slide-in-from-top-1">
                                <p className="text-red-400 text-xs font-medium flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {loginError}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full py-3 rounded-lg font-bold text-white overflow-hidden group transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="w-4 h-4" />
                                        Sign In
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 space-y-2 hover:bg-purple-500/20 transition-colors duration-300">
                        <p className="text-purple-300 text-xs font-bold flex items-center gap-1.5">
                            Demo Accounts
                        </p>
                        <div className="space-y-1 text-[11px] text-gray-400 font-mono">
                            <div className="flex justify-between">
                                <span>admin / admin123</span>
                                <span className="text-purple-400">Admin</span>
                            </div>
                            <div className="flex justify-between">
                                <span>demo / demo123</span>
                                <span className="text-purple-400">Demo</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-[10px] text-gray-500">
                        <p>Powered by Yakoa & Story Protocol</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
