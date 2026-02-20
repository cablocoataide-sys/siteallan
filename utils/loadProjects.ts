import { Project } from '../types';
import { fetchFromStrapi, STRAPI_URL } from './strapi';

interface StrapiProject {
  id: number;
  documentId: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  tags: string; // Strapi usually returns simple text or relation, assuming comma separated string or Relation for now, but let's assume text for simplicity in initial setup or we can adjust. Actually let's assume it's a JSON component or just a text field we split.
  // Let's stick to the plan: map Strapi response.
  // We need to define the structure we EXPECT from Strapi.
  // flexible approach: key-value pairs
  [key: string]: any;
}

// Função para gerar cor baseada no ID do projeto
const generateColor = (_index: number): string => {
  return "#0000FF"; // Cor padrão azul
};

export const loadProjects = async (lang: 'pt' | 'en'): Promise<Project[]> => {
  const getUrl = (media: any) => {
    if (!media) return '';
    const url = media.url;
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
  };

  // 1. Tentar carregar do JSON local primeiro (SSG)
  // Isso evita o lag do Strapi "acordando" no Render
  try {
    const response = await fetch('/projects.json');
    if (response.ok) {
      const data = await response.json();
      if (data.projects && data.projects.length > 0) {
        console.log('Projetos carregados do cache local (SSG):', data.projects.length);
        return data.projects.map((project: any, index: number) => ({
          ...project,
          title: typeof project.title === 'object' ? project.title[lang] : project.title,
          description: typeof project.description === 'object' ? project.description[lang] : project.description,
          tags: typeof project.tags === 'object' ? project.tags[lang] : project.tags,
          about: typeof project.about === 'object' ? project.about[lang] : project.about,
          results: typeof project.results === 'object' ? project.results[lang] : project.results,
        }));
      }
    }
  } catch (e) {
    console.warn('Falha ao carregar projects.json local, tentando Strapi...', e);
  }

  // 2. Fallback para Strapi (se o JSON local não existir ou estiver vazio)
  try {
    const response = await fetchFromStrapi('/api/projects?populate=*&sort=order:asc');
    console.log('Resposta bruta Strapi:', response);
    const data = response.data;

    const mappedProjects = data.map((project: any, index: number) => {
      try {
        const attrs = project.attributes || project;
        const localizedTags = lang === 'pt' ? (attrs.tags_pt || attrs.tags) : (attrs.tags_en || attrs.tags);

        const getThumbnailMedia = (thumbnail: any) => {
          if (!thumbnail) return null;
          if (thumbnail.data?.attributes) return thumbnail.data.attributes; // v4
          if (thumbnail.url) return thumbnail; // v5 flat
          return null;
        };

        const thumbnailMedia = getThumbnailMedia(attrs.thumbnail);

        const getGalleryUrls = (gallery: any): string[] => {
          if (!gallery) return [];
          if (Array.isArray(gallery.data)) return gallery.data.map((img: any) => getUrl(img.attributes || img)); // v4
          if (Array.isArray(gallery)) return gallery.map((img: any) => getUrl(img)); // v5 flat
          return [];
        };

        const mapped = {
          id: project.id,
          title: (lang === 'pt' ? attrs.title_pt : attrs.title_en) || attrs.title || 'Sem título',
          description: (lang === 'pt' ? attrs.description_pt : attrs.description_en) || attrs.description || '',
          tags: typeof localizedTags === 'string' ? localizedTags.split(',').map((t: string) => t.trim()) : [],
          image: getUrl(thumbnailMedia),
          color: attrs.color || generateColor(index),
          images: {
            thumbnail: getUrl(thumbnailMedia),
            gallery: getGalleryUrls(attrs.gallery),
          },
          about: lang === 'pt' ? attrs.about_pt : attrs.about_en,
          results: lang === 'pt' ? attrs.results_pt : attrs.results_en,
        };
        return mapped;
      } catch (e) {
        console.error('Erro ao mapear projeto:', project.id, e);
        return null;
      }
    }).filter(Boolean);

    console.log('Mapeamento concluído (Strapi):', mappedProjects);
    return mappedProjects;
  } catch (error) {
    console.error('Erro ao carregar projetos do Strapi:', error);
    return [];
  }
};
