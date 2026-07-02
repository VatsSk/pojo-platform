import { motion } from 'framer-motion';

const ManifestoSection = () => {
  const lines = [
    "We don't just build software.",
    "We architect experiences.",
    "We refine systems.",
    "We deploy with precision.",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-6 bg-devnest-darker border-y border-white/5">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {lines.map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.2,
                type: "spring",
                stiffness: 100 
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-outfit font-black tracking-tight text-center"
            >
              <span className={i % 2 === 1 ? "text-gradient" : "text-white"}>
                {line}
              </span>
            </motion.h2>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-2xl text-center text-devnest-muted font-light max-w-3xl mx-auto"
        >
          Every line of code matters. Every decision counts. 
          We're here to transform your vision into reality.
        </motion.p>
      </div>
    </section>
  );
};

export default ManifestoSection;
