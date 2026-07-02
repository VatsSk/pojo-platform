import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        isScrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-devnest-card border border-white/10 flex items-center justify-center group-hover:border-devnest-indigo transition-colors duration-300">
            <Terminal className="text-devnest-mint w-5 h-5" />
          </div>
          <span className="font-outfit font-bold text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-devnest-mint group-hover:to-devnest-indigo transition-all duration-300">
            pojo
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors duration-300 hover:text-devnest-mint \${
                  isActive ? 'text-white' : 'text-devnest-muted'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link 
            to="/contact" 
            className="px-6 py-2.5 rounded-full bg-white text-devnest-dark font-medium text-sm hover:bg-devnest-mint transition-colors duration-300"
          >
            Connect With Us
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-nav border-t border-white/5 py-4 px-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block text-lg font-medium \${
                    isActive ? 'text-devnest-mint' : 'text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 text-center rounded-lg bg-devnest-indigo text-white font-medium hover:bg-devnest-indigoHover transition-colors duration-300"
            >
              Connect With Us
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
