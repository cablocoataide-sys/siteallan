import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { CONTENT } from './constants';
import { loadProjects } from './utils/loadProjects';
import { Theme, Language, Content } from './types';

const App: React.FC = () => {
  // Inicializa tema considerando:
  // 1) preferência salva
  // 2) tema do sistema
  // 3) horário local (dia/noite aproximado)
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';

    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) return 'dark';

    const hour = new Date().getHours();
    // Aproximação simples de luz solar: 7h às 18h
    return (hour >= 7 && hour < 18) ? 'light' : 'dark';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lang, setLang] = useState<Language>('pt');
  const [currentContent, setCurrentContent] = useState<Content>(CONTENT[lang]);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega projetos do JSON
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const projects = await loadProjects(lang);
      console.log('Projetos carregados:', projects);
      setCurrentContent({
        ...CONTENT[lang],
        projects: projects || []
      });
      setIsLoading(false);
    };

    fetchProjects();
  }, [lang]);

  // Handle Theme Toggle + persistência
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');

    if (theme === 'dark') {
      root.classList.add('dark');
    }

    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignora erro de storage (ex: modo privado restrito)
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="min-h-screen w-full bg-stone-50 dark:bg-stone-950 selection:bg-[#0000FF] selection:text-white transition-all duration-300">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          lang={lang}
          setLang={setLang}
          content={currentContent}
        />

        <AnimatePresence mode="wait">
          <motion.main
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <Routes>
              <Route path="/" element={<Home content={currentContent} />} />
              <Route path="/:slug" element={<ProjectDetail content={currentContent} />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;