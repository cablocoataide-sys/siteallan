import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer');
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-[#0000FF] rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
      animate={{
        x: mousePosition.x - 8, // center the 16px ball
        y: mousePosition.y - 8,
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    />
  );
};

export default Cursor;