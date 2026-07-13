import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag, CheckCircle2 } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const slugToMatch = id?.toLowerCase(); // 'id' param actually contains the slug now
          const found = data.data.find((p: any) => encodeURIComponent(p.title.toLowerCase().replace(/\s+/g, '-')) === slugToMatch);
          setProject(found);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-devnest-mint border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-devnest-muted mb-8">The project you are looking for does not exist or has been removed.</p>
        <Link to="/projects" className="px-6 py-3 rounded-full bg-devnest-indigo text-white font-bold hover:bg-devnest-indigoHover transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen bg-devnest-dark">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/projects" className="inline-flex items-center gap-2 text-devnest-muted hover:text-devnest-mint transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-devnest-mint/10 text-devnest-mint font-medium border border-devnest-mint/20">
              {project.category}
            </span>
            {project.projectUrl && (
              <a 
                href={project.projectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A855F7]/10 text-[#A855F7] font-medium border border-[#A855F7]/20 hover:bg-[#A855F7]/20 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-outfit font-bold mb-6 text-white leading-tight">
            {project.title}
          </h1>
          
          <div className="text-xl text-devnest-muted leading-relaxed max-w-3xl whitespace-pre-wrap break-words editor-content" dangerouslySetInnerHTML={{ __html: project.description }} />
        </motion.div>

        {/* Main Image */}
        {project.imageUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-16 relative group"
          >
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Features Gallery */}
            {project.features && project.features.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-outfit font-bold mb-8 flex items-center gap-3">
                  <CheckCircle2 className="text-devnest-mint" />
                  Key Highlights
                </h2>
                
                <div className="space-y-12">
                  {project.features.map((feat: any, idx: number) => (
                    <div key={idx} className="glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-devnest-mint/20 transition-all duration-300">
                      {feat.imageUrl && (
                        <div className="w-full bg-black/40 border-b border-white/5">
                          <img 
                            src={feat.imageUrl} 
                            alt={`Feature ${idx + 1}`} 
                            className="w-full h-auto max-h-[60vh] object-contain" 
                          />
                        </div>
                      )}
                      <div className="p-8 md:p-10 bg-devnest-card overflow-hidden">
                        <div className="text-lg text-white/90 leading-relaxed font-medium whitespace-pre-wrap break-words w-full editor-content" dangerouslySetInnerHTML={{ __html: feat.featureText }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack Box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl border border-white/5 sticky top-32"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Tag className="text-devnest-indigo" size={20} />
                Technologies Used
              </h3>
              
              {project.technologies && project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-devnest-indigo/20 hover:border-devnest-indigo/50 hover:text-devnest-indigo transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-devnest-muted text-sm">No technologies specified.</p>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
