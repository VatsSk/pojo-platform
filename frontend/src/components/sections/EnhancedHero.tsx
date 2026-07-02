import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const EnhancedHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const titleWords = ["Engineering", "Refined."];

  // Floating code snippets
  const codeSnippets = [
    { code: "const build = () => {", color: "from-cyan-400/20 to-blue-500/20", x: -400, y: -200, delay: 0 },
    { code: "return perfect();", color: "from-purple-400/20 to-pink-500/20", x: 350, y: -180, delay: 0.2 },
    { code: "}", color: "from-green-400/20 to-emerald-500/20", x: -350, y: 180, delay: 0.4 },
    { code: "deploy()", color: "from-orange-400/20 to-red-500/20", x: 380, y: 160, delay: 0.6 },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
    >
      {/* Floating Code Snippets Background */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: 1,
              rotate: 0,
              x: snippet.x + mousePos.x * (index % 2 === 0 ? 1 : -1),
              y: snippet.y + mousePos.y * (index % 2 === 0 ? -1 : 1),
            }}
            transition={{
              opacity: { repeat: Infinity, duration: 4, delay: snippet.delay },
              scale: { duration: 0.8, delay: snippet.delay },
              rotate: { duration: 0.6, delay: snippet.delay },
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, delay: snippet.delay }}
              className={`px-6 py-3 rounded-xl bg-gradient-to-br ${snippet.color} backdrop-blur-sm border border-white/10 shadow-xl`}
            >
              <code className="text-white/70 font-mono text-sm">
                {snippet.code}
              </code>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-devnest-mint/50 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-devnest-indigo/50 to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-gradient-to-b from-transparent via-devnest-mint/30 to-transparent" />
        <div className="absolute top-0 bottom-0 right-1/3 w-px bg-gradient-to-b from-transparent via-devnest-indigo/30 to-transparent" />
      </div>

      {/* Main Content */}
      <motion.div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-devnest-mint/30 bg-devnest-mint/10 mb-8 cursor-hover"
        >
          <span className="w-3 h-3 rounded-full bg-devnest-mint animate-pulse" />
          <span className="text-devnest-mint text-sm font-bold tracking-widest uppercase">
            Complete Developer Solutions
          </span>
        </motion.div>

        {/* Hero Title with Character Animation */}
        <h1 className="text-7xl md:text-[120px] font-outfit font-black tracking-tighter leading-[1] mb-8 flex flex-wrap justify-center gap-4">
          {titleWords.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 1,
                delay: wordIndex * 0.2,
                type: "spring",
                bounce: 0.4,
              }}
              className={
                wordIndex === 1
                  ? "text-gradient"
                  : "text-white"
              }
            >
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  whileHover={{
                    scale: 1.2,
                    color: '#64FFDA',
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-default"
                  style={{
                    display: 'inline-block',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-6 items-center justify-center text-center md:text-left bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] backdrop-blur-md shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-default"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="p-4 bg-devnest-indigo/20 rounded-full border border-devnest-indigo/30 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              <Code className="text-devnest-indigo w-8 h-8" />
            </motion.div>
            <div>
              <p className="text-2xl text-white font-bold mb-2 tracking-tight">
                Experience the pinnacle of development mentoring.
              </p>
              <p className="text-lg text-devnest-muted font-light leading-relaxed">
                Build enterprise-grade software with absolute precision. Master architecture, refine execution, and deploy with confidence.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-devnest-muted"
          >
            <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-devnest-mint"
            >
              <path
                d="M12 5v14m0 0l-7-7m7 7l7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
