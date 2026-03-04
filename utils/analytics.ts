// Google Analytics 4 (GA4)
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Inicializa o Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics ID não configurado');
    return;
  }

  // Carrega o script do GA4
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Inicializa o dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    // Sem anonimização - rastreamento completo
    send_page_view: true,
  });
};

// Rastreia visualização de página
export const trackPageView = (url: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Rastreia eventos customizados
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Eventos específicos do portfolio
export const trackProjectView = (projectTitle: string) => {
  trackEvent('view_project', 'Projects', projectTitle);
};

export const trackProjectClick = (projectTitle: string) => {
  trackEvent('click_project', 'Projects', projectTitle);
};

export const trackContactClick = (location: string) => {
  trackEvent('click_contact', 'Contact', location);
};

export const trackLanguageChange = (language: string) => {
  trackEvent('change_language', 'Settings', language);
};

export const trackThemeChange = (theme: string) => {
  trackEvent('change_theme', 'Settings', theme);
};

export const trackVideoPlay = (projectTitle: string) => {
  trackEvent('play_video', 'Media', projectTitle);
};
