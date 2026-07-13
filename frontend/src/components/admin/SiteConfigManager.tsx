import React, { useState, useEffect } from 'react';
import ConfirmModal from '../ui/ConfirmModal';

const SiteConfigManager = () => {
  const [config, setConfig] = useState<any>({
    contactEmail: '',
    contactPhone: '',
    address: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    feedbacks: []
  });
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {}, isDestructive: false });

  const fetchConfig = () => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/site-config`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setConfig(data.data);
        }
      });
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmConfig({
      isOpen: true,
      title: 'Update Site Config',
      message: 'Are you sure you want to save the new site configuration settings?',
      isDestructive: false,
      onConfirm: () => {
        setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        executeSave();
      }
    });
  };

  const executeSave = () => {
    const token = localStorage.getItem('adminToken');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/site-config`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(config)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Wait for modal transition before alerting
        setTimeout(() => alert('Site Config Updated!'), 100);
        fetchConfig();
      }
    });
  };

  return (
    <div className="glass-card p-6 rounded-2xl relative">
      <ConfirmModal 
        {...confirmConfig} 
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      <h2 className="text-xl font-bold mb-6">Manage Site Config & Contact Info</h2>
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Contact Email</label>
          <input 
            type="email" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            value={config.contactEmail || ''}
            onChange={e => setConfig({...config, contactEmail: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contact Phone</label>
          <input 
            type="text" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            value={config.contactPhone || ''}
            onChange={e => setConfig({...config, contactPhone: e.target.value})}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Address</label>
          <textarea 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-20"
            value={config.address || ''}
            onChange={e => setConfig({...config, address: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Facebook URL</label>
          <input 
            type="url" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            value={config.facebookUrl || ''}
            onChange={e => setConfig({...config, facebookUrl: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Twitter URL</label>
          <input 
            type="url" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            value={config.twitterUrl || ''}
            onChange={e => setConfig({...config, twitterUrl: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">LinkedIn URL</label>
          <input 
            type="url" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            value={config.linkedinUrl || ''}
            onChange={e => setConfig({...config, linkedinUrl: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Instagram URL</label>
          <input 
            type="url" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            value={config.instagramUrl || ''}
            onChange={e => setConfig({...config, instagramUrl: e.target.value})}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Scrolling Feedbacks (One per line)</label>
          <textarea 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-32"
            value={config.feedbacks ? config.feedbacks.join('\n') : ''}
            onChange={e => setConfig({...config, feedbacks: e.target.value.split('\n').filter(f => f.trim() !== '')})}
            placeholder="User 1: Great service!&#10;User 2: Awesome project help!"
          />
        </div>
        <div className="md:col-span-2 mt-4">
          <button type="submit" className="bg-devnest-mint text-devnest-dark px-6 py-2 rounded-lg font-bold">Save Configuration</button>
        </div>
      </form>
    </div>
  );
};

export default SiteConfigManager;
