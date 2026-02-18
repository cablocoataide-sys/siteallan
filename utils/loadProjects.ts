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

  try {
    const response = await fetchFromStrapi('/api/projects?populate=*&sort=order:asc');
    console.log('Resposta bruta Strapi:', response);
    const data = response.data;

    return data.map((project: any, index: number) => {
      // Strapi v5 returns flat objects (no attributes wrapper)
      // Strapi v4 returns { id, attributes: { ... } }
      const attrs = project.attributes || project;
      const localizedTags = lang === 'pt' ? (attrs.tags_pt || attrs.tags) : (attrs.tags_en || attrs.tags);

      // Handle both Strapi v4 (thumbnail.data.attributes) and v5 (thumbnail directly)
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

      return {
        id: project.id,
        title: lang === 'pt' ? attrs.title_pt : attrs.title_en,
        description: lang === 'pt' ? attrs.description_pt : attrs.description_en,
        tags: localizedTags ? localizedTags.split(',').map((t: string) => t.trim()) : [],
        image: getUrl(thumbnailMedia),
        color: attrs.color || generateColor(index),
        images: {
          thumbnail: getUrl(thumbnailMedia),
          gallery: getGalleryUrls(attrs.gallery),
        },
        about: lang === 'pt' ? attrs.about_pt : attrs.about_en,
        results: lang === 'pt' ? attrs.results_pt : attrs.results_en,
      };
    });
  } catch (error) {
    console.error('Erro ao carregar projetos do Strapi:', error);
    // Fallback para JSON local se Strapi falhar
    try {
      const response = await fetch('/projects.json');
      const data = await response.json();
      if (!data.projects) return [];
      return data.projects.map((project: any, index: number) => ({
        id: project.id || index + 1,
        title: project.title[lang],
        description: project.description[lang],
        tags: project.tags,
        image: project.images.thumbnail,
        color: generateColor(index),
        images: project.images,
        about: project.about[lang],
        results: project.results[lang],
      }));
    } catch {
      return [];
    }
  }
};
