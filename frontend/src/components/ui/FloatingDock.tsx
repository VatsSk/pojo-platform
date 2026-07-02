import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {/* Chat Icon */}
      <motion.a
        href="#chat"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
        transition={{ 
          scale: { duration: 0.5, ease: "backOut" },
          y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.2 }
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-devnest-indigo to-blue-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(108,99,255,0.6)] transition-shadow duration-300 z-10"
      >
        <MessageCircle size={24} />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-devnest-card border border-white/10 text-sm font-medium text-white shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          Live Chat
        </div>
      </motion.a>

      {/* WhatsApp Icon */}
      <motion.a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
        transition={{ 
          scale: { duration: 0.5, ease: "backOut", delay: 0.1 },
          y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }
        }}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#1DA851] flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow duration-300 z-20"
      >
        <Phone size={24} className="fill-current" />
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-devnest-card border border-white/10 text-sm font-medium text-white shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          WhatsApp Us
        </div>
      </motion.a>
    </div>
  );
};

export default FloatingContact;
