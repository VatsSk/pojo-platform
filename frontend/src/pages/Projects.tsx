import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Projects = () => {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
          const cats = new Set<string>();
          cats.add("All");
          data.data.forEach((p: any) => {
            if (p.category) {
              const cat = p.category.trim();
              if (cat.toLowerCase() !== 'all') {
                cats.add(cat);
              }
            }
          });
          setCategories(Array.from(cats));
        }
      });
  }, []);

  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 px-6 min-h-screen relative">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6">Explore <span className="text-gradient">Projects</span></h1>
          <p className="text-devnest-muted text-lg leading-relaxed">
            Browse our showcase of premium, industry-standard projects built for and with students.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-devnest-mint text-devnest-dark' 
                  : 'bg-white/5 text-devnest-muted hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <Link to={`/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`} key={project.id || i}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full"
              >
              {project.imageUrl && (
                <div className="aspect-video w-full bg-devnest-darker relative overflow-hidden">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold group-hover:text-devnest-mint transition-colors">{project.title}</h3>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((t: string, idx: number) => (
                      <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded text-devnest-mint">{t}</span>
                    ))}
                    {project.technologies.length > 4 && <span className="text-xs bg-white/5 px-2 py-1 rounded text-devnest-muted">+{project.technologies.length - 4}</span>}
                  </div>
                )}
              </div>
              </motion.div>
            </Link>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-devnest-muted">
              No projects found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;

