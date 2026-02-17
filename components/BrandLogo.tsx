import React from 'react';
import { motion } from 'framer-motion';
import { Language, Content } from '../types';

interface BrandLogoProps {
    fontSize?: any;
    lineHeight?: any;
    ballSize?: any;
    isHome: boolean;
    content: Content;
    layoutId?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
    fontSize,
    lineHeight,
    ballSize,
    isHome,
    content,
    layoutId = "brand-logo"
}) => {
    return (
        <motion.div
            layoutId={layoutId}
            className="flex items-center gap-[0.5em] group cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
        >
            <motion.div
                style={{ width: ballSize, height: ballSize }}
                className="rounded-full bg-[#0000FF] shrink-0 flex items-center justify-center overflow-hidden"
                layout
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
                {/* Seta de voltar removida daqui para manter o componente puro, 
            ela será gerenciada no Header ou em volta do BrandLogo */}
            </motion.div>

            <div className="relative overflow-hidden">
                <motion.h1
                    layout
                    style={{ fontSize, lineHeight }}
                    className="font-sans font-bold tracking-tighter text-black dark:text-white whitespace-nowrap"
                >
                    {isHome ? 'Allan Rolim' : content.back}
                </motion.h1>
            </div>
        </motion.div>
    );
};

export default BrandLogo;
