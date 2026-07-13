import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Mail, Phone } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = () => {
  const [siteConfig, setSiteConfig] = React.useState<any>({
    contactEmail: 'pojo.platform@gmail.com',
    contactPhone: '+91 8051142835',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    twitterUrl: 'https://twitter.com'
  });

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/site-config`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSiteConfig((prev: any) => ({ ...prev, ...data.data }));
        }
      })
      .catch(err => console.error(err));
  }, []);

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
            
            <div className="mt-6 flex flex-col gap-3">
              <a href={`mailto:${siteConfig.contactEmail}`} className="flex items-center gap-3 text-sm text-devnest-muted hover:text-devnest-mint transition-colors w-fit">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                {siteConfig.contactEmail}
              </a>
              <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-devnest-muted hover:text-devnest-mint transition-colors w-fit">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                {siteConfig.contactPhone}
              </a>
            </div>

            <div className="flex items-center gap-4 mt-8">
              {siteConfig.linkedinUrl && <SocialIcon Icon={LinkedinIcon} href={siteConfig.linkedinUrl} />}
              {siteConfig.instagramUrl && <SocialIcon Icon={InstagramIcon} href={siteConfig.instagramUrl} />}
              {siteConfig.twitterUrl && <SocialIcon Icon={TwitterIcon} href={siteConfig.twitterUrl} />}
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
