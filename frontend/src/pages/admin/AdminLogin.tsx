import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        navigate('/devnest-secure-admin/dashboard');
      } else {
        alert("Login failed. Check credentials.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-devnest-dark flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-md w-full p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-devnest-mint to-devnest-indigo" />
        
        <div className="w-16 h-16 rounded-2xl bg-devnest-darker border border-white/10 flex items-center justify-center mb-8 mx-auto text-devnest-mint">
          <Lock size={32} />
        </div>
        
        <h2 className="text-3xl font-outfit font-bold text-center mb-2">Admin Access</h2>
        <p className="text-devnest-muted text-center mb-8 text-sm">Secure authorization required</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-devnest-muted ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-devnest-muted w-5 h-5" />
              <input 
                required
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-devnest-darker border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all" 
                placeholder="admin@pojo.dev" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-devnest-muted ml-1">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-devnest-muted w-5 h-5" />
              <input 
                required
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-devnest-darker border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-devnest-mint focus:ring-1 focus:ring-devnest-mint transition-all" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl bg-devnest-indigo text-white font-bold hover:bg-devnest-indigoHover transition-all duration-300 disabled:opacity-50 mt-4"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
