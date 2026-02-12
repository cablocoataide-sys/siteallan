import { useState, useEffect, RefObject } from 'react';

export const useMouseAngle = (ref: RefObject<HTMLElement>) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calcula o ângulo em graus (0° = direita, 90° = baixo)
      const angleInDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      setAngle(angleInDegrees);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);

  return angle;
};
