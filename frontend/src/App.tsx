import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

// Layout
import Layout from './components/layout/Layout';

// Widgets
import ChatWidget from './components/ui/ChatWidget';
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import QuickNavigation from './components/ui/QuickNavigation';

// Pages (We'll create these next)
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Smooth Scrolling Setup Component
const SmoothScrolling = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

const GlobalWidgets = () => {
  const { pathname } = useLocation();
  if (pathname.includes('/devnest-secure-admin')) return null;
  
  return (
    <>
      <QuickNavigation />
      <ChatWidget />
      <WhatsAppWidget />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalWidgets />
      <SmoothScrolling>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetails />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
          </Route>
          
          <Route path="/devnest-secure-admin" element={<AdminLogin />} />
          <Route path="/devnest-secure-admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </SmoothScrolling>
    </Router>
  );
}

export default App;
