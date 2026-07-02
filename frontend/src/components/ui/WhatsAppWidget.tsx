import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle as WhatsAppIcon, X } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "919999999999"; // Replace with actual number from backend config
  const defaultMessage = "Hi! I'm interested in your services 🚀";

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-2xl shadow-green-500/50 cursor-pointer group"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <WhatsAppIcon size={32} fill="white" />
            </motion.div>

            {/* Pulse effect */}
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-[#25D366]"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header - WhatsApp Style */}
            <div className="bg-[#075E54] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=Pojo+Dev&background=25D366&color=fff&size=128"
                      alt="pojo.dev"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-[#075E54]"></span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">pojo.dev</h3>
                  <p className="text-white/80 text-xs">Online - Always active 🟢</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Chat Preview */}
            <div className="bg-[#E5DDD5] p-6 min-h-[280px] relative" 
              style={{ 
                backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"%23e5ddd5\"/%3E%3Cpath d=\"M20 20h15v15H20zM45 45h15v15H45z\" fill=\"%23d1d7db\" opacity=\".1\"/%3E%3C/svg%3E')" 
              }}
            >
              {/* Bot Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <div className="inline-block max-w-[85%] bg-white rounded-lg rounded-tl-none shadow-sm p-3">
                  <p className="text-gray-800 text-sm leading-relaxed mb-1">
                    Hey! 👋 We're the pojo.dev team.
                  </p>
                  <p className="text-gray-800 text-sm leading-relaxed mb-1">
                    Ready to build something <span className="font-semibold">epic</span>? 🚀
                  </p>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    Let's chat!
                  </p>
                  <span className="text-xs text-gray-500 block text-right mt-1">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>

              {/* User Message Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end"
              >
                <div className="inline-block max-w-[85%] bg-[#DCF8C6] rounded-lg rounded-tr-none shadow-sm p-3">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {defaultMessage}
                  </p>
                  <span className="text-xs text-gray-600 block text-right mt-1">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>

              {/* WhatsApp Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
              >
                <p className="text-xs text-gray-600 mb-2">Tap below to continue on WhatsApp</p>
              </motion.div>
            </div>

            {/* Action Button */}
            <div className="bg-white p-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendMessage}
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <WhatsAppIcon size={20} fill="white" />
                <span>Continue on WhatsApp</span>
              </motion.button>

              <p className="text-center text-xs text-gray-500 mt-3">
                Powered by <span className="font-semibold text-[#25D366]">WhatsApp</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppWidget;
