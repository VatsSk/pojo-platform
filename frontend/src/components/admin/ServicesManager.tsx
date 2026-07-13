import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';
import AlertModal from '../ui/AlertModal';
import RichTextEditor from '../ui/RichTextEditor';

const EMPTY_SERVICE = {
  title: '', description: '', icon: '', tags: '',
  pricing: '', pricingOptions: '', imageUrl: '', isActive: true
};

const ServicesManager = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>({ ...EMPTY_SERVICE });
  const [isUploading, setIsUploading] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {}, isDestructive: false });
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '' });
  const hasFetched = useRef(false);

  const fetchServices = () => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/services`)
      .then(res => res.json())
      .then(data => { if (data.success) setServices(data.data); })
      .catch(() => {});
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchServices();
  }, []);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.status === 401 || res.status === 403) {
        setAlertConfig({ isOpen: true, message: 'Session expired. Please log in again.' });
        return;
      }
      const data = await res.json();
      if (data.success) setCurrentService((s: any) => ({ ...s, imageUrl: data.data.url }));
      else setAlertConfig({ isOpen: true, message: data.message || 'Upload failed' });
    } catch {
      setAlertConfig({ isOpen: true, message: 'Error uploading image' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    setConfirmConfig({
      isOpen: true,
      title: currentService.id ? 'Update Service' : 'Create Service',
      message: `Are you sure you want to ${currentService.id ? 'update' : 'create'} this service?`,
      isDestructive: false,
      onConfirm: () => { setConfirmConfig(prev => ({ ...prev, isOpen: false })); executeSave(); }
    });
  };

  const executeSave = () => {
    const token = localStorage.getItem('adminToken');
    const url = currentService.id
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/services/${currentService.id}`
      : `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/services`;
    const method = currentService.id ? 'PUT' : 'POST';

    const tags = typeof currentService.tags === 'string'
      ? currentService.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : (currentService.tags || []);
    const pricingOptions = typeof currentService.pricingOptions === 'string'
      ? currentService.pricingOptions.split('\n').map((p: string) => p.trim()).filter(Boolean)
      : (currentService.pricingOptions || []);
    const payload = { ...currentService, tags, pricingOptions };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsEditing(false);
        setCurrentService({ ...EMPTY_SERVICE });
        fetchServices();
      } else {
        setAlertConfig({ isOpen: true, message: data.message || 'Save failed' });
      }
    })
    .catch(() => setAlertConfig({ isOpen: true, message: 'Network error while saving' }));
  };

  const handleDelete = (id: string) => {
    setConfirmConfig({
      isOpen: true, title: 'Delete Service',
      message: 'Are you sure you want to permanently delete this service?',
      isDestructive: true,
      onConfirm: () => { setConfirmConfig(prev => ({ ...prev, isOpen: false })); executeDelete(id); }
    });
  };

  const executeDelete = (id: string) => {
    const token = localStorage.getItem('adminToken');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/services/${id}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => { if (data.success) fetchServices(); });
  };

  const openEdit = (service: any) => {
    setCurrentService({
      ...service,
      tags: Array.isArray(service.tags) ? service.tags.join(', ') : (service.tags || ''),
      pricingOptions: Array.isArray(service.pricingOptions) ? service.pricingOptions.join('\n') : (service.pricingOptions || '')
    });
    setIsEditing(true);
  };

  // ——— EDIT / ADD FORM ———
  if (isEditing) {
    return (
      <div className="glass-card p-6 rounded-2xl">
        <ConfirmModal {...confirmConfig} onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))} />
        <AlertModal {...alertConfig} onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} />

        <div className="flex items-center gap-4 mb-6">
          <button type="button" onClick={() => { setIsEditing(false); setCurrentService({ ...EMPTY_SERVICE }); }}
            className="p-2 rounded-lg hover:bg-white/10 transition text-devnest-muted hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">{currentService.id ? 'Edit Service' : 'Add New Service'}</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <input type="checkbox" id="isActiveS" className="w-5 h-5 accent-devnest-mint cursor-pointer"
              checked={currentService.isActive !== false}
              onChange={e => setCurrentService({ ...currentService, isActive: e.target.checked })} />
            <label htmlFor="isActiveS" className="text-sm font-bold cursor-pointer">Service is Active (Visible to public)</label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-devnest-muted mb-1">Title *</label>
              <input type="text" required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
                placeholder="Service Name"
                value={currentService.title || ''}
                onChange={e => setCurrentService({ ...currentService, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-devnest-muted mb-1">Icon Name</label>
              <input type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
                placeholder="Code, Server, Cpu..."
                value={currentService.icon || ''}
                onChange={e => setCurrentService({ ...currentService, icon: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-2">Description</label>
            <RichTextEditor
              value={currentService.description || ''}
              onChange={val => setCurrentService((s: any) => ({ ...s, description: val }))}
              placeholder="Describe this service..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-1">Tags (comma separated)</label>
            <input type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
              placeholder="Web Dev, React, Node.js"
              value={currentService.tags || ''}
              onChange={e => setCurrentService({ ...currentService, tags: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-1">Pricing Options (one per line)</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-24 text-white focus:border-devnest-mint outline-none resize-none transition"
              placeholder={"Basic: ₹499\nPro: ₹999\nEnterprise: ₹1999"}
              value={currentService.pricingOptions || ''}
              onChange={e => setCurrentService({ ...currentService, pricingOptions: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-1">Service Image</label>
            <div className="flex gap-2">
              <input type="text"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
                placeholder="https://..."
                value={currentService.imageUrl || ''}
                onChange={e => setCurrentService({ ...currentService, imageUrl: e.target.value })} />
              <label className="cursor-pointer bg-devnest-indigo text-white px-4 py-2 rounded-lg hover:bg-devnest-indigo/80 transition text-sm font-medium whitespace-nowrap">
                {isUploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" className="hidden" accept="image/*" disabled={isUploading}
                  onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
              </label>
            </div>
            {currentService.imageUrl && <img src={currentService.imageUrl} alt="preview" className="mt-2 h-24 rounded-lg object-cover border border-white/10" />}
          </div>

          <div className="flex gap-4 pt-2 border-t border-white/10">
            <button type="submit" disabled={isUploading}
              className="bg-devnest-mint text-devnest-dark px-8 py-2.5 rounded-lg font-bold hover:bg-devnest-mint/90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {isUploading ? 'Uploading...' : (currentService.id ? 'Update Service' : 'Create Service')}
            </button>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentService({ ...EMPTY_SERVICE }); }}
              className="px-6 py-2.5 rounded-lg hover:bg-white/10 transition text-devnest-muted">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  // ——— LIST VIEW ———
  return (
    <div className="glass-card p-6 rounded-2xl">
      <ConfirmModal {...confirmConfig} onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))} />
      <AlertModal {...alertConfig} onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Services</h2>
        <button onClick={() => { setCurrentService({ ...EMPTY_SERVICE }); setIsEditing(true); }}
          className="flex items-center gap-2 bg-devnest-indigo text-white px-4 py-2 rounded-lg hover:bg-devnest-indigo/80 transition">
          <Plus size={18} /> Add Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, i) => (
          <div key={service.id || i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition">
            <div className="flex items-center gap-3 min-w-0">
              {service.imageUrl && <img src={service.imageUrl} alt={service.title} className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" />}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold truncate">{service.title}</h3>
                  {!service.isActive && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30 shrink-0">Inactive</span>}
                </div>
                <div className="text-sm text-devnest-muted truncate line-clamp-1" dangerouslySetInnerHTML={{ __html: service.description }}></div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0 ml-2">
              <button onClick={() => openEdit(service)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="col-span-full text-center py-12 text-devnest-muted bg-white/5 rounded-xl border border-dashed border-white/10">
            No services yet. Click "Add Service" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManager;
