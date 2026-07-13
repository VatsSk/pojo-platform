import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-devnest-mint/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-devnest-indigo/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-devnest-mint/10 flex items-center justify-center mx-auto mb-6 border border-devnest-mint/20">
            <ShieldCheck className="text-devnest-mint w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-outfit font-bold mb-6">Privacy <span className="text-gradient">Policy</span></h1>
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
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-mint font-bold">1</span>
              Information We Collect
            </h2>
            <p className="text-devnest-muted leading-relaxed pl-11">
              At pojo.dev, we collect information you provide directly to us when you use our contact forms or services. This includes your name, email address, phone number, and details regarding your college or project requirements. We only collect data that is strictly necessary to provide our premium mentoring and project services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-mint font-bold">2</span>
              How We Use Your Information
            </h2>
            <div className="pl-11">
              <p className="text-devnest-muted leading-relaxed mb-4">
                The information we collect is used in the following ways:
              </p>
              <ul className="list-none text-devnest-muted space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-devnest-mint mt-2 flex-shrink-0" />
                  <span>To communicate with you regarding your technical challenges or project requirements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-devnest-mint mt-2 flex-shrink-0" />
                  <span>To deliver personalized mentorship and code solutions tailored to your needs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-devnest-mint mt-2 flex-shrink-0" />
                  <span>To send you important administrative emails, such as service updates or policy changes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-devnest-mint mt-2 flex-shrink-0" />
                  <span>To improve our platform and user experience.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-mint font-bold">3</span>
              Data Security and Privacy
            </h2>
            <p className="text-devnest-muted leading-relaxed pl-11">
              We implement industry-standard security measures to protect your personal information. Your data is never sold, traded, or rented to third-party companies. All code, project ideas, and academic information shared with pojo.dev remains strictly confidential between you and our mentors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-devnest-mint font-bold">4</span>
              Contact Us
            </h2>
            <p className="text-devnest-muted leading-relaxed pl-11">
              If you have any questions or concerns about this Privacy Policy, please contact us at:<br/>
              <a href="mailto:pojo.platform@gmail.com" className="text-devnest-indigo hover:text-devnest-mint transition-colors font-semibold mt-3 inline-block bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:border-devnest-mint/50">
                pojo.platform@gmail.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
