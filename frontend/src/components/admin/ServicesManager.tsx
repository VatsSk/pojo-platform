import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ServicesManager = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);

  const fetchServices = () => {
    fetch('http://localhost:8081/api/public/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data);
        }
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = currentService.id ? `http://localhost:8081/api/admin/services/${currentService.id}` : 'http://localhost:8081/api/admin/services';
    const method = currentService.id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(currentService)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsEditing(false);
        setCurrentService(null);
        fetchServices();
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    const token = localStorage.getItem('adminToken');
    fetch(`http://localhost:8081/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) fetchServices();
    });
  };

  if (isEditing) {
    return (
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">{currentService?.id ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
              value={currentService?.title || ''}
              onChange={e => setCurrentService({...currentService, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-24"
              value={currentService?.description || ''}
              onChange={e => setCurrentService({...currentService, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Icon Name (e.g. Laptop, Cpu, Server)</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
              value={currentService?.icon || ''}
              onChange={e => setCurrentService({...currentService, icon: e.target.value})}
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-devnest-mint text-devnest-dark px-6 py-2 rounded-lg font-bold">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg hover:bg-white/5">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Services</h2>
        <button 
          onClick={() => { setCurrentService({}); setIsEditing(true); }}
          className="flex items-center gap-2 bg-devnest-indigo text-white px-4 py-2 rounded-lg hover:bg-devnest-indigo/80 transition"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s, i) => (
          <div key={i} className="border border-white/10 p-4 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">{s.title}</h3>
              <p className="text-sm text-devnest-muted">{s.icon}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setCurrentService(s); setIsEditing(true); }} className="p-2 hover:bg-white/10 rounded-lg text-blue-400">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
