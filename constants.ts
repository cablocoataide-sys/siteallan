import { Content, Project } from './types';

const projectsEn: Project[] = [];

const projectsPt: Project[] = [];

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
    ctaButton: "Get in touch",
    ctaSub: "Start a conversation",
    location: "Based in Brazil, working remotely worldwide.",
    marqueeText1: "Based in Brazil",
    marqueeText2: "Available Worldwide",
    projects: projectsEn,
    viewProject: "View Project",
    aboutTitle: "About the project",
    resultsTitle: "Results",
    nextProject: "Next project",
    notFoundTitle: "Project not found",
    backToHome: "Back to home",
    contactHeading: "Liked the project?",
    contactSubheading: "Let's talk about yours.",
    contactLabel: "Let's work together",
    back: "Back"
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
    projects: projectsPt,
    viewProject: "Ver Projeto",
    aboutTitle: "Sobre o projeto",
    resultsTitle: "Resultados",
    nextProject: "Próximo projeto",
    notFoundTitle: "Projeto não encontrado",
    backToHome: "Voltar para home",
    contactHeading: "Gostou do projeto?",
    contactSubheading: "Vamos conversar sobre o seu.",
    contactLabel: "Vamos trabalhar juntos",
    back: "Voltar"
  }
};