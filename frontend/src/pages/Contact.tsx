import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Real implementation would call the Spring Boot API
  };

  return (
    <div className="pt-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6">Let's <span className="text-gradient">Connect</span></h1>
          <p className="text-devnest-muted text-lg leading-relaxed">
            Have a project deadline? Need guidance? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-devnest-mint/10 text-devnest-mint flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-devnest-muted mb-1">Email Us</h4>
                    <p className="text-white">hello@devnest.in</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-devnest-indigo/10 text-devnest-indigo flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-devnest-muted mb-1">Call / WhatsApp</h4>
                    <p className="text-white">+91 99999 99999</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-devnest-muted mb-1">Location</h4>
                    <p className="text-white">Remote & Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <AnimatePresence>
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-devnest-card z-10 flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-24 h-24 rounded-full bg-devnest-mint/20 text-devnest-mint flex items-center justify-center mb-6">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-outfit font-bold mb-4">Request Sent!</h3>
                    <p className="text-devnest-muted mb-8 max-w-md mx-auto">
                      Thank you for reaching out. An acknowledgement email has been sent to your inbox. Our team will contact you shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
                    >
                      Send Another Request
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-devnest-muted">Full Name *</label>
                    <input required type="text" className="w-full bg-devnest-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-devnest-muted">College/University *</label>
                    <input required type="text" className="w-full bg-devnest-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all" placeholder="XYZ College" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-devnest-muted">Email Address *</label>
                    <input required type="email" className="w-full bg-devnest-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-devnest-muted">Phone Number *</label>
                    <input required type="tel" className="w-full bg-devnest-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all" placeholder="+91 99999 99999" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-devnest-muted">What do you need help with? *</label>
                  <select required className="w-full bg-devnest-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all appearance-none">
                    <option value="" disabled selected>Select an option</option>
                    <option value="project_idea">Project Idea Consultation</option>
                    <option value="development">Project Development</option>
                    <option value="bug_fixing">Bug Fixing</option>
                    <option value="career">Career / Mock Interview</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-devnest-muted">Message *</label>
                  <textarea required rows={4} className="w-full bg-devnest-darker border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all resize-none" placeholder="Tell us more about your requirements..."></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl bg-devnest-indigo text-white font-bold text-lg hover:bg-devnest-indigoHover hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Request
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
