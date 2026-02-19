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

  const variants = {
    initial: {
      opacity: 0,
      y: 32,
      borderRadius: "1.5rem"
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as any,
        delay: index * 0.08
      }
    },
    hover: {
      borderRadius: "999px",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as any
      }
    },
    rest: {
      borderRadius: "1.5rem",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as any
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="visible"
      animate={isHovered ? "hover" : "rest"}
      viewport={{ once: true, margin: '0px 0px -80px 0px', amount: 0.1 }}
      whileHover={{ scale: 1 }}
      className="relative aspect-square w-full min-w-0 overflow-hidden cursor-pointer group bg-stone-200 dark:bg-stone-900"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={project.image}
          alt={project.title}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Efeito de overlay no hover com transição simétrica */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          backgroundColor: project.color
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1] as any
        }}
      />

      {/* Conteúdo que aparece no hover */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1] as any
        }}
      >
        <div className="text-white flex flex-col items-center">
          <h3 className="text-3xl md:text-5xl font-sans font-bold mb-6 leading-[1.05] tracking-tighter">
            {project.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-xs">
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
          <button className="mt-8 px-8 py-4 bg-white border-2 border-white text-black hover:bg-transparent hover:border-white hover:text-white font-sans text-sm font-bold rounded-full flex items-center gap-2 uppercase transition-all duration-300">
            {viewProjectLabel}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
