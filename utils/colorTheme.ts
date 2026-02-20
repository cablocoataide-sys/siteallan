import { formatHex, oklch, parse } from 'culori';

/**
 * Gera uma versão dark de uma cor usando OKLCH
 * Reduz a luminosidade mantendo matiz e croma
 */
export const generateDarkColor = (hexColor: string): string => {
  try {
    // Converte para OKLCH
    const color = parse(hexColor);
    if (!color) return hexColor;
    
    const oklchColor = oklch(color);
    if (!oklchColor) return hexColor;
    
    // Reduz a luminosidade para criar versão dark
    // Mantém matiz (h) e croma (c), ajusta apenas lightness (l)
    const darkColor = {
      ...oklchColor,
      l: Math.max(0.15, oklchColor.l * 0.35) // Reduz para ~35% da luminosidade original, mínimo 15%
    };
    
    return formatHex(darkColor);
  } catch (error) {
    console.error('Erro ao gerar cor dark:', error);
    return hexColor;
  }
};

/**
 * Inverte a cor (versão negativa) usando OKLCH
 * Se a cor é clara, retorna escura. Se é escura, retorna clara.
 */
export const invertColor = (hexColor: string): string => {
  try {
    const color = parse(hexColor);
    if (!color) return '#000000';
    
    const oklchColor = oklch(color);
    if (!oklchColor) return '#000000';
    
    // Inverte a luminosidade
    const invertedColor = {
      ...oklchColor,
      l: 1 - oklchColor.l // Inverte: claro vira escuro, escuro vira claro
    };
    
    return formatHex(invertedColor);
  } catch (error) {
    console.error('Erro ao inverter cor:', error);
    return '#000000';
  }
};

/**
 * Calcula luminância e determina cor do texto (preto ou branco)
 */
export const getTextColor = (hexColor: string): string => {
  try {
    const hex = hexColor.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Calcula luminância relativa (WCAG)
    const luminance = 0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) +
                     0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) +
                     0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4));
    
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  } catch (error) {
    console.error('Erro ao calcular cor do texto:', error);
    return '#000000';
  }
};
