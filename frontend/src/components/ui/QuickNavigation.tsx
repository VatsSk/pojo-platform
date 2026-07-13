import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const QuickNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation if scrolled down a bit
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-1/2 right-6 z-40 flex flex-col gap-3 translate-y-1/2"
        >
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-devnest-darker border border-white/20 flex items-center justify-center text-white hover:bg-devnest-mint hover:border-devnest-mint hover:text-devnest-dark transition-all shadow-xl backdrop-blur-md group"
            title="Scroll to Top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
          
          <button
            onClick={scrollToBottom}
            className="w-12 h-12 rounded-full bg-devnest-darker border border-white/20 flex items-center justify-center text-white hover:bg-devnest-mint hover:border-devnest-mint hover:text-devnest-dark transition-all shadow-xl backdrop-blur-md group"
            title="Scroll to Bottom"
          >
            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickNavigation;
