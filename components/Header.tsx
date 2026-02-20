import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Theme, Language, Content } from '../types';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// AnimatePresence still used for h1 text transition

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  content: Content;
  projectColor: string | null;
  projectTextColor: string | null;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, lang, setLang, content, projectColor, projectTextColor }) => {
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

  const segmentStyle = `h-9 rounded-full border flex items-center p-0.5 backdrop-blur-sm`;
  const segmentOption = (active: boolean) =>
    `flex-1 min-w-[2.5rem] h-full rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all cursor-pointer ${
      active ? "" : "hover:opacity-70"
    }`;

  // Cores dinâmicas baseadas no projeto ou tema padrão
  const bgColor = projectColor 
    ? `${projectColor}B3` // 70% opacidade
    : isScrolled 
      ? (theme === 'dark' ? 'rgba(28, 25, 23, 0.7)' : 'rgba(255, 255, 255, 0.7)')
      : 'transparent';
  
  const textColorValue = projectTextColor || (theme === 'dark' ? '#ffffff' : '#000000');
  const borderColor = projectTextColor 
    ? `${projectTextColor}33` // 20% opacidade
    : theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
  
  const activeBg = projectTextColor 
    ? `${projectTextColor}26` // 15% opacidade
    : theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        paddingTop: containerPadding,
        paddingBottom: containerPadding,
        backgroundColor: bgColor,
        color: textColorValue
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl"
    >
      {/* Container interno com padding fixo */}
      <div className="w-full px-4 md:px-12 flex justify-between items-center gap-4">
        {/* Logo: bolinha + Allan Rolim / Voltar com transição suave */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-[0.5em] group cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <motion.div
            style={{ 
              width: ballSize, 
              height: ballSize,
              backgroundColor: projectColor ? textColorValue : '#0000FF'
            }}
            className="rounded-full shrink-0 flex items-center justify-center overflow-hidden"
            layout
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <AnimatePresence mode="wait">
              {location.pathname !== '/' && (
                <motion.svg
                  key="arrow"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  width="50%"
                  height="50%"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={projectColor || "white"}
                  strokeWidth="2.5"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="font-sans font-bold tracking-tighter whitespace-nowrap"
                style={{ 
                  fontSize, 
                  lineHeight,
                  color: textColorValue
                }}
              >
                {location.pathname === '/' ? 'Allan Rolim' : content.back}
              </motion.h1>
            </AnimatePresence>
          </div>
        </button>

        {/* Controls - suaves e no tema */}
        <div className="flex items-center gap-2 md:gap-3 font-sans flex-shrink-0">

          {/* Language: BR | EN ratio */}
          <div className={segmentStyle} style={{ borderColor, backgroundColor: `${textColorValue}0D` }}>
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={segmentOption(lang === 'pt')}
              style={lang === 'pt' ? { backgroundColor: activeBg, color: textColorValue } : { color: `${textColorValue}99` }}
              aria-pressed={lang === 'pt'}
            >
              BR
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={segmentOption(lang === 'en')}
              style={lang === 'en' ? { backgroundColor: activeBg, color: textColorValue } : { color: `${textColorValue}99` }}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>

          {/* Theme: Light | Dark ratio */}
          <div className={segmentStyle} style={{ borderColor, backgroundColor: `${textColorValue}0D` }}>
            <button
              type="button"
              onClick={() => theme !== 'light' && toggleTheme()}
              className={segmentOption(theme === 'light')}
              style={theme === 'light' ? { backgroundColor: activeBg, color: textColorValue } : { color: `${textColorValue}99` }}
              aria-pressed={theme === 'light'}
              aria-label="Modo claro"
            >
              <Sun size={16} />
            </button>
            <button
              type="button"
              onClick={() => theme !== 'dark' && toggleTheme()}
              className={segmentOption(theme === 'dark')}
              style={theme === 'dark' ? { backgroundColor: activeBg, color: textColorValue } : { color: `${textColorValue}99` }}
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