import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Star, ArrowLeft } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';
import AlertModal from '../ui/AlertModal';
import RichTextEditor from '../ui/RichTextEditor';

const EMPTY_PROJECT = {
  title: '', description: '', category: '', technologies: '',
  imageUrl: '', projectUrl: '', featured: false, isActive: true, features: []
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({ ...EMPTY_PROJECT });
  const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {}, isDestructive: false });
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '' });
  const hasFetched = useRef(false);

  const fetchProjects = () => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/projects`)
      .then(res => res.json())
      .then(data => { if (data.success) setProjects(data.data); })
      .catch(() => {});
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProjects();
  }, []);

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');
    setIsUploading(prev => ({ ...prev, [file.name]: true }));
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
      if (data.success) callback(data.data.url);
      else setAlertConfig({ isOpen: true, message: data.message || 'Upload failed' });
    } catch {
      setAlertConfig({ isOpen: true, message: 'Error uploading image' });
    } finally {
      setIsUploading(prev => ({ ...prev, [file.name]: false }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(isUploading).some(v => v)) return;
    setConfirmConfig({
      isOpen: true,
      title: currentProject.id ? 'Update Project' : 'Create Project',
      message: `Are you sure you want to ${currentProject.id ? 'update' : 'create'} this project?`,
      isDestructive: false,
      onConfirm: () => { setConfirmConfig(prev => ({ ...prev, isOpen: false })); executeSave(); }
    });
  };

  const executeSave = () => {
    const token = localStorage.getItem('adminToken');
    const url = currentProject.id
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/projects/${currentProject.id}`
      : `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/projects`;
    const method = currentProject.id ? 'PUT' : 'POST';
    const technologies = typeof currentProject.technologies === 'string'
      ? currentProject.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
      : (currentProject.technologies || []);
    const payload = { ...currentProject, technologies };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsEditing(false);
        setCurrentProject({ ...EMPTY_PROJECT });
        fetchProjects();
      } else {
        setAlertConfig({ isOpen: true, message: data.message || 'Save failed' });
      }
    })
    .catch(() => setAlertConfig({ isOpen: true, message: 'Network error while saving' }));
  };

  const handleDelete = (id: string) => {
    setConfirmConfig({
      isOpen: true, title: 'Delete Project',
      message: 'Are you sure you want to permanently delete this project?',
      isDestructive: true,
      onConfirm: () => { setConfirmConfig(prev => ({ ...prev, isOpen: false })); executeDelete(id); }
    });
  };

  const executeDelete = (id: string) => {
    const token = localStorage.getItem('adminToken');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/projects/${id}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => { if (data.success) fetchProjects(); });
  };

  const openEdit = (project: any) => {
    setCurrentProject({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || '')
    });
    setIsEditing(true);
  };

  // ——— EDIT / ADD FORM ———
  if (isEditing) {
    const uploading = Object.values(isUploading).some(v => v);
    return (
      <div className="glass-card p-6 rounded-2xl">
        <ConfirmModal {...confirmConfig} onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))} />
        <AlertModal {...alertConfig} onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} />

        <div className="flex items-center gap-4 mb-6">
          <button type="button" onClick={() => { setIsEditing(false); setCurrentProject({ ...EMPTY_PROJECT }); }}
            className="p-2 rounded-lg hover:bg-white/10 transition text-devnest-muted hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">{currentProject.id ? 'Edit Project' : 'Add New Project'}</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <input type="checkbox" id="isActiveP" className="w-5 h-5 accent-devnest-mint cursor-pointer"
              checked={currentProject.isActive !== false}
              onChange={e => setCurrentProject({ ...currentProject, isActive: e.target.checked })} />
            <label htmlFor="isActiveP" className="text-sm font-bold cursor-pointer">Project is Active (Visible to public)</label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-devnest-muted mb-1">Title *</label>
              <input type="text" required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
                placeholder="Project Name"
                value={currentProject.title || ''}
                onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-devnest-muted mb-1">Category *</label>
              <input type="text" required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
                placeholder="Web App, Mobile, etc."
                value={currentProject.category || ''}
                onChange={e => setCurrentProject({ ...currentProject, category: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-2">Description</label>
            <RichTextEditor
              value={currentProject.description || ''}
              onChange={val => setCurrentProject((p: any) => ({ ...p, description: val }))}
              placeholder="Describe the project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-1">Technologies (comma separated)</label>
            <input type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
              placeholder="React, Node.js, MongoDB"
              value={currentProject.technologies || ''}
              onChange={e => setCurrentProject({ ...currentProject, technologies: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-1">Main Image</label>
            <div className="flex gap-2">
              <input type="text"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
                placeholder="https://..."
                value={currentProject.imageUrl || ''}
                onChange={e => setCurrentProject({ ...currentProject, imageUrl: e.target.value })} />
              <label className="cursor-pointer bg-devnest-indigo text-white px-4 py-2 rounded-lg hover:bg-devnest-indigo/80 transition text-sm font-medium whitespace-nowrap">
                Upload Image
                <input type="file" className="hidden" accept="image/*"
                  onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], url => setCurrentProject((p: any) => ({ ...p, imageUrl: url }))); }} />
              </label>
            </div>
            {currentProject.imageUrl && <img src={currentProject.imageUrl} alt="preview" className="mt-2 h-24 rounded-lg object-cover border border-white/10" />}
          </div>

          <div>
            <label className="block text-sm font-medium text-devnest-muted mb-1">Hosted Project URL</label>
            <input type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-devnest-mint outline-none transition"
              placeholder="https://..."
              value={currentProject.projectUrl || ''}
              onChange={e => setCurrentProject({ ...currentProject, projectUrl: e.target.value })} />
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <input type="checkbox" id="featuredP" className="w-5 h-5 accent-devnest-mint cursor-pointer"
              checked={currentProject.featured || false}
              onChange={e => setCurrentProject({ ...currentProject, featured: e.target.checked })} />
            <label htmlFor="featuredP" className="text-sm font-bold cursor-pointer flex items-center gap-2">
              <Star size={16} className="text-yellow-400" /> Mark as Featured Project
            </label>
          </div>

          {/* Features / Gallery */}
          <div className="border-t border-white/10 pt-5">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-devnest-mint">Project Features / Gallery</label>
              <button type="button"
                onClick={() => setCurrentProject((p: any) => ({ ...p, features: [...(p.features || []), { featureText: '', imageUrl: '' }] }))}
                className="text-xs flex items-center gap-1 bg-devnest-mint/10 text-devnest-mint px-3 py-1.5 rounded-lg hover:bg-devnest-mint/20 transition">
                <Plus size={14} /> Add Feature
              </button>
            </div>
            <div className="space-y-4">
              {(currentProject.features || []).map((feature: any, index: number) => (
                <div key={index} className="border border-white/10 p-4 rounded-xl bg-black/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-devnest-muted font-medium">Feature #{index + 1}</span>
                    <button type="button"
                      onClick={() => setCurrentProject((p: any) => ({ ...p, features: p.features.filter((_: any, i: number) => i !== index) }))}
                      className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition"><Trash2 size={14} /></button>
                  </div>
                  <RichTextEditor
                    minHeight={100}
                    value={feature.featureText || ''}
                    onChange={val => {
                      const newFeatures = [...(currentProject.features || [])];
                      newFeatures[index] = { ...newFeatures[index], featureText: val };
                      setCurrentProject((p: any) => ({ ...p, features: newFeatures }));
                    }}
                    placeholder="Feature description..."
                  />
                  <div className="flex gap-2">
                    <input type="text" placeholder="Feature Image URL"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-devnest-mint outline-none"
                      value={feature.imageUrl || ''}
                      onChange={e => {
                        const newFeatures = [...(currentProject.features || [])];
                        newFeatures[index] = { ...newFeatures[index], imageUrl: e.target.value };
                        setCurrentProject((p: any) => ({ ...p, features: newFeatures }));
                      }} />
                    <label className="cursor-pointer bg-devnest-indigo text-white px-3 py-2 rounded-lg hover:bg-devnest-indigo/80 transition text-sm whitespace-nowrap">
                      Upload
                      <input type="file" className="hidden" accept="image/*"
                        onChange={e => {
                          if (e.target.files?.[0]) handleImageUpload(e.target.files[0], url => {
                            const newFeatures = [...(currentProject.features || [])];
                            newFeatures[index] = { ...newFeatures[index], imageUrl: url };
                            setCurrentProject((p: any) => ({ ...p, features: newFeatures }));
                          });
                        }} />
                    </label>
                  </div>
                  {feature.imageUrl && <img src={feature.imageUrl} alt="preview" className="h-20 rounded-lg object-cover border border-white/10" />}
                </div>
              ))}
              {(!currentProject.features || currentProject.features.length === 0) && (
                <p className="text-sm text-devnest-muted text-center py-6 bg-white/5 rounded-xl border border-dashed border-white/10">
                  No features yet. Click "Add Feature" to add gallery images.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-2 border-t border-white/10">
            <button type="submit" disabled={uploading}
              className="bg-devnest-mint text-devnest-dark px-8 py-2.5 rounded-lg font-bold hover:bg-devnest-mint/90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {uploading ? 'Uploading...' : (currentProject.id ? 'Update Project' : 'Create Project')}
            </button>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentProject({ ...EMPTY_PROJECT }); }}
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
        <h2 className="text-xl font-bold">Manage Projects</h2>
        <button onClick={() => { setCurrentProject({ ...EMPTY_PROJECT }); setIsEditing(true); }}
          className="flex items-center gap-2 bg-devnest-indigo text-white px-4 py-2 rounded-lg hover:bg-devnest-indigo/80 transition">
          <Plus size={18} /> Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <div key={p.id || i} className="border border-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/5 transition">
            <div className="flex items-center gap-3">
              {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" />}
              <div>
                <h3 className="font-bold flex items-center gap-2">
                  {p.title}
                  {p.featured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                  {p.isActive === false && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">Inactive</span>}
                </h3>
                <p className="text-sm text-devnest-muted">{p.category}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-devnest-muted bg-white/5 rounded-xl border border-dashed border-white/10">
            No projects yet. Click "Add Project" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;
