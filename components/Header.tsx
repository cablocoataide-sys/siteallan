import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Theme, Language, Content } from '../types';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  content: Content;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, lang, setLang, content }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20); // Faster trigger
    });
  }, [scrollY]);

  // Premium transition constants - Fixed typing by splitting duration and ease
  const premiumTransition = {
    duration: 0.7,
    ease: [0.19, 1, 0.22, 1] as const
  };

  const segmentStyle = "h-9 rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-sm flex items-center p-0.5 transition-colors duration-500";
  const segmentOption = (active: boolean) =>
    `flex-1 min-w-[2.5rem] h-full rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all cursor-pointer ${active
      ? "bg-stone-200/90 dark:bg-stone-700/90 text-stone-900 dark:text-stone-50"
      : "text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        paddingTop: isScrolled ? "0.75rem" : "4.5rem",
        paddingBottom: isScrolled ? "0.75rem" : "4.5rem",
        backgroundColor: isScrolled
          ? (theme === 'dark' ? 'rgba(12, 10, 9, 0.95)' : 'rgba(255, 255, 255, 0.95)')
          : 'rgba(255, 255, 255, 0)',
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
        boxShadow: isScrolled
          ? (theme === 'dark' ? '0 10px 30px -10px rgba(0,0,0,0.5)' : '0 10px 30px -10px rgba(0,0,0,0.08)')
          : '0 0px 0px rgba(0,0,0,0)',
        borderBottom: isScrolled
          ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
          : '1px solid rgba(0,0,0,0)'
      }}
      transition={premiumTransition}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      {/* Container interno com padding fixo */}
      <div className="w-full px-4 md:px-12 flex justify-between items-center gap-4 pointer-events-auto">
        {/* Logo: bolinha azul + Allan Rolim / Voltar com transição suave */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-[0.4em] group cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 origin-left"
        >
          <motion.div
            animate={{
              width: isScrolled ? "1.1rem" : "2.4rem",
              height: isScrolled ? "1.1rem" : "2.4rem",
              scale: isScrolled ? 1 : 1.1
            }}
            transition={premiumTransition}
            className="rounded-full bg-[#0000FF] shrink-0 flex items-center justify-center overflow-hidden"
            layout
          >
            <AnimatePresence mode="wait">
              {location.pathname !== '/' && (
                <motion.svg
                  key="arrow"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  width="50%"
                  height="50%"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={location.pathname === '/' ? 'home' : 'back'}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  fontSize: isScrolled ? "1.25rem" : "2.8rem",
                }}
                exit={{ opacity: 0, y: -30 }}
                transition={premiumTransition}
                style={{ lineHeight: "1", transformOrigin: "left center" }}
                className="font-sans font-bold tracking-tighter text-black dark:text-white whitespace-nowrap"
              >
                {location.pathname === '/' ? 'Allan Rolim' : content.back}
              </motion.h1>
            </AnimatePresence>
          </div>
        </button>

        {/* Controls - suaves e no tema */}
        <div className="flex items-center gap-2 md:gap-3 font-sans flex-shrink-0">
          <motion.div
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={premiumTransition}
            className="flex items-center gap-2 md:gap-3"
          >
            {/* Language: BR | EN ratio */}
            <div className={segmentStyle}>
              <button
                type="button"
                onClick={() => setLang('pt')}
                className={segmentOption(lang === 'pt')}
                aria-pressed={lang === 'pt'}
              >
                BR
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={segmentOption(lang === 'en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </div>

            {/* Theme: Light | Dark ratio (both icons always visible) */}
            <div className={segmentStyle}>
              <button
                type="button"
                onClick={() => theme !== 'light' && toggleTheme()}
                className={segmentOption(theme === 'light')}
                aria-pressed={theme === 'light'}
                aria-label="Modo claro"
              >
                <Sun size={16} />
              </button>
              <button
                type="button"
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={segmentOption(theme === 'dark')}
                aria-pressed={theme === 'dark'}
                aria-label="Modo escuro"
              >
                <Moon size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;