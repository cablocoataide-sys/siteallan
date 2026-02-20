import React, { useState } from 'react';
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
      y: 32
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -80px 0px', amount: 0.1 }}
      animate={{
        borderRadius: isHovered ? 999 : 30
      }}
      transition={{
        duration: isHovered ? 0.4 : 0.5,
        ease: [0.65, 0, 0.35, 1],
        type: "tween"
      }}
      className="relative aspect-square w-full overflow-hidden cursor-pointer bg-stone-200 dark:bg-stone-900"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem */}
      <img
        src={project.image}
        alt={project.title}
        crossOrigin="anonymous"
        className="w-full h-full object-cover"
      />

      {/* Overlay com cor */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          opacity: isHovered ? 0.96 : 0,
          backgroundColor: project.color
        }}
        transition={{
          duration: isHovered ? 0.6 : 0.4,
          ease: [0.65, 0, 0.35, 1]
        }}
      />

      {/* Conteúdo */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center"
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 12
        }}
        transition={{
          duration: isHovered ? 0.5 : 0.3,
          delay: isHovered ? 0.15 : 0,
          ease: [0.65, 0, 0.35, 1]
        }}
      >
        <div className="text-white flex flex-col items-center">
          <h3 className="text-3xl md:text-5xl font-sans font-bold mb-6 leading-[1.05] tracking-tighter">
            {project.title}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-xs mb-8">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs md:text-sm font-sans uppercase tracking-widest border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <button className="px-8 py-4 bg-white border-2 border-white text-black font-sans text-sm font-bold rounded-full flex items-center gap-2 uppercase transition-all duration-300 hover:bg-transparent hover:text-white">
            {viewProjectLabel}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
