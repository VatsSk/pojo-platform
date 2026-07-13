import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        }
      });
  }, []);


  return (
    <div className="pt-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6">Our <span className="text-gradient">Services</span></h1>
          <p className="text-devnest-muted text-lg leading-relaxed">
            Comprehensive guidance designed specifically for engineering students. From ideation to deployment, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-8 rounded-2xl group cursor-pointer text-center h-full block hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-shadow duration-300"
            >
              <Link to={`/services/${encodeURIComponent(service.title.toLowerCase().replace(/\s+/g, '-'))}`} className="block h-full flex flex-col">
              {service.imageUrl && (
                <div className="w-full h-48 bg-white/5 rounded-xl mb-6 overflow-hidden">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 group-hover:text-devnest-mint transition-colors">{service.title}</h3>
              
              {service.tags && service.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {service.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/80">{tag}</span>
                  ))}
                </div>
              )}
              </Link>
            </motion.div>
          ))}
          {services.length === 0 && (
            <div className="col-span-full text-center py-12 text-devnest-muted">
              No services found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;

