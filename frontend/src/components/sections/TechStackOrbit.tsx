import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Container, Boxes, Server, Terminal, Braces, Globe, Workflow, Cpu, FileCode, Layers } from 'lucide-react';

const TechStackOrbit = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const techLogos = [
    // Programming Languages & Fundamentals
    { name: 'JavaScript', color: '#F7DF1E', icon: FileCode, bg: 'from-yellow-400 to-yellow-600' },
    { name: 'HTML/CSS', color: '#E34F26', icon: Code, bg: 'from-orange-500 to-red-600' },
    { name: 'Python', color: '#3776AB', icon: Terminal, bg: 'from-blue-400 to-indigo-600' },
    { name: 'DSA', color: '#00D9FF', icon: Workflow, bg: 'from-cyan-400 to-blue-600' },
    
    // Frontend Frameworks
    { name: 'React', color: '#61DAFB', icon: Code, bg: 'from-cyan-400 to-blue-500' },
    { name: 'Vue.js', color: '#42B883', icon: Code, bg: 'from-green-400 to-emerald-600' },
    { name: 'Next.js', color: '#000000', icon: Globe, bg: 'from-gray-700 to-gray-900' },
    
    // Backend & Server
    { name: 'Node.js', color: '#339933', icon: Server, bg: 'from-green-400 to-emerald-600' },
    { name: 'TypeScript', color: '#3178C6', icon: Braces, bg: 'from-blue-500 to-purple-600' },
    
    // Databases
    { name: 'MongoDB', color: '#47A248', icon: Database, bg: 'from-green-500 to-teal-600' },
    { name: 'MySQL', color: '#4479A1', icon: Database, bg: 'from-blue-500 to-indigo-700' },
    { name: 'Firebase', color: '#FFCA28', icon: Database, bg: 'from-yellow-400 to-orange-500' },
    
    // AI & ML
    { name: 'LLMs', color: '#FF6B6B', icon: Cpu, bg: 'from-red-400 to-pink-600' },
    { name: 'RAG', color: '#A855F7', icon: Layers, bg: 'from-purple-500 to-fuchsia-600' },
    
    // Cloud & DevOps
    { name: 'AWS', color: '#FF9900', icon: Cloud, bg: 'from-orange-400 to-red-500' },
    { name: 'Docker', color: '#2496ED', icon: Container, bg: 'from-blue-400 to-cyan-600' },
  ];

  const radius = 260;

  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-outfit font-black mb-6 tracking-tight">
            Tech Stack
          </h2>
          <p className="text-2xl text-devnest-muted font-light max-w-3xl mx-auto">
            Master the complete modern development ecosystem from frontend to AI
          </p>
        </motion.div>

        {/* Orbit Container */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          {/* Center Element */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="absolute z-10"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-devnest-mint via-devnest-indigo to-purple-600 flex items-center justify-center shadow-2xl shadow-devnest-mint/50 border-4 border-white/10"
            >
              <Boxes className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          {/* Orbiting Tech Logos */}
          {techLogos.map((tech, index) => {
            const angle = (index / techLogos.length) * 2 * Math.PI - Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 120
                }}
                animate={{
                  x: [x, x + Math.cos(angle) * 8, x],
                  y: [y, y + Math.sin(angle) * 8, y],
                }}
                whileHover={{ 
                  scale: 1.4,
                  rotate: 360,
                  zIndex: 20,
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="absolute cursor-hover"
                style={{
                  left: '50%',
                  top: '50%',
                  x: x,
                  y: y,
                }}
              >
                <motion.div 
                  animate={{ 
                    rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: hoveredIndex === index ? Infinity : 0
                  }}
                  className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${tech.bg} border-2 border-white/20 flex flex-col items-center justify-center gap-2 shadow-xl backdrop-blur-sm hover:border-white/40 transition-all duration-300 overflow-hidden group`}
                  style={{
                    boxShadow: hoveredIndex === index 
                      ? `0 0 40px ${tech.color}80, 0 0 60px ${tech.color}40` 
                      : `0 8px 20px rgba(0,0,0,0.3)`,
                  }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30"
                    animate={{
                      background: [
                        `radial-gradient(circle at 0% 0%, ${tech.color}40 0%, transparent 50%)`,
                        `radial-gradient(circle at 100% 100%, ${tech.color}40 0%, transparent 50%)`,
                        `radial-gradient(circle at 0% 100%, ${tech.color}40 0%, transparent 50%)`,
                        `radial-gradient(circle at 100% 0%, ${tech.color}40 0%, transparent 50%)`,
                        `radial-gradient(circle at 0% 0%, ${tech.color}40 0%, transparent 50%)`,
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    animate={{
                      y: hoveredIndex === index ? [0, -4, 0] : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: hoveredIndex === index ? Infinity : 0
                    }}
                  >
                    <Icon className="w-10 h-10 text-white drop-shadow-lg relative z-10" />
                  </motion.div>
                  
                  {/* Tech name */}
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0.8,
                      y: hoveredIndex === index ? 0 : 5,
                      scale: hoveredIndex === index ? 1.1 : 1
                    }}
                    className="text-xs font-bold text-white whitespace-nowrap relative z-10 drop-shadow-lg"
                  >
                    {tech.name}
                  </motion.span>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Animated Orbit Rings */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute w-[520px] h-[520px] rounded-full border border-dashed border-devnest-mint/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute w-[460px] h-[460px] rounded-full border border-dotted border-devnest-indigo/20"
          />

          {/* Glowing center ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute w-[160px] h-[160px] rounded-full border-2 border-devnest-mint/30 blur-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default TechStackOrbit;
