import React, { useState, useEffect } from 'react';

const SiteConfigManager = () => {
  const [config, setConfig] = useState<any>({
    contactEmail: '',
    contactPhone: '',
    address: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    instagramUrl: ''
  });

  const fetchConfig = () => {
    fetch('http://localhost:8081/api/public/site-config')
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
    const token = localStorage.getItem('adminToken');
    fetch('http://localhost:8081/api/admin/site-config', {
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
        alert('Site Config Updated!');
        fetchConfig();
      }
    });
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
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
        <div className="md:col-span-2 mt-4">
          <button type="submit" className="bg-devnest-mint text-devnest-dark px-6 py-2 rounded-lg font-bold">Save Configuration</button>
        </div>
      </form>
    </div>
  );
};

export default SiteConfigManager;
