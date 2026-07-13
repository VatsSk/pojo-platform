import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 3D tilt card hook
const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return { ref, rotateX, rotateY, handleMouse, handleLeave };
};

const GRADIENTS = [
  { from: '#6366f1', to: '#8b5cf6', cls: 'from-indigo-500 to-violet-500' },
  { from: '#06b6d4', to: '#3b82f6', cls: 'from-cyan-500 to-blue-500' },
  { from: '#10b981', to: '#06b6d4', cls: 'from-emerald-500 to-cyan-500' },
  { from: '#f59e0b', to: '#ef4444', cls: 'from-amber-500 to-red-500' },
  { from: '#ec4899', to: '#8b5cf6', cls: 'from-pink-500 to-violet-500' },
  { from: '#14b8a6', to: '#3b82f6', cls: 'from-teal-500 to-blue-500' },
];

// Wide cards for index 0 and 3, square for rest
const getSpan = (index: number, total: number) => {
  if (total <= 2) return 'md:col-span-2';
  const widePositions = [0, 3];
  return widePositions.includes(index % 6) ? 'md:col-span-2' : 'md:col-span-1';
};

const ServiceCard = ({ card, index }: { card: any; index: number }) => {
  const { ref, rotateX, rotateY, handleMouse, handleLeave } = useTilt();
  const [hovered, setHovered] = useState(false);
  const grad = GRADIENTS[index % GRADIENTS.length];

  const renderIcon = (iconName: string) => {
    const IC = (Icons as any)[iconName || 'Code'];
    return IC ? <IC size={28} /> : <Icons.Code size={28} />;
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { handleLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      className="w-full h-full"
    >
      <Link
        to={`/services/${encodeURIComponent(card.title.toLowerCase().replace(/\s+/g, '-'))}`}
        className="block w-full h-full relative overflow-hidden rounded-3xl bg-devnest-card border border-white/10 p-7 group"
      >
        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${grad.from}22, ${grad.to}11)`,
          }}
        />

        {/* Top glowing bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, transparent, ${grad.from}, ${grad.to}, transparent)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background image */}
        {card.imageUrl && (
          <div className="absolute inset-0 z-0">
            <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700 scale-105 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-devnest-card via-devnest-card/70 to-transparent" />
          </div>
        )}

        {/* Glow orb */}
        <motion.div
          className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${grad.from}55, transparent)` }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.1 : 0.8 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <motion.div
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl shrink-0"
            style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
          >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ['-120%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, delay: index * 0.4, ease: 'easeInOut' }}
            />
            <span className="text-white relative z-10">{renderIcon(card.icon)}</span>
          </motion.div>

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {card.tags.slice(0, 3).map((tag: string, i: number) => (
                <span
                  key={i}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                  style={{ color: grad.from, borderColor: `${grad.from}50`, background: `${grad.from}15` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-black mb-2 text-white leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
            style={{ WebkitBackgroundClip: hovered ? 'text' : undefined, backgroundImage: hovered ? `linear-gradient(135deg, ${grad.from}, ${grad.to})` : undefined }}>
            {card.title}
          </h3>

          {/* Description */}
          <div
            className="text-sm text-white/50 leading-relaxed line-clamp-3 flex-1 editor-content"
            dangerouslySetInnerHTML={{ __html: card.description }}
          />

          {/* CTA */}
          <motion.div
            className="mt-4 flex items-center gap-1.5 text-xs font-bold"
            style={{ color: grad.from }}
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.25 }}
          >
            Explore service
            <motion.span animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.25 }}>
              <Icons.ArrowRight size={13} />
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const BentoGrid = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`)
      .then(res => res.json())
      .then(data => { if (data.success && data.data) setServices(data.data); });
  }, []);

  return (
    <section className="py-32 px-6 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-6"
          >
            <Icons.Zap size={14} className="text-indigo-400" />
            What we offer
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-outfit font-black mb-6 tracking-tight">
            Capabilities
          </h2>
          <p className="text-xl text-devnest-muted font-light max-w-2xl mx-auto leading-relaxed">
            Comprehensive solutions crafted for modern development challenges — from idea to deployment
          </p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-8 mt-10"
          >
            {[
              { value: services.length + '+', label: 'Services' },
              { value: '100%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-devnest-muted mt-1 font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[260px]">
            {services.map((card, index) => (
              <motion.div
                key={card.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 80 }}
                className={getSpan(index, services.length)}
              >
                <ServiceCard card={card} index={index} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-devnest-muted">
            <Icons.Loader2 size={32} className="animate-spin mx-auto mb-4 text-devnest-mint" />
            <p>Loading services...</p>
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white font-semibold group"
          >
            View all services
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <Icons.ArrowRight size={18} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
