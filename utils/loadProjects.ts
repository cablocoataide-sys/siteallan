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
      return {
        id: project.id,
        title: lang === 'pt' ? project.title_pt : project.title_en,
        description: lang === 'pt' ? project.description_pt : project.description_en,
        tags: project.tags ? project.tags.split(',').map((t: string) => t.trim()) : [],
        image: getUrl(project.thumbnail),
        color: generateColor(index),
        images: {
          thumbnail: getUrl(project.thumbnail),
          gallery: project.gallery ? project.gallery.map((img: any) => getUrl(img)) : [],
        },
        about: lang === 'pt' ? project.about_pt : project.about_en,
        results: lang === 'pt' ? project.results_pt : project.results_en,
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
