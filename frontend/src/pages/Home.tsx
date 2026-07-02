import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code, Database, Server, Laptop, 
  Cpu, Rocket, MoveRight, Layers, Box, Cloud, Terminal, Globe, Activity
} from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-devnest-dark min-h-screen text-devnest-white overflow-hidden relative">
      <AnimatedBackground />
      <HeroSection />
      <ValueProposition />
      <ServicesGrid />
      <FeaturedShowcase />
      <CtaSection />
    </div>
  );
};

// --- Extreme Animated Background ---
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <motion.div 
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-devnest-indigo/20 blur-[120px]"
    />
    <motion.div 
      animate={{ 
        rotate: -360,
        scale: [1, 1.5, 1],
      }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-devnest-mint/15 blur-[120px]"
    />
  </div>
);

// --- 1. Highly Animated Hero Section ---
const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Parallax Logic mapped to -50 to 50
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 100;
    const y = (clientY / innerHeight - 0.5) * 100;
    setMousePos({ x, y });
  };
  
  // Very visible word animation
  const titleText = "Engineering Refined.".split(" ");

  const techStacks = [
    // Top Region
    { icon: <Cpu size={24} />, title: "AI / ML", color: "from-purple-500 to-indigo-600", targetX: -350, targetY: -250, depth: 1.5 },
    { icon: <Server size={24} />, title: "Node.js", color: "from-green-500 to-emerald-600", targetX: 0, targetY: -350, depth: -1.2 },
    { icon: <Code size={24} />, title: "Python", color: "from-blue-500 to-cyan-500", targetX: 350, targetY: -250, depth: 0.8 },
    // Mid Region
    { icon: <Code size={24} />, title: "Java", color: "from-red-500 to-orange-500", targetX: -550, targetY: -50, depth: -0.5 },
    { icon: <Database size={24} />, title: "MongoDB", color: "from-green-600 to-teal-700", targetX: -250, targetY: 150, depth: 2.0 },
    { icon: <Database size={24} />, title: "MySQL", color: "from-blue-400 to-indigo-500", targetX: 280, targetY: 100, depth: -1.8 },
    { icon: <Layers size={24} />, title: "System Design", color: "from-pink-500 to-rose-600", targetX: 550, targetY: -50, depth: 1.2 },
    // Bottom Region
    { icon: <Laptop size={24} />, title: "React", color: "from-cyan-400 to-blue-600", targetX: -400, targetY: 300, depth: -1.5 },
    { icon: <Globe size={24} />, title: "Next.js", color: "from-gray-700 to-black", targetX: 0, targetY: 320, depth: 1.0 },
    { icon: <Box size={24} />, title: "Docker", color: "from-blue-500 to-blue-700", targetX: 400, targetY: 300, depth: -0.8 },
    // Far Extremes
    { icon: <Cloud size={24} />, title: "AWS", color: "from-yellow-500 to-orange-600", targetX: -500, targetY: -300, depth: 2.5 },
    { icon: <Rocket size={24} />, title: "Spring Boot", color: "from-green-400 to-emerald-500", targetX: 480, targetY: 200, depth: -2.0 },
  ];

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden perspective-[1000px]"
    >
      
      {/* Floating Tech Stack Elements - Explode from center */}
      {techStacks.map((tech, index) => (
        <TechPill 
          key={index}
          {...tech}
          delay={index * 0.1}
          mousePos={mousePos}
        />
      ))}

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-10 pointer-events-none"
      >
        
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-devnest-mint/30 bg-devnest-mint/10 mb-8"
        >
          <span className="w-3 h-3 rounded-full bg-devnest-mint animate-pulse" />
          <span className="text-devnest-mint text-sm font-bold tracking-widest uppercase">All solutions of developer</span>
        </motion.div>

        <h1 className="text-7xl md:text-[120px] font-outfit font-black tracking-tighter leading-[1] mb-8 flex flex-wrap justify-center gap-4">
          {titleText.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: i * 0.2, type: "spring", bounce: 0.4 }}
              className={i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-devnest-mint to-devnest-indigo" : "text-white"}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center text-center md:text-left bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] backdrop-blur-md shadow-2xl hover:bg-white/10 transition-colors duration-500 cursor-default">
            <div className="p-4 bg-devnest-indigo/20 rounded-full border border-devnest-indigo/30 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              <Code className="text-devnest-indigo w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl text-white font-bold mb-2 tracking-tight">Experience the pinnacle of development mentoring.</p>
              <p className="text-lg text-devnest-muted font-light leading-relaxed">Build enterprise-grade software with absolute precision. Master architecture, refine execution, and deploy with confidence.</p>
            </div>
          </div>
        </motion.div>
        
        {/* Explore Ecosystem button intentionally removed here */}
      </motion.div>
    </section>
  );
};

// --- 2. Highly Visible Staggered Cards ---
const ValueProposition = () => {
  const cards = [
    { title: "Architectural Clarity", desc: "Understand the 'why' behind complex system designs.", icon: <Layers size={40} /> },
    { title: "Flawless Execution", desc: "Write code that performs effortlessly under pressure.", icon: <Code size={40} /> },
    { title: "Seamless Delivery", desc: "Present your projects with supreme confidence.", icon: <Box size={40} /> },
  ];

  return (
    <section className="py-32 px-6 relative z-10 bg-devnest-darker border-y border-white/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } }, hidden: {} }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -50, scale: 0.8 },
                visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 1 } }
              }}
              whileHover={{ y: -20, scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.5)" }}
              className="bg-devnest-card p-10 rounded-[32px] border border-white/10 group cursor-pointer"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                className="text-devnest-mint mb-8 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center"
              >
                {card.icon}
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-devnest-mint transition-colors">{card.title}</h3>
              <p className="text-xl text-devnest-muted leading-relaxed font-light">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- 3. Dynamic Services Grid ---
const ServicesGrid = () => {
  return (
    <section className="py-40 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-outfit font-black mb-6 tracking-tight">Capabilities</h2>
          <p className="text-2xl text-devnest-muted font-light">Crafted for developers who demand the best tooling.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 bg-gradient-to-br from-devnest-indigo to-purple-800 p-12 md:p-16 rounded-[40px] relative overflow-hidden group cursor-pointer shadow-[0_0_40px_rgba(79,70,229,0.3)]"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -right-[10%] -top-[10%] opacity-20"
            >
              <Laptop size={400} />
            </motion.div>
            <div className="relative z-10 md:w-2/3">
              <h3 className="text-5xl font-black mb-6 text-white">Full-Stack Architecture</h3>
              <p className="text-2xl text-white/80 font-light mb-10 leading-relaxed">Master modern frameworks, robust APIs, and highly scalable databases with guidance from industry veterans.</p>
              <div className="inline-flex items-center gap-3 text-white font-bold text-xl bg-black/20 px-8 py-4 rounded-full backdrop-blur-md hover:bg-black/40 transition-colors">
                Discover more <ArrowRight size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            whileHover={{ y: -15, scale: 1.03 }}
            className="bg-devnest-card p-12 rounded-[40px] border border-white/10 group shadow-xl"
          >
            <Cpu className="text-devnest-mint mb-8 w-20 h-20 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 origin-left" />
            <h3 className="text-4xl font-bold mb-4 text-white">Machine Learning</h3>
            <p className="text-xl text-devnest-muted font-light">Integrate intelligent models natively into your applications.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.3, delay: 0.2 }}
            whileHover={{ y: -15, scale: 1.03 }}
            className="bg-devnest-card p-12 rounded-[40px] border border-white/10 group shadow-xl"
          >
            <Rocket className="text-purple-400 mb-8 w-20 h-20 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 origin-left" />
            <h3 className="text-4xl font-bold mb-4 text-white">Deployment Ops</h3>
            <p className="text-xl text-devnest-muted font-light">Ship code flawlessly using enterprise CI/CD pipelines.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 4. Deep Parallax Showcase ---
const FeaturedShowcase = () => {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a] text-white border-y border-white/5 relative z-20 mt-10">
      <div className="container mx-auto max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-4xl md:text-6xl font-outfit font-bold mb-16 tracking-tight text-center"
        >
          Recent Masterpieces.
        </motion.h2>

        <div className="flex flex-col gap-24">
          <ProjectRow 
            title="Nexus Analytics" 
            category="FinTech Dashboard"
            imgUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            reverse={false}
          />
          <ProjectRow 
            title="Aura AI" 
            category="Generative Interface"
            imgUrl="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            reverse={true}
          />
        </div>
      </div>
    </section>
  );
};

const ProjectRow = ({ title, category, imgUrl, reverse }: any) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 1, type: "spring", bounce: 0.3 }}
      className={`flex flex-col \${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 group`}
    >
      <div className="w-full md:w-3/5 overflow-hidden rounded-[24px] aspect-[16/10] relative shadow-2xl border border-white/5">
        <motion.img 
          style={{ y: yImage, scale: 1.1 }}
          src={imgUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      <div className="w-full md:w-2/5 space-y-4">
        <span className="text-lg text-devnest-mint font-semibold uppercase tracking-wider">{category}</span>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h3>
        <p className="text-lg text-devnest-muted font-light leading-relaxed max-w-sm">
          A highly scalable architecture built to process millions of requests effortlessly.
        </p>
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-lg font-medium mt-4 text-white hover:text-devnest-mint transition-colors"
        >
          View Case Study <ArrowRight />
        </Link>
      </div>
    </motion.div>
  );
};

// --- 5. Massive Pulsing CTA ---
const CtaSection = () => {
  return (
    <section className="py-40 px-6 bg-devnest-dark relative z-10 text-center overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-devnest-mint/20 blur-[150px] rounded-full pointer-events-none" 
      />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        >
          <h2 className="text-6xl md:text-9xl font-outfit font-black mb-10 tracking-tighter text-white">
            Ready to build?
          </h2>
          <p className="text-2xl md:text-4xl text-devnest-muted mb-16 font-light">
            Step into the future of software engineering.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-16 py-6 rounded-full bg-white text-black font-black text-2xl hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.4)]"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// --- Tech Pill Component for Hero Section ---
const TechPill = ({ icon, title, color, targetX, targetY, depth, delay, mousePos }: any) => {
  
  // Calculate final position by adding mouse parallax to the target coordinate
  const finalX = targetX + (mousePos.x * depth);
  const finalY = targetY + (mousePos.y * depth);

  return (
    <div className="absolute top-1/2 left-1/2 z-20 hidden lg:block pointer-events-none">
      <motion.div
        initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
        animate={{ 
          x: finalX,
          y: finalY,
          scale: 1,
          opacity: 1
        }}
        transition={{
          x: { type: "spring", stiffness: 40, damping: 20 },
          y: { type: "spring", stiffness: 40, damping: 20 },
          scale: { duration: 1, delay, type: "spring" },
          opacity: { duration: 0.5, delay }
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: delay * 0.5 }}
          className={`flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r \${color} shadow-[0_0_40px_rgba(255,255,255,0.15)] border border-white/20 pointer-events-auto cursor-crosshair`}
        >
          <span className="text-white drop-shadow-lg">{icon}</span>
          <span className="text-white text-base font-bold tracking-wider drop-shadow-lg whitespace-nowrap">{title}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
