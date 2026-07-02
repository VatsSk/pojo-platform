import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/public/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
          const cats = new Set(["All"]);
          data.data.forEach((p: any) => {
            if (p.category) cats.add(p.category);
          });
          setCategories(Array.from(cats));
        }
      });
  }, []);

  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 px-6 min-h-screen">
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
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video w-full bg-devnest-darker relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center text-devnest-muted">Project Preview</div>
                 <div className="absolute inset-0 bg-gradient-to-t from-devnest-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-devnest-mint transition-colors">{project.title}</h3>
                <p className="text-sm text-devnest-muted line-clamp-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((t: string, idx: number) => (
                      <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded text-devnest-mint">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
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

