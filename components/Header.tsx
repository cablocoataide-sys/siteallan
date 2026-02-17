import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Theme, Language, Content } from '../types';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

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

  // Transformations based on scroll position (0px to 200px)
  const containerPadding = useTransform(scrollY, [0, 200], ["3.4rem", "1.275rem"]);
  const fontSize = useTransform(scrollY, [0, 200], ["2.1rem", "1.25rem"]);
  const lineHeight = useTransform(scrollY, [0, 200], ["1.1", "1.5"]);
  // Bolinha proporcional ao tamanho da fonte (aproximadamente altura das maiúsculas)
  const ballSize = useTransform(scrollY, [0, 200], ["1.6rem", "1rem"]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const segmentStyle = "h-9 rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-sm flex items-center p-0.5";
  const segmentOption = (active: boolean) =>
    `flex-1 min-w-[2.5rem] h-full rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all cursor-pointer ${active
      ? "bg-stone-200/90 dark:bg-stone-700/90 text-stone-900 dark:text-stone-50"
      : "text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        paddingTop: containerPadding,
        paddingBottom: containerPadding,
        borderBottomColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderBottomWidth: 0
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      {/* Container interno com padding fixo */}
      <div className="w-full px-4 md:px-12 flex justify-between items-center gap-4">
        {/* Logo: bolinha azul + Allan Rolim / Voltar com transição suave */}
        <div className="flex items-center gap-[0.5em] flex-shrink-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-[0.5em] group cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {location.pathname !== '/' && (
                  <motion.div
                    key="back-arrow"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              <BrandLogo
                fontSize={fontSize}
                lineHeight={lineHeight}
                ballSize={ballSize}
                isHome={location.pathname === '/'}
                content={content}
                layoutId="main-logo"
              />
            </div>
          </button>
        </div>

        {/* Controls - suaves e no tema */}
        <div className="flex items-center gap-2 md:gap-3 font-sans flex-shrink-0">

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
        </div>
      </div>
    </motion.header>
  );
};

export default Header;