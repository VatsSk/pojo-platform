import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectsCarousel = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const featured = data.data.filter((p: any) => p.featured);
          setFeaturedProjects(featured);
        }
      })
      .catch(err => console.error("Error fetching featured projects:", err));
  }, []);
  const projects = [
    {
      title: 'Nexus Analytics',
      category: 'FinTech Dashboard',
      description: 'Real-time financial analytics platform processing millions of transactions',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Aura AI',
      category: 'AI Interface',
      description: 'Generative AI platform with natural language understanding',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'CloudSync Pro',
      category: 'Cloud Platform',
      description: 'Enterprise cloud synchronization and management system',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      gradient: 'from-orange-500 to-red-500',
    },
  ];
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects;
  return (
    <section className="relative py-32 px-6 bg-devnest-darker border-y border-white/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-outfit font-black mb-6 tracking-tight">
            Featured Work
          </h2>
          <p className="text-2xl text-devnest-muted font-light">
            Transforming ideas into exceptional digital experiences
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="min-w-[350px] md:min-w-[500px] snap-center group cursor-hover"
    >
      <Link to={project.id ? `/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}` : "/projects"} className="block h-full">
        <div className="relative overflow-hidden rounded-3xl bg-devnest-card border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
        {/* Image Container */}
        {(project.image || project.imageUrl) && (
          <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
            <motion.img
              style={{ y }}
              src={project.image || project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient || ''} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-devnest-card via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-gradient-to-r ${project.gradient || 'from-devnest-mint to-blue-500'} text-white`}>
            {project.category}
          </span>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((t: string, idx: number) => (
                <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded text-devnest-mint">{t}</span>
              ))}
              {project.technologies.length > 4 && <span className="text-xs bg-white/5 px-2 py-1 rounded text-devnest-muted">+{project.technologies.length - 4}</span>}
            </div>
          )}
        </div>

        {/* Glow Effect */}
        <div className={`absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br ${project.gradient || 'from-devnest-mint to-blue-500'} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectsCarousel;
