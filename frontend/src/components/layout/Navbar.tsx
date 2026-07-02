import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import Logo from '../ui/Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled ? 'top-4' : 'top-6'
        }`}
      >
        <motion.div
          animate={{
            width: isScrolled ? '90vw' : '95vw',
            maxWidth: isScrolled ? '1000px' : '1200px',
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="glass-nav rounded-full px-6 py-4 border border-white/10 shadow-2xl backdrop-blur-xl bg-devnest-darker/80"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="cursor-hover z-10">
              <Logo size="md" showText={true} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 relative">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="relative px-5 py-2 text-sm font-medium transition-colors duration-300 cursor-hover z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-devnest-mint/10 rounded-full border border-devnest-mint/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive ? 'text-devnest-mint' : 'text-devnest-muted hover:text-white'
                      }`}
                    >
                      {link.name}
                    </span>
                  </NavLink>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <MagneticButton
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-devnest-mint to-devnest-indigo text-white font-semibold text-sm shadow-lg shadow-devnest-mint/20 hover:shadow-devnest-mint/40 transition-shadow duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                Let's Talk
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white cursor-hover"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-md glass-nav rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-devnest-darker/90 z-40 py-6 px-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'text-devnest-mint bg-devnest-mint/10'
                        : 'text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 block px-6 py-3 text-center rounded-xl bg-gradient-to-r from-devnest-mint to-devnest-indigo text-white font-semibold hover:shadow-lg hover:shadow-devnest-mint/30 transition-shadow duration-300"
            >
              Let's Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
