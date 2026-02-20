import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  viewProjectLabel: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, viewProjectLabel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  // Transições ultra suaves e satisfatórias
  const cardTransition = {
    duration: 0.7,
    ease: [0.19, 1, 0.22, 1], // Easing mais suave
    type: "tween"
  };

  const imageTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
    type: "tween"
  };

  const overlayTransition = {
    duration: 0.6,
    ease: [0.33, 1, 0.68, 1],
    type: "tween"
  };

  const contentTransition = {
    duration: 0.6,
    ease: [0.33, 1, 0.68, 1],
    type: "tween"
  };

  const variants = {
    initial: {
      opacity: 0,
      y: 32,
      borderRadius: 24
    },
    visible: {
      opacity: 1,
      y: 0,
      borderRadius: 24,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as any,
        delay: index * 0.08
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="visible"
      animate={{
        borderRadius: isHovered ? 400 : 24,
        scale: isHovered ? 1.03 : 1,
        y: isHovered ? -8 : 0
      }}
      transition={cardTransition as any}
      viewport={{ once: true, margin: '0px 0px -80px 0px', amount: 0.1 }}
      className="relative aspect-square w-full min-w-0 overflow-hidden cursor-pointer group bg-stone-200 dark:bg-stone-900 will-change-transform"
      style={{
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
          : '0 0 0 0 rgba(0, 0, 0, 0)'
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem de fundo com zoom suave */}
      <motion.div 
        className="absolute inset-0 w-full h-full will-change-transform"
        animate={{
          scale: isHovered ? 1.15 : 1
        }}
        transition={imageTransition as any}
      >
        <img
          src={project.image}
          alt={project.title}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay com gradiente suave */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.96 : 0
        }}
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`
            : project.color
        }}
        transition={overlayTransition as any}
      />

      {/* Conteúdo que aparece no hover com animações escalonadas */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0
        }}
        transition={contentTransition as any}
      >
        <div className="text-white flex flex-col items-center">
          {/* Título com animação suave */}
          <motion.h3 
            className="text-3xl md:text-5xl font-sans font-bold mb-6 leading-[1.05] tracking-tighter"
            animate={{
              y: isHovered ? 0 : 15,
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.95
            }}
            transition={{
              duration: 0.6,
              delay: 0.05,
              ease: [0.33, 1, 0.68, 1]
            } as any}
          >
            {project.title}
          </motion.h3>

          {/* Tags com animação escalonada */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 max-w-xs"
            animate={{
              y: isHovered ? 0 : 15,
              opacity: isHovered ? 1 : 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.33, 1, 0.68, 1]
            } as any}
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="text-xs md:text-sm font-sans uppercase tracking-widest border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm bg-white/5"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.9
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + (i * 0.03),
                  ease: [0.33, 1, 0.68, 1]
                } as any}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Botão com hover próprio e animação */}
          <motion.button 
            className="mt-8 px-8 py-4 bg-white border-2 border-white text-black font-sans text-sm font-bold rounded-full flex items-center gap-2 uppercase transition-all duration-300 pointer-events-auto hover:bg-transparent hover:text-white hover:scale-105 active:scale-95"
            animate={{
              y: isHovered ? 0 : 15,
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.9
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.33, 1, 0.68, 1]
            } as any}
          >
            {viewProjectLabel}
            <motion.div
              animate={{
                x: isHovered ? 0 : -5
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.33, 1, 0.68, 1]
              }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
