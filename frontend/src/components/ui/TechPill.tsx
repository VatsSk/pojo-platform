import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface TechPillProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  targetX: number;
  targetY: number;
  depth: number;
  delay: number;
  mousePos: { x: number; y: number };
}

const TechPill: React.FC<TechPillProps> = ({ 
  icon, 
  title, 
  color, 
  targetX, 
  targetY, 
  depth, 
  delay, 
  mousePos 
}) => {
  const pillRef = useRef<HTMLDivElement>(null);

  // Calculate final position with parallax
  const finalX = targetX + (mousePos.x * depth * 0.5);
  const finalY = targetY + (mousePos.y * depth * 0.5);

  const handleMouseEnter = () => {
    gsap.to(pillRef.current, {
      scale: 1.1,
      duration: 0.4,
      ease: "back.out(1.5)"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(pillRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <motion.div
      ref={pillRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        x: finalX,
        y: finalY,
        scale: 1,
        opacity: 0.9,
      }}
      transition={{
        x: { type: "spring", stiffness: 30, damping: 25 },
        y: { type: "spring", stiffness: 30, damping: 25 },
        scale: { duration: 0.8, delay, type: "spring", stiffness: 120 },
        opacity: { duration: 0.6, delay },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-magnetic"
    >
      <motion.div
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5, 
          ease: "easeInOut", 
          delay: delay * 0.8 
        }}
        className={`flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r ${color} shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-hover group`}
      >
        <motion.span 
          className="text-white"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            delay: delay 
          }}
        >
          {icon}
        </motion.span>
        <span className="text-white text-sm font-semibold tracking-wide drop-shadow whitespace-nowrap group-hover:tracking-wider transition-all duration-300">
          {title}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default TechPill;
