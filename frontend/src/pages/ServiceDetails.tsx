import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const slugToMatch = id?.toLowerCase(); // 'id' param actually contains the slug now
          const found = data.data.find((s: any) => encodeURIComponent(s.title.toLowerCase().replace(/\s+/g, '-')) === slugToMatch);
          if (found) {
            setService(found);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName || 'Code'];
    if (IconComponent) {
      return <IconComponent size={64} />;
    }
    return <Icons.Code size={64} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-devnest-mint"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <button onClick={() => navigate('/services')} className="text-devnest-mint hover:underline">
          Return to Services
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <button 
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 text-devnest-muted hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-devnest-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {service.imageUrl ? (
            <div className="w-full h-64 md:h-96 relative">
              <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-devnest-card via-devnest-card/50 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-devnest-darker to-devnest-card flex items-center justify-center text-devnest-mint relative">
              {renderIcon(service.icon)}
              <div className="absolute inset-0 bg-gradient-to-t from-devnest-card to-transparent" />
            </div>
          )}

          <div className="p-8 md:p-12 relative z-10 -mt-20">
            {service.tags && service.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-devnest-mint/20 border border-devnest-mint/30 text-devnest-mint rounded-full text-sm font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl font-black mb-10">{service.title}</h1>
            <div className="mb-12 text-xl text-devnest-muted leading-relaxed editor-content" dangerouslySetInnerHTML={{ __html: service.description }}></div>

            {((service.pricingOptions && service.pricingOptions.length > 0) || service.pricing) && (
              <div className="border-t border-white/10 pt-8 mt-8 mb-12">
                <h3 className="text-2xl font-bold mb-6">Pricing details</h3>
                {(service.pricingOptions && service.pricingOptions.length > 0) ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.pricingOptions.map((opt: string, i: number) => (
                        <div key={i} className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl">
                          <p className="text-lg font-bold text-devnest-mint">{opt}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-amber-400 bg-amber-400/10 px-3 py-2 rounded-lg w-fit animate-pulse border border-amber-400/20 shadow-lg shadow-amber-400/5">
                      <Icons.Info size={14} />
                      <span className="text-xs font-semibold tracking-wide uppercase">Price not fixed &bull; Depends on project/ideas</span>
                    </div>
                  </div>
                ) : (
                   <div className="inline-block px-6 py-4 bg-white/5 border border-white/10 rounded-xl w-fit">
                     <p className="text-sm text-devnest-muted mb-1">Pricing starting from</p>
                     <p className="text-3xl font-bold text-devnest-mint">{service.pricing}</p>
                     <div className="flex items-center gap-2 mt-4 text-amber-400 bg-amber-400/10 px-3 py-2 rounded-lg w-fit animate-pulse border border-amber-400/20 shadow-lg shadow-amber-400/5">
                       <Icons.Info size={14} />
                       <span className="text-xs font-semibold tracking-wide uppercase">Price not fixed &bull; Depends on project/ideas</span>
                     </div>
                   </div>
                )}
              </div>
            )}

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-2xl font-bold mb-6">Ready to get started?</h3>
              <p className="text-devnest-muted mb-8 max-w-2xl">
                Our team is ready to help you bring your ideas to life. Contact us today to discuss your requirements and how this service can benefit you.
              </p>
              <Link 
                to={`/contact?concern=development&message=${encodeURIComponent(`I'm interested in the ${service.title} service. Could you provide more details?`)}`}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-devnest-mint to-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-xl shadow-devnest-mint/20"
              >
                Inquire Now <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails;
