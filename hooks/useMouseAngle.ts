import { useState, useEffect, RefObject, useRef } from 'react';

export const useMouseAngle = (ref: RefObject<HTMLElement>) => {
  const [angle, setAngle] = useState(0);
  const lastAngleRef = useRef(0);
  const totalRotationRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Deadzone: Se o mouse estiver muito perto do centro (menos de 10px),
      // não atualizamos o ângulo para evitar oscilação frenética.
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < 15) return;

      // Calcula o ângulo base de -180 a 180
      const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Unwrapping logic: Encontra a diferença entre o novo ângulo e o último
      // e ajusta a rotação total para que o movimento seja sempre o caminho mais curto.
      let diff = newAngle - lastAngleRef.current;

      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      totalRotationRef.current += diff;
      lastAngleRef.current = newAngle;

      setAngle(totalRotationRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);

  return angle;
};
