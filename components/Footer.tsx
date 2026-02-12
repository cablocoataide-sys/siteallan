import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { ArrowRight } from 'lucide-react';
import { useMouseAngle } from '../hooks/useMouseAngle';

interface FooterProps {
  content: Content;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const angle = useMouseAngle(buttonRef);
  return (
    <footer className="w-full bg-stone-50 dark:bg-stone-950 transition-colors duration-500 flex flex-col pt-12 md:pt-20">
      
      {/* Main Footer Grid - Matches Projects Grid (2 columns on Desktop) */}
      <div className="px-6 md:px-12 pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 items-start">
        
        {/* Left Column - Headline */}
        <div className="flex flex-col justify-start h-full">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-sans font-bold leading-[1.05] tracking-tighter text-stone-900 dark:text-stone-50"
          >
            {content.footerHeadline}
          </motion.h2>
        </div>

        {/* Right Column - Info & CTA - Moved text higher slightly */}
        <div className="flex flex-col justify-between h-full pt-2 md:pt-0">
          
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            {/* Name removed as requested */}
            <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-lg">
              {content.footerAbout}
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="mt-16 md:mt-24"
          >
            {/* CTA Button - Mesmo estilo do Hero */}
            <button 
              ref={buttonRef}
              onClick={() => window.open('https://wa.me/5543996312386', '_blank')}
              className="group relative w-full flex items-center justify-between px-6 py-6 border border-stone-200 dark:border-stone-800 rounded-full overflow-hidden hover:border-[#0000FF] transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[#0000FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              
              <span className="relative z-10 text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-50 group-hover:text-white transition-colors duration-300 font-sans">
                {content.ctaButton}
              </span>
              <motion.div
                className="relative z-10"
                animate={{ rotate: angle }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                <ArrowRight size={28} className="text-stone-900 dark:text-stone-50 group-hover:text-white transition-colors duration-300" />
              </motion.div>
            </button>
          </motion.div>

        </div>
      </div>

      {/* Marquee - Loop contínuo sem glitch */}
      <div className="w-full py-16 md:py-24 overflow-hidden relative border-t border-stone-200 dark:border-stone-800">
         <motion.div 
            className="flex items-center whitespace-nowrap"
            animate={{ x: [0, -2000] }}
            transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 50,
                repeatType: "loop"
            }}
         >
            {/* Repeated Content for smooth loop - duplicado mais vezes */}
            {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-4 text-stone-900 dark:text-stone-50">
                    <span className="text-6xl md:text-9xl font-sans font-bold tracking-tighter uppercase">
                        {content.marqueeText1}
                    </span>
                    
                    {/* Spinning Ball */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
                        className="w-12 h-12 md:w-24 md:h-24 bg-[#0000FF] rounded-full flex items-center justify-center overflow-hidden shrink-0 relative"
                    >
                        <div className="w-full h-[2px] bg-stone-50 dark:bg-stone-950"></div>
                        <div className="absolute w-[2px] h-full bg-stone-50 dark:bg-stone-950"></div>
                    </motion.div>

                    <span className="text-6xl md:text-9xl font-sans font-bold tracking-tighter uppercase opacity-50">
                        {content.marqueeText2}
                    </span>

                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
                        className="w-12 h-12 md:w-24 md:h-24 bg-[#0000FF] rounded-full flex items-center justify-center shrink-0 relative"
                    >
                        <div className="w-full h-[2px] bg-stone-50 dark:bg-stone-950"></div>
                        <div className="absolute w-[2px] h-full bg-stone-50 dark:bg-stone-950"></div>
                    </motion.div>
                    
                    <div className="w-12 md:w-24"></div> {/* Spacer */}
                </div>
            ))}
         </motion.div>
      </div>
    </footer>
  );
};

export default Footer;