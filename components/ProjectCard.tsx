import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [averageColor, setAverageColor] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  // Calcula a cor média da imagem de fundo (best effort, com fallback)
  const handleImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;

    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      const { naturalWidth, naturalHeight } = img;
      if (!naturalWidth || !naturalHeight) return;

      // Reduz resolução para performance
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

      // Amostras espaçadas para acelerar
      const step = 4 * 5; // a cada 5 pixels
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
      // Caso CORS ou outro erro bloqueie o canvas, mantemos a cor fixa do projeto
      if (!averageColor) {
        setAverageColor(project.color);
      }
    }
  };

  // Garante que sempre haja alguma cor mesmo se a imagem não carregar
  useEffect(() => {
    if (!averageColor) {
      setAverageColor(project.color);
    }
  }, [averageColor, project.color]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px', amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={{
        borderRadius: "50%",
        scale: 1.02,
        transition: {
          duration: 0.8,
          ease: [0.19, 1, 0.22, 1]
        }
      }}
      animate={{
        borderRadius: "1rem",
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.19, 1, 0.22, 1]
        }
      }}
      className="relative aspect-square w-full min-w-0 overflow-hidden cursor-pointer group bg-stone-200 dark:bg-stone-900"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={() => setAverageColor(project.color)}
        />
      </div>

      {/* Camada de cor com fade progressivo */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        style={{ 
          backgroundColor: averageColor ?? project.color
        }}
      />

      {/* Conteúdo que aparece no hover */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
        <div className="text-white mix-blend-normal flex flex-col items-center">
          <h3 className="text-3xl md:text-5xl font-sans font-bold mb-6 leading-[1.05] tracking-tighter transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
            {project.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-xs transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 ease-out">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs md:text-sm font-sans uppercase tracking-widest border border-white/40 px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Botão "ver projeto" */}
          <button className="mt-6 px-8 py-4 bg-white border-2 border-white text-black hover:bg-transparent hover:border-white hover:text-white font-sans text-sm font-bold rounded-full flex items-center gap-2 uppercase transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300 ease-out">
            VER PROJETO
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
