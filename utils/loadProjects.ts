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
const generateColor = (index: number): string => {
  const colors = [
    "#4338ca", // Indigo
    "#0284c7", // Sky
    "#c2410c", // Orange
    "#059669", // Emerald
    "#7c3aed", // Violet
    "#be185d", // Pink
    "#0891b2", // Cyan
    "#dc2626", // Red
  ];
  return colors[index % colors.length];
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
      const attrs = project.attributes || project; // Handle both flattened and nested
      const localizedTags = lang === 'pt' ? (attrs.tags_pt || attrs.tags) : (attrs.tags_en || attrs.tags);

      return {
        id: project.id,
        title: lang === 'pt' ? attrs.title_pt : attrs.title_en,
        description: lang === 'pt' ? attrs.description_pt : attrs.description_en,
        tags: localizedTags ? localizedTags.split(',').map((t: string) => t.trim()) : [],
        image: getUrl(attrs.thumbnail?.data?.attributes || attrs.thumbnail),
        color: attrs.color || generateColor(index),
        images: {
          thumbnail: getUrl(attrs.thumbnail?.data?.attributes || attrs.thumbnail),
          gallery: attrs.gallery?.data
            ? attrs.gallery.data.map((img: any) => getUrl(img.attributes || img))
            : (attrs.gallery ? attrs.gallery.map((img: any) => getUrl(img)) : []),
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
