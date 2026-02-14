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
  try {
    // Populate * to get images and relations
    const response = await fetchFromStrapi('/api/projects?populate=*&sort=order:asc');
    const data = response.data;

    return data.map((item: any, index: number) => {
      const project = item; // Strapi v5 structure might be different, assuming v4/v5 standard response
      // Strapi Data access depends on version. fetchFromStrapi returns json.
      // responding to typical Strapi structure: { data: [ { id, attributes: { ... } } ] } (v4)
      // or { data: [ { id, ... } ] } (v5 with flat simplified response? No, usually attributes in v4).
      // Let's assume v5 or flattened. If v4, we need item.attributes.
      // Let's try to handle both or assume standard.
      // Going with a flatter structure assumption or checking.
      const attrs = project.attributes || project;

      return {
        id: item.id,
        title: lang === 'pt' ? attrs.title_pt : attrs.title_en,
        description: lang === 'pt' ? attrs.description_pt : attrs.description_en,
        tags: attrs.tags ? attrs.tags.split(',').map((t: string) => t.trim()) : [],
        image: attrs.thumbnail?.data ? `${STRAPI_URL}${attrs.thumbnail.data.attributes?.url || attrs.thumbnail.data.url}` : '',
        color: generateColor(index),
        images: {
          thumbnail: attrs.thumbnail?.data ? `${STRAPI_URL}${attrs.thumbnail.data.attributes?.url || attrs.thumbnail.data.url}` : '',
          gallery: attrs.gallery?.data ? attrs.gallery.data.map((img: any) =>
            `${STRAPI_URL}${img.attributes?.url || img.url}`
          ) : [],
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
      return data.projects.map((project: any, index: number) => ({
        id: index + 1,
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
