import { motion } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-xl', container: 'w-8 h-8' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', container: 'w-10 h-10' },
    lg: { icon: 'w-16 h-16', text: 'text-4xl', container: 'w-16 h-16' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`${currentSize.container} relative cursor-pointer`}
      >
        {/* Outer ring with gradient */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 20, ease: "linear" },
            scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-devnest-mint via-devnest-indigo to-purple-600 opacity-80 blur-sm"
        />

        {/* Inner container */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(100, 255, 218, 0.3)',
              '0 0 30px rgba(108, 99, 255, 0.4)',
              '0 0 20px rgba(100, 255, 218, 0.3)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`relative ${currentSize.container} rounded-2xl bg-gradient-to-br from-devnest-mint to-devnest-indigo flex items-center justify-center overflow-hidden`}
        >
          {/* Animated shine effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />

          {/* Logo mark - stylized 'p' */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <Code2 className="text-white w-[60%] h-[60%]" strokeWidth={2.5} />
            </motion.div>

            {/* Sparkle effect */}
            <motion.div
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeOut",
              }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-outfit font-black tracking-tight"
        >
          <span className={`${currentSize.text} inline-block text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-devnest-mint group-hover:to-devnest-indigo transition-all duration-300`}>
            pojo
          </span>
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="text-devnest-mint text-xs ml-1"
          >
            .dev
          </motion.span>
        </motion.div>
      )}
    </div>
  );
};

export default Logo;
