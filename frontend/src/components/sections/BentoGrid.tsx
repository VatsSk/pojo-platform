import { motion } from 'framer-motion';
import { Code, Cpu, Rocket, Database, Cloud, Layers } from 'lucide-react';

const BentoGrid = () => {
  const cards = [
    {
      id: 1,
      title: "Full-Stack Development",
      description: "End-to-end solutions with modern frameworks and scalable architecture",
      icon: <Code size={40} />,
      gradient: "from-blue-500 to-cyan-500",
      size: "md:col-span-2 md:row-span-2",
    },
    {
      id: 2,
      title: "AI & ML",
      description: "Intelligent systems that learn and adapt",
      icon: <Cpu size={32} />,
      gradient: "from-purple-500 to-pink-500",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      title: "Cloud Infrastructure",
      description: "Scalable and secure cloud solutions",
      icon: <Cloud size={32} />,
      gradient: "from-orange-500 to-red-500",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      title: "Database Design",
      description: "Optimized data structures for performance",
      icon: <Database size={32} />,
      gradient: "from-green-500 to-emerald-500",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      id: 5,
      title: "DevOps & CI/CD",
      description: "Automated pipelines for seamless deployment",
      icon: <Rocket size={32} />,
      gradient: "from-indigo-500 to-purple-500",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      id: 6,
      title: "System Architecture",
      description: "Scalable designs built for growth and reliability",
      icon: <Layers size={36} />,
      gradient: "from-pink-500 to-rose-500",
      size: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-6xl md:text-8xl font-outfit font-black mb-6 tracking-tight">
            Capabilities
          </h2>
          <p className="text-2xl text-devnest-muted font-light max-w-2xl mx-auto">
            Comprehensive solutions for modern development challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className={`${card.size} group relative overflow-hidden rounded-3xl bg-devnest-card border border-white/10 p-8 cursor-hover`}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} mb-6 shadow-lg relative overflow-hidden`}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-white relative z-10">{card.icon}</span>
              </motion.div>

              {/* Content */}
              <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-gradient transition-all duration-300">
                {card.title}
              </h3>
              <p className="text-lg text-devnest-muted leading-relaxed">
                {card.description}
              </p>

              {/* Glow Effect */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${card.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
