import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { Content } from '../types';

interface LoadingScreenProps {
    content: Content;
    onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ content, onLoadingComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence timing
        const timers = [
            setTimeout(() => setStep(1), 500),  // Show Ball
            setTimeout(() => setStep(2), 1500), // Show Text
            setTimeout(() => onLoadingComplete(), 2800), // Transition to App
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, [onLoadingComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-50 dark:bg-stone-950 overflow-hidden">
            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.8
                        }}
                        className="flex items-center justify-center"
                    >
                        <BrandLogo
                            fontSize="3rem"
                            lineHeight="1"
                            ballSize="2.5rem"
                            isHome={true}
                            content={content}
                            layoutId="main-logo"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative pulse for the ball during loading */}
            {step === 1 && (
                <motion.div
                    className="absolute w-10 h-10 bg-[#0000FF]/20 rounded-full"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                />
            )}
        </div>
    );
};

export default LoadingScreen;
