import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/public/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        }
      });
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName || 'Code'];
    if (IconComponent) {
      return <IconComponent size={32} />;
    }
    return <Icons.Code size={32} />;
  };

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
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl group cursor-pointer text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-devnest-mint mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {renderIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-devnest-mint transition-colors">{service.title}</h3>
              <p className="text-sm text-devnest-muted mt-2">{service.description}</p>
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

