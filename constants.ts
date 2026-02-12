import { Content, Project } from './types';

const projectsEn: Project[] = [
  {
    id: 1,
    title: "Fintech Mobile App",
    description: "End-to-end UI/UX for a digital banking product",
    category: "Product Design",
    tags: ["Product Design", "Fintech", "Mobile App"],
    image: "https://picsum.photos/800/800?random=1",
    color: "#4338ca", // Indigo
    link: "https://google.com"
  },
  {
    id: 2,
    title: "Healthcare SaaS Platform",
    description: "Scalable interface system for a medical product",
    category: "UI/UX",
    tags: ["UI/UX", "SaaS", "Healthcare"],
    image: "https://picsum.photos/800/800?random=2",
    color: "#0284c7", // Sky
    link: "https://google.com"
  },
  {
    id: 3,
    title: "Meet & Meat",
    description: "Brand identity and visual system for a restaurant",
    category: "Branding",
    tags: ["Branding", "Visual Identity", "Strategy"],
    image: "https://picsum.photos/800/800?random=3",
    color: "#c2410c", // Orange
    link: "https://google.com"
  },
  {
    id: 4,
    title: "E-commerce Redesign",
    description: "UX optimization and visual refresh",
    category: "Product Design",
    tags: ["UX Research", "Web Design", "E-commerce"],
    image: "https://picsum.photos/800/800?random=4",
    color: "#059669", // Emerald
    link: "https://google.com"
  },
  {
    id: 5,
    title: "Creative Studio Identity",
    description: "Naming, logo and brand system",
    category: "Visual Identity",
    tags: ["Logo Design", "Branding", "Art Direction"],
    image: "https://picsum.photos/800/800?random=5",
    color: "#7c3aed", // Violet
    link: "https://google.com"
  },
  {
    id: 6,
    title: "Astrology Digital Product",
    description: "Visual identity and interface for a content-based product",
    category: "Brand + UI",
    tags: ["App Design", "Content Strategy", "Visuals"],
    image: "https://picsum.photos/800/800?random=6",
    color: "#be185d", // Pink
    link: "https://google.com"
  }
];

const projectsPt: Project[] = [
  {
    id: 1,
    title: "App Fintech",
    description: "UI/UX completo para um produto bancário digital",
    category: "Product Design",
    tags: ["Product Design", "Fintech", "App Mobile"],
    image: "https://picsum.photos/800/800?random=1",
    color: "#4338ca",
    link: "https://google.com"
  },
  {
    id: 2,
    title: "Plataforma SaaS Saúde",
    description: "Sistema de interface escalável para produto médico",
    category: "UI/UX",
    tags: ["UI/UX", "SaaS", "Saúde"],
    image: "https://picsum.photos/800/800?random=2",
    color: "#0284c7",
    link: "https://google.com"
  },
  {
    id: 3,
    title: "Meet & Meat",
    description: "Identidade visual e sistema para restaurante",
    category: "Branding",
    tags: ["Branding", "Identidade Visual", "Estratégia"],
    image: "https://picsum.photos/800/800?random=3",
    color: "#c2410c",
    link: "https://google.com"
  },
  {
    id: 4,
    title: "Redesign E-commerce",
    description: "Otimização de UX e renovação visual",
    category: "Product Design",
    tags: ["UX Research", "Web Design", "E-commerce"],
    image: "https://picsum.photos/800/800?random=4",
    color: "#059669",
    link: "https://google.com"
  },
  {
    id: 5,
    title: "Identidade Creative Studio",
    description: "Naming, logo e sistema de marca",
    category: "Identidade Visual",
    tags: ["Logo Design", "Branding", "Direção de Arte"],
    image: "https://picsum.photos/800/800?random=5",
    color: "#7c3aed",
    link: "https://google.com"
  },
  {
    id: 6,
    title: "Produto Digital Astrologia",
    description: "Identidade visual e interface para produto de conteúdo",
    category: "Brand + UI",
    tags: ["App Design", "Estratégia de Conteúdo", "Visual"],
    image: "https://picsum.photos/800/800?random=6",
    color: "#be185d",
    link: "https://google.com"
  }
];

const tagsEn = [
  "UI", "UX", "Digital Products", "Branding", "Visual Identity", "Strategy", "Web Design", "Art Direction", "Motion", "Prototyping", "Design Systems", "Framer", "Consulting", "Mobile First", "User Research"
];

const tagsPt = [
  "UI", "UX", "Produtos Digitais", "Branding", "Identidade Visual", "Estratégia", "Web Design", "Direção de Arte", "Motion", "Prototipagem", "Design System", "Framer", "Consultoria", "Mobile First", "User Research"
];

export const CONTENT: Record<'en' | 'pt', Content> = {
  en: {
    role: "Product & Brand Designer",
    heroHeadline: "Constructing clarity",
    heroSub: "from chaos.",
    heroTags: tagsEn,
    projectsTitle: "Selected work",
    projectsSub: "Selected Work",
    footerHeadline: "Let's build something meaningful together.",
    footerAbout: "Call me Allan Rolim, Product Designer focused on clear interfaces and timeless visual identities uniting strategy, form and purpose worldwide.",
    ctaButton: "Fale comigo",
    ctaSub: "Start a conversation",
    location: "Based in Brazil, working remotely worldwide.",
    marqueeText1: "Based in Brazil",
    marqueeText2: "Available Worldwide",
    projects: projectsEn
  },
  pt: {
    role: "Product & Brand Designer",
    heroHeadline: "Construindo\nclareza através\ndo caos.",
    heroSub: "",
    heroTags: tagsPt,
    projectsTitle: "Trabalhos selecionados",
    projectsSub: "Trabalhos Selecionados",
    footerHeadline: "Vamos construir algo significativo juntos.",
    footerAbout: "Me chame de Allan Rolim, Product Designer focado em interfaces claras e identidades visuais atemporais que unem estratégia, forma e propósito.",
    ctaButton: "Fale comigo",
    ctaSub: "Inicie uma conversa",
    location: "Baseado no Brasil, trabalhando remotamente para o mundo.",
    marqueeText1: "Baseado no Brasil",
    marqueeText2: "Disponível Globalmente",
    projects: projectsPt
  }
};