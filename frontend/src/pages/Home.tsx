import EnhancedBackground from '../components/ui/EnhancedBackground';
import EnhancedHero from '../components/sections/EnhancedHero';
import ManifestoSection from '../components/sections/ManifestoSection';
import BentoGrid from '../components/sections/BentoGrid';
import TechStackOrbit from '../components/sections/TechStackOrbit';
import ProjectsCarousel from '../components/sections/ProjectsCarousel';
import ScrollingFeedback from '../components/sections/ScrollingFeedback';
import ImmersiveCTA from '../components/sections/ImmersiveCTA';

const Home = () => {
  return (
    <div className="bg-devnest-dark min-h-screen text-devnest-white overflow-hidden relative">
      <EnhancedBackground />
      <EnhancedHero />
      <ManifestoSection />
      <BentoGrid />
      <TechStackOrbit />
      <ProjectsCarousel />
      <ScrollingFeedback />
      <ImmersiveCTA />
    </div>
  );
};

export default Home;
