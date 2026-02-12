export type Language = 'en' | 'pt';
export type Theme = 'light' | 'dark';
export type FontStyle = 'sans' | 'serif';

export interface Project {
  id: number;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  image: string;
  color: string;
  link?: string;
  images?: {
    thumbnail: string;
    gallery: string[];
  };
  about?: string;
  results?: string;
}

export interface Content {
  role: string;
  heroHeadline: string;
  heroSub: string;
  heroTags: string[];
  projectsTitle: string;
  projectsSub: string;
  footerHeadline: string;
  footerAbout: string;
  ctaButton: string;
  ctaSub: string;
  location: string;
  marqueeText1: string;
  marqueeText2: string;
  projects: Project[];
}