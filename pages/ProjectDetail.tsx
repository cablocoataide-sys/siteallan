import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Content } from '../types';
import { useMouseAngle } from '../hooks/useMouseAngle';

interface ProjectDetailProps {
  content: Content;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ content }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);
  const angle = useMouseAngle(buttonRef);
  
  const project = content.projects.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
            
            <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 mb-8 max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm font-sans uppercase tracking-widest border border-stone-300 dark:border-stone-700 px-4 py-2 rounded-full"
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
          
          {project.images?.gallery.map((imageSrc, index) => {
            const isWide = imageSrc.includes('wide');
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`w-full ${isWide ? 'aspect-[2/1] md:col-span-2' : 'aspect-square'} rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800`}
              >
                <img
                  src={imageSrc}
                  alt={`${project.title} - ${index + 1}`}
                  className="w-full h-full object-cover"
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
              style={{ order: 2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre o projeto</h2>
              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-4xl whitespace-pre-line">
                {project.about}
              </p>
            </motion.div>
          )}

          {/* Texto "Resultados" - no final */}
          {project.results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:col-span-2 py-4 md:py-6"
              style={{ order: 999 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Resultados</h2>
              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-4xl whitespace-pre-line">
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
          initial={{ backgroundColor: '#0000FF' }}
          whileHover={{ 
            backgroundColor: '#000000',
            transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
          }}
          animate={{ 
            backgroundColor: '#0000FF',
            transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
          }}
        >
          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-[300px] md:min-h-[400px] p-8 md:p-16 text-center md:text-left">
            <div>
              <span className="text-sm md:text-base font-sans uppercase tracking-widest text-white/70 group-hover:text-white/90 mb-4 block transition-colors duration-700">
                Vamos trabalhar juntos
              </span>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.05] tracking-tighter">
                Gostou do projeto?
              </h2>
              
              <p className="text-2xl md:text-3xl font-bold text-white/90 leading-[1.1] tracking-tight">
                Vamos conversar sobre o seu.
              </p>
            </div>

            {/* Botão com setinha que segue o mouse */}
            <div 
              ref={buttonRef}
              className="mt-8 md:mt-0 flex items-center justify-center gap-4 px-8 py-5 bg-white hover:bg-transparent border-2 border-white rounded-full transition-all duration-300 group/button"
            >
              <span className="text-lg md:text-xl font-bold text-[#0000FF] group-hover/button:text-white font-sans transition-colors duration-300">
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
                  className="text-[#0000FF] group-hover/button:text-white transition-colors duration-300"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
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
            const nextId = project.id < content.projects.length ? project.id + 1 : 1;
            const nextProject = content.projects.find(p => p.id === nextId);
            
            if (!nextProject) return null;

            const [isHovered, setIsHovered] = React.useState(false);
            const [averageColor, setAverageColor] = React.useState<string>(nextProject.color);
            const imgRef = React.useRef<HTMLImageElement>(null);

            const handleImageLoad = () => {
              const img = imgRef.current;
              if (!img) return;

              try {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!context) return;

                const { naturalWidth, naturalHeight } = img;
                if (!naturalWidth || !naturalHeight) return;

                const targetWidth = 80;
                const scale = targetWidth / naturalWidth;
                canvas.width = targetWidth;
                canvas.height = Math.max(1, Math.floor(naturalHeight * scale));

                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                let r = 0;
                let g = 0;
                let b = 0;
                let count = 0;

                const step = 4 * 5;
                for (let i = 0; i < data.length; i += step) {
                  r += data[i];
                  g += data[i + 1];
                  b += data[i + 2];
                  count++;
                }

                if (!count) return;
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);

                setAverageColor(`rgb(${r}, ${g}, ${b})`);
              } catch {
                setAverageColor(nextProject.color);
              }
            };

            return (
              <motion.button
                onClick={() => navigate(`/project/${nextId}`)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full rounded-2xl overflow-hidden block"
              >
                {/* Imagem de preview */}
                <div className="absolute inset-0">
                  <img
                    ref={imgRef}
                    src={nextProject.image}
                    alt={nextProject.title}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                  />
                  {/* Overlay escuro sobre a imagem */}
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Camada de cor com fade progressivo */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  style={{ backgroundColor: averageColor }}
                />

                {/* Conteúdo */}
                <div className="relative z-10 flex flex-col items-center md:items-start justify-center min-h-[400px] md:min-h-[500px] p-8 md:p-16 text-center md:text-left">
                  <span className="text-sm md:text-base font-sans uppercase tracking-widest text-white/70 group-hover:text-white/90 mb-4 transition-colors duration-700">
                    Próximo projeto
                  </span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tighter">
                    {nextProject.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 group-hover:text-white mb-6 max-w-2xl transition-colors duration-700">
                    {nextProject.description}
                  </p>
                  
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
                    VER PROJETO
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
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
