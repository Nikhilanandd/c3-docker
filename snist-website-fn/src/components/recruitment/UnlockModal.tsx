'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Candidate } from '@/types/recruitment';

interface UnlockModalProps {
    isOpen: boolean;
    onUnlock: (data: Candidate) => void;
    onClose: () => void;
}

export default function UnlockModal({ isOpen, onUnlock, onClose }: UnlockModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        passingOutYear: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Call backend API to save candidate data
            const response = await fetch('/api/recruitment/unlock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors with specific messages
                if (data.errors && Array.isArray(data.errors)) {
                    // Zod validation errors
                    const errorMessages = data.errors.map((err: any) => err.message).join(', ');
                    throw new Error(errorMessages);
                } else if (data.message) {
                    // Backend error message
                    throw new Error(data.message);
                } else {
                    throw new Error('Failed to unlock challenges');
                }
            }

            // Success - call parent onUnlock handler
            onUnlock({
                ...formData,
                isVerified: true,
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            console.error('Unlock error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-[#0a0a0a] border border-white/[0.06] rounded-2xl shadow-2xl p-8 backdrop-blur-md relative"
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">Identity Verification</span>
                            </div>
                            <h2 className="font-bold text-white text-lg tracking-tight title-main mb-2">
                                Verify to Continue
                            </h2>
                            <p className="text-gray-500 text-sm font-light">
                                Complete verification to access classified challenges
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-white/30 text-xs uppercase tracking-widest mb-2 font-mono">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-b border-white/[0.06] bg-transparent text-white py-3 focus:border-cyan-400/50 outline-none transition-colors duration-300 placeholder:text-white/15"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-white/30 text-xs uppercase tracking-widest mb-2 font-mono">
                                    College Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-b border-white/[0.06] bg-transparent text-white py-3 focus:border-cyan-400/50 outline-none transition-colors duration-300 placeholder:text-white/15"
                                    placeholder="you@college.edu"
                                />
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-white/30 text-xs uppercase tracking-widest mb-2 font-mono">
                                    Mobile Number
                                </label>
                                <div className="flex items-center border-b border-white/[0.06]">
                                    <span className="text-white/40 py-3 pr-2">+91</span>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        className="flex-1 bg-transparent text-white py-3 focus:outline-none placeholder:text-white/15"
                                        placeholder="XXXXX XXXXX"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="passingOutYear" className="block text-white/30 text-xs uppercase tracking-widest mb-2 font-mono">
                                    Passing Out Year
                                </label>
                                <input
                                    type="text"
                                    id="passingOutYear"
                                    name="passingOutYear"
                                    value={formData.passingOutYear}
                                    onChange={handleChange}
                                    required
                                    maxLength={4}
                                    pattern="[0-9]{4}"
                                    className="w-full border-b border-white/[0.06] bg-transparent text-white py-3 focus:border-cyan-400/50 outline-none transition-colors duration-300 placeholder:text-white/15"
                                    placeholder="2026"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-500/30 hover:text-cyan-400 hover:shadow-[0_0_20px_-6px_rgba(6,182,212,0.2)] transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Unlocking...' : 'Unlock Challenge'}
                            </button>
                        </form>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-white/20 hover:text-cyan-400 transition-colors duration-300 text-sm"
                        >
                            ✕
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
