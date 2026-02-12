import React from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import { Content } from '../types';

interface HomeProps {
  content: Content;
}

const Home: React.FC<HomeProps> = ({ content }) => {
  return (
    <>
      <Hero content={content} />

      <section id="projects" className="w-full px-4 sm:px-6 md:px-12 pb-12 md:pb-16 pt-3 md:pt-9">
        <div className="projects-grid">
          {content.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <Footer content={content} />
    </>
  );
};

export default Home;
