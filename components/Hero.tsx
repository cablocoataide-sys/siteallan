import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Content } from '../types';
import { useMouseAngle } from '../hooks/useMouseAngle';

interface HeroProps {
  content: Content;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const angle = useMouseAngle(buttonRef);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { y: 56, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-end pb-4 md:pb-20 px-4 md:px-12 pt-32 md:pt-12 overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-[95vw]"
      >
          {/* Hero Grid - Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16 md:mb-24">
            
            {/* First Two Columns - Hero Headline */}
            <div className="md:col-span-2">
              <motion.h1 
                variants={textVariants}
                className="font-sans font-bold tracking-tight text-stone-900 dark:text-white leading-[0.95] text-6xl md:text-[80px] lg:text-[100px] whitespace-normal"
              >
                {content.heroHeadline} {content.heroSub}
              </motion.h1>
            </div>

            {/* Third Column - About Text + CTA */}
            <div className="flex flex-col justify-start items-start md:items-end max-w-lg">
              <motion.div
                variants={textVariants}
                className="flex flex-col gap-6 w-full"
              >
                {/* About Text */}
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-lg md:text-xl font-medium">
                  {content.footerAbout}
                </p>

                {/* CTA Button */}
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
      </motion.div>
    </section>
  );
};

export default Hero;