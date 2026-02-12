import { Project } from '../types';
import { client, urlFor } from '../sanity.config';

interface SanityProject {
  _id: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  tags: string[];
  thumbnail: any;
  gallery: Array<{
    _key: string;
    asset: any;
    type?: 'square' | 'wide';
    alt?: string;
  }>;
  about: { pt: string; en: string };
  results: { pt: string; en: string };
  order: number;
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
    const query = `*[_type == "project"] | order(order asc) {
      _id,
      title,
      description,
      tags,
      thumbnail,
      gallery,
      about,
      results,
      order
    }`;
    
    const data: SanityProject[] = await client.fetch(query);
    
    return data.map((project, index) => ({
      id: index + 1,
      title: project.title[lang],
      description: project.description[lang],
      tags: project.tags,
      image: urlFor(project.thumbnail).width(1080).height(1080).url(),
      color: generateColor(index),
      images: {
        thumbnail: urlFor(project.thumbnail).width(1080).height(1080).url(),
        gallery: project.gallery.map((img) => 
          urlFor(img.asset)
            .width((img.type === 'wide') ? 2160 : 1080)
            .height(1080)
            .url()
        ),
      },
      about: project.about[lang],
      results: project.results[lang],
    }));
  } catch (error) {
    console.error('Erro ao carregar projetos do Sanity:', error);
    // Fallback para JSON local se Sanity falhar
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
