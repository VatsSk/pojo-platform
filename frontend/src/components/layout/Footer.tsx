import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Globe, MessageSquare, Share2, Hash } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-devnest-darker pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-devnest-card border border-white/10 flex items-center justify-center">
                <Terminal className="text-devnest-mint w-4 h-4" />
              </div>
              <span className="font-outfit font-bold text-xl tracking-tight text-white">
                pojo
              </span>
            </Link>
            <p className="text-devnest-muted max-w-md text-sm leading-relaxed">
              A premium platform created by industry software engineers to help engineering and college students confidently overcome technical challenges, build better projects, and prepare for their tech careers.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <SocialIcon Icon={Hash} href="#" />
              <SocialIcon Icon={MessageSquare} href="#" />
              <SocialIcon Icon={Share2} href="#" />
              <SocialIcon Icon={Globe} href="#" />
            </div>
          </div>
          
          <div>
            <h4 className="font-outfit font-semibold text-white mb-6">Platform</h4>
            <ul className="flex flex-col gap-3">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/services">Services</FooterLink>
              <FooterLink to="/projects">Projects</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-outfit font-semibold text-white mb-6">Legal</h4>
            <ul className="flex flex-col gap-3">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-devnest-muted text-sm">
            &copy; {new Date().getFullYear()} pojo. All rights reserved.
          </p>
          <p className="text-devnest-muted text-sm flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> for engineering students
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon, href }: { Icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-devnest-card border border-white/5 flex items-center justify-center text-devnest-muted hover:text-white hover:border-devnest-indigo hover:bg-devnest-indigo/10 transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="text-devnest-muted text-sm hover:text-devnest-mint transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
