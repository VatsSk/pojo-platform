import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WhatsAppIcon = ({ size = 24, fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("918051142835"); // Default number
  const defaultMessage = "Hi! I'm interested in your services 🚀";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/site-config`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.contactPhone) {
          // Remove non-digit characters for whatsapp URL
          const cleanNumber = data.data.contactPhone.replace(/\D/g, '');
          setWhatsappNumber(cleanNumber);
        }
      })
      .catch(err => console.error(err));
  }, []);

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
