import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6">Our <span className="text-gradient">Story</span></h1>
          <p className="text-devnest-muted text-lg leading-relaxed">
            We are a team of experienced software engineers working in the IT industry who mentor, guide, and assist students with software projects, technical challenges, career preparation, and professional growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-outfit font-bold mb-6">Why we <span className="text-gradient">started</span></h2>
            <p className="text-devnest-muted leading-relaxed mb-6">
              We remember what it was like being a student—facing tight deadlines, cryptic errors, and confusion about industry standards. College curriculums often lag behind what's actually used in the real world.
            </p>
            <p className="text-devnest-muted leading-relaxed">
              We built pojo to bridge this gap. We want to be the seniors we wished we had. We don't just build projects for you; we mentor you so you can build them yourself and defend them confidently.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-4">
              <Target className="text-devnest-mint w-8 h-8" />
              <h3 className="font-bold text-white">Mission</h3>
              <p className="text-sm text-devnest-muted">Empower students to build industry-standard software.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-4 mt-8">
              <Users className="text-devnest-indigo w-8 h-8" />
              <h3 className="font-bold text-white">Community</h3>
              <p className="text-sm text-devnest-muted">A safe space to ask questions and grow.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
