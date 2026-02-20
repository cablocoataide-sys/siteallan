import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectContextType {
  projectColor: string | null;
  projectTextColor: string | null;
  setProjectColors: (color: string | null, textColor: string | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectColor, setProjectColor] = useState<string | null>(null);
  const [projectTextColor, setProjectTextColor] = useState<string | null>(null);

  const setProjectColors = (color: string | null, textColor: string | null) => {
    setProjectColor(color);
    setProjectTextColor(textColor);
  };

  return (
    <ProjectContext.Provider value={{ projectColor, projectTextColor, setProjectColors }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return context;
};
