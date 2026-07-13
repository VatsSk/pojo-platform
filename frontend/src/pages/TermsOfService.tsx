import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-devnest-indigo/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-devnest-mint/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-devnest-indigo/10 flex items-center justify-center mx-auto mb-6 border border-devnest-indigo/20">
            <FileText className="text-devnest-indigo w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-outfit font-bold mb-6">Terms of <span className="text-gradient">Service</span></h1>
          <p className="text-devnest-muted text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-3xl space-y-10"
        >
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-indigo font-bold">1</span>
              Acceptance of Terms
            </h2>
            <p className="text-devnest-muted leading-relaxed pl-11">
              By accessing and using pojo.dev, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-indigo font-bold">2</span>
              Service Description
            </h2>
            <p className="text-devnest-muted leading-relaxed pl-11">
              pojo.dev provides software project development, mentorship, and career guidance tailored for engineering and college students. We are committed to delivering high-quality, industry-standard code. However, our services are intended for educational and mentorship purposes. You are solely responsible for understanding and defending the work within your academic institution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-indigo font-bold">3</span>
              Intellectual Property
            </h2>
            <p className="text-devnest-muted leading-relaxed pl-11">
              The platform itself, including its original content, features, and functionality, are owned by pojo.dev. For custom projects built for clients, intellectual property rights are transferred to the client upon full payment, unless otherwise explicitly stated in a separate agreement.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-indigo font-bold">4</span>
              Refund Policy
            </h2>
            <p className="text-devnest-muted leading-relaxed pl-11">
              Due to the digital and labor-intensive nature of our services, refunds are handled on a case-by-case basis. If you are dissatisfied with a service, please contact us immediately so we can make it right.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
