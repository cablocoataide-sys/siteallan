import { useState, useEffect } from 'react';

interface TranslationCache {
  [key: string]: string;
}

const cache: TranslationCache = {};

/**
 * Traduz texto usando a API gratuita do Google Translate
 */
export const translateText = async (
  text: string,
  targetLang: 'en' | 'pt'
): Promise<string> => {
  if (!text || text.trim() === '') return text;
  
  // Se já está no idioma alvo, retorna o texto original
  const cacheKey = `${text}_${targetLang}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    // Usa a API gratuita do Google Translate via endpoint público
    const sourceLang = targetLang === 'en' ? 'pt' : 'en';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // A resposta vem em um formato aninhado: [[["texto traduzido", "texto original"]]]
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      const translated = data[0].map((item: any) => item[0]).join('');
      cache[cacheKey] = translated;
      return translated;
    }
    
    return text;
  } catch (error) {
    console.error('Erro ao traduzir:', error);
    return text;
  }
};

/**
 * Hook para traduzir múltiplos textos de uma vez
 */
export const useGoogleTranslate = (
  texts: { [key: string]: string },
  targetLang: 'en' | 'pt',
  enabled: boolean = true
) => {
  const [translations, setTranslations] = useState<{ [key: string]: string }>(texts);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!enabled || targetLang === 'pt') {
      setTranslations(texts);
      return;
    }

    const translateAll = async () => {
      setIsTranslating(true);
      const translated: { [key: string]: string } = {};

      // Traduz todos os textos em paralelo
      const promises = Object.entries(texts).map(async ([key, text]) => {
        translated[key] = await translateText(text, targetLang);
      });

      await Promise.all(promises);
      setTranslations(translated);
      setIsTranslating(false);
    };

    translateAll();
  }, [texts, targetLang, enabled]);

  return { translations, isTranslating };
};
