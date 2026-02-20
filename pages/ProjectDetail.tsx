import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Content } from '../types';
import { useMouseAngle } from '../hooks/useMouseAngle';
import { useProjectContext } from '../contexts/ProjectContext';
import { generateDarkColor, getTextColor, invertColor } from '../utils/colorTheme';

interface ProjectDetailProps {
  content: Content;
  theme: 'light' | 'dark';
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ content, theme }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);
  const angle = useMouseAngle(buttonRef);

  // Busca projeto pelo slug
  const project = content.projects.find(p => {
    const projectSlug = p.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return projectSlug === slug;
  });

  // Gera cores baseadas no tema
  const projectColor = project 
    ? (theme === 'dark' ? generateDarkColor(project.color) : project.color)
    : '#FFFFFF';
  
  const textColor = getTextColor(projectColor);
  const isDarkText = textColor === '#000000';
  
  // Cor invertida para a seção CTA (contraste com o tema da página)
  const ctaColor = invertColor(projectColor);
  const ctaTextColor = getTextColor(ctaColor);
  
  const { setProjectColors } = useProjectContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Define as cores do projeto no contexto
    if (project) {
      setProjectColors(projectColor, textColor);
    }
    
    // Limpa as cores quando sair da página
    return () => {
      setProjectColors(null, null);
    };
  }, [slug, project, projectColor, textColor, setProjectColors, theme]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Projeto não encontrado</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline"
          >
            Voltar para home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
      style={{ 
        backgroundColor: projectColor,
        color: textColor
      }}
    >
      {/* Hero do projeto - Título e descrição */}
      <section className="w-full px-4 sm:px-6 md:px-12 pt-44 md:pt-44 pb-12 md:pb-16">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.05] tracking-tighter">
              {project.title}
            </h1>

            {project.description && (
              <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed" style={{ opacity: 0.7 }}>
                {project.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm font-sans uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{ 
                    border: `1px solid ${textColor}`,
                    opacity: 0.8
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid de imagens e textos */}
      <section className="w-full px-4 sm:px-6 md:px-12 pb-24">
        <div className="projects-grid">

          {/* Vídeo do projeto Palae com overlay */}
          {project.id === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              id="video-container"
              className="w-full rounded-2xl overflow-hidden relative transition-all duration-500"
              style={{ 
                backgroundColor: `${textColor}10`,
                aspectRatio: '9/16',
                gridRow: 'span 2'
              }}
            >
              <video
                id="palae-video"
                src="/Docu-Case-Palae.mp4"
                className="w-full h-full object-contain"
                controls
                playsInline
                preload="metadata"
                onPlay={(e) => {
                  const overlay = document.getElementById('video-overlay');
                  if (overlay) overlay.style.display = 'none';
                }}
              >
                Seu navegador não suporta vídeos.
              </video>

              {/* Overlay com texto e botão */}
              <div
                id="video-overlay"
                className="absolute inset-0 flex flex-col items-start justify-start p-8 md:p-12 cursor-pointer transition-opacity duration-300"
                style={{ backgroundColor: `${projectColor}80` }}
                onClick={() => {
                  const video = document.getElementById('palae-video') as HTMLVideoElement;
                  if (video) {
                    video.play();
                  }
                }}
              >
                <div className="max-w-md">
                  <h2 
                    className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
                    style={{ color: textColor }}
                  >
                    {content.videoTitle}
                  </h2>
                  <p 
                    className="text-base md:text-lg leading-relaxed mb-8"
                    style={{ color: textColor, opacity: 0.9 }}
                  >
                    {content.videoDescription}
                  </p>
                  <button
                    className="px-8 py-4 border-2 font-sans text-sm font-bold rounded-full flex items-center gap-2 uppercase transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: textColor,
                      borderColor: textColor,
                      color: projectColor
                    }}
                  >
                    {content.videoButton}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {project.images?.gallery.map((imageSrc, index) => {
            const [isWide, setIsWide] = React.useState(false);

            // Detecta se a imagem é wide carregando suas dimensões
            React.useEffect(() => {
              const img = new Image();
              img.onload = () => {
                // Considera wide se a largura for pelo menos 1.5x a altura
                setIsWide(img.width / img.height >= 1.5);
              };
              img.src = imageSrc;
            }, [imageSrc]);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`w-full ${isWide ? 'aspect-[2/1] md:col-span-2' : 'aspect-square'} rounded-2xl overflow-hidden`}
                style={{ backgroundColor: `${textColor}10` }}
              >
                <img
                  src={imageSrc}
                  alt={`${project.title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </motion.div>
            );
          })}

          {/* Texto "Sobre o projeto" - inserido após a segunda imagem */}
          {project.about && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:col-span-2 py-8 md:py-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.aboutTitle}</h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-4xl whitespace-pre-line" style={{ opacity: 0.7 }}>
                {project.about}
              </p>
            </motion.div>
          )}

          {/* Texto "Resultados" */}
          {project.results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:col-span-2 py-8 md:py-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.resultsTitle}</h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-4xl whitespace-pre-line" style={{ opacity: 0.7 }}>
                {project.results}
              </p>
            </motion.div>
          )}



        </div>
      </section>

      {/* CTA Box - Fale Comigo */}
      <section className="w-full px-4 sm:px-6 md:px-12 pb-6 md:pb-8">
        <motion.div
          className="group relative w-full rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => window.open('https://wa.me/5543996312386', '_blank')}
          initial={{ backgroundColor: ctaColor }}
          whileHover={{
            backgroundColor: ctaTextColor,
            transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
          }}
          animate={{
            backgroundColor: ctaColor,
            transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
          }}
        >
          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-[300px] md:min-h-[400px] p-8 md:p-16 text-center md:text-left">
            <div>
              <span 
                className="text-sm md:text-base font-sans uppercase tracking-widest mb-4 block transition-colors duration-700 group-hover:opacity-90"
                style={{ color: `${ctaTextColor}B3` }}
              >
                {content.contactLabel}
              </span>

              <h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.05] tracking-tighter transition-colors duration-700"
                style={{ color: ctaTextColor }}
              >
                {content.contactHeading}
              </h2>

              <p 
                className="text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight transition-colors duration-700"
                style={{ color: `${ctaTextColor}E6` }}
              >
                {content.contactSubheading}
              </p>
            </div>

            {/* Botão com setinha que segue o mouse */}
            <div
              ref={buttonRef}
              className="mt-8 md:mt-0 flex items-center justify-center gap-4 px-8 py-5 border-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: ctaTextColor,
                borderColor: ctaTextColor
              }}
            >
              <span 
                className="text-lg md:text-xl font-bold font-sans transition-colors duration-300"
                style={{ color: ctaColor }}
              >
                {content.ctaButton}
              </span>
              <motion.div
                animate={{ rotate: angle }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: ctaColor }}
                  className="transition-colors duration-300"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Pattern decorativo */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          </div>
        </motion.div>
      </section>

      {/* Navegação para próximo projeto */}
      <section className="w-full px-4 sm:px-6 md:px-12 pb-24">
        <div className="w-full pt-4 md:pt-6">
          {(() => {
            const currentIndex = content.projects.findIndex(p => p.id === project.id);
            const nextIndex = (currentIndex + 1) % content.projects.length;
            const nextProject = content.projects[nextIndex];

            if (!nextProject) return null;

            const nextSlug = nextProject.title
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');

            const [isHovered, setIsHovered] = React.useState(false);

            return (
              <motion.button
                onClick={() => navigate(`/${nextSlug}`)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full rounded-2xl overflow-hidden block"
              >
                {/* Imagem de preview */}
                <div className="absolute inset-0">
                  <img
                    src={nextProject.image}
                    alt={nextProject.title}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay escuro sobre a imagem */}
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Camada de cor com fade progressivo */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  style={{ backgroundColor: nextProject.color }}
                />

                {/* Conteúdo */}
                <div className="relative z-10 flex flex-col items-center md:items-start justify-center min-h-[400px] md:min-h-[500px] p-8 md:p-16 text-center md:text-left">
                  <span className="text-sm md:text-base font-sans uppercase tracking-widest text-white/70 group-hover:text-white/90 mb-4 transition-colors duration-700">
                    {content.nextProject}
                  </span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tighter">
                    {nextProject.title}
                  </h2>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                    {nextProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs md:text-sm font-sans uppercase tracking-widest border border-white/40 group-hover:border-white/60 px-3 py-1 rounded-full text-white transition-all duration-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Botão Ver projeto - igual da home */}
                  <div className="px-8 py-4 bg-white border-2 border-white text-black font-sans text-sm font-bold rounded-full flex items-center gap-2 uppercase hover:bg-transparent hover:text-white transition-all duration-300">
                    {content.viewProject}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })()}
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;
