import { motion } from 'framer-motion';
import { Target, Users, Code, Award, Zap, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden bg-devnest-dark">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-devnest-indigo/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-devnest-mint/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-32 pt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-devnest-mint text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-devnest-mint animate-pulse" />
            Empowering the Next Generation
          </div>
          <h1 className="text-5xl md:text-8xl font-outfit font-black mb-8 leading-tight">
            Our <span className="text-gradient">Story</span>
          </h1>
          <p className="text-devnest-muted text-xl md:text-2xl leading-relaxed font-light">
            We are a collective of industry software engineers dedicated to mentoring, guiding, and assisting students to overcome technical hurdles and launch extraordinary careers.
          </p>
        </motion.div>

        {/* Why We Started */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-outfit font-bold leading-tight">Bridging the Gap Between <br/><span className="text-gradient">Classroom & Industry</span></h2>
            <div className="space-y-6 text-lg text-devnest-muted leading-relaxed">
              <p>
                We distinctly remember what it was like being a student—facing impossibly tight deadlines, cryptic compiler errors, and the overwhelming confusion of trying to meet industry standards that aren't taught in traditional curriculums.
              </p>
              <p>
                College curriculums often lag behind the rapid pace of the real-world tech industry. We built <span className="text-white font-semibold">pojo.dev</span> to bridge this massive gap. We wanted to become the senior mentors we desperately wished we had during our own college days.
              </p>
              <p>
                We don't just write code for you. We mentor you, explain the architecture, and ensure you can confidently defend your work in any presentation, interview, or viva.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" 
                alt="Team working together" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-devnest-dark via-transparent to-transparent opacity-80" />
            </div>
            

          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-16">Our Core <span className="text-gradient">Values</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { icon: Target, title: "Mission-Driven", desc: "Empowering students to build industry-standard software that stands out on their resumes.", color: "text-blue-400" },
              { icon: Users, title: "Community First", desc: "Fostering a safe, inclusive space where no question is too basic and everyone can grow.", color: "text-devnest-mint" },
              { icon: Code, title: "Code Excellence", desc: "Teaching modern best practices, clean architecture, and scalable design patterns.", color: "text-devnest-indigo" },
              { icon: Award, title: "Uncompromising Quality", desc: "Delivering premium, robust, and well-documented solutions every single time.", color: "text-yellow-400" },
              { icon: Zap, title: "Rapid Execution", desc: "Understanding the urgency of academic deadlines without sacrificing the quality of work.", color: "text-orange-400" },
              { icon: BookOpen, title: "Continuous Learning", desc: "Staying at the cutting edge of tech so we can pass that knowledge directly to you.", color: "text-pink-400" }
            ].map((value, idx) => (
              <div key={idx} className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${value.color}`}>
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-devnest-muted leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
