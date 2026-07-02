import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ProjectsManager = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const fetchProjects = () => {
    fetch('http://localhost:8081/api/public/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
        }
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = currentProject.id ? `http://localhost:8081/api/admin/projects/${currentProject.id}` : 'http://localhost:8081/api/admin/projects';
    const method = currentProject.id ? 'PUT' : 'POST';

    // Parse technologies correctly from comma separated string
    const technologies = typeof currentProject.technologies === 'string' 
      ? currentProject.technologies.split(',').map((t: string) => t.trim()) 
      : currentProject.technologies;

    fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...currentProject, technologies })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsEditing(false);
        setCurrentProject(null);
        fetchProjects();
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('adminToken');
    fetch(`http://localhost:8081/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) fetchProjects();
    });
  };

  if (isEditing) {
    return (
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">{currentProject?.id ? 'Edit Project' : 'Add Project'}</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
              value={currentProject?.title || ''}
              onChange={e => setCurrentProject({...currentProject, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-24"
              value={currentProject?.description || ''}
              onChange={e => setCurrentProject({...currentProject, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
              value={currentProject?.category || ''}
              onChange={e => setCurrentProject({...currentProject, category: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Technologies (comma separated)</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
              value={currentProject?.technologies ? (Array.isArray(currentProject.technologies) ? currentProject.technologies.join(', ') : currentProject.technologies) : ''}
              onChange={e => setCurrentProject({...currentProject, technologies: e.target.value})}
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
        <h2 className="text-xl font-bold">Manage Projects</h2>
        <button 
          onClick={() => { setCurrentProject({}); setIsEditing(true); }}
          className="flex items-center gap-2 bg-devnest-indigo text-white px-4 py-2 rounded-lg hover:bg-devnest-indigo/80 transition"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <div key={i} className="border border-white/10 p-4 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">{p.title}</h3>
              <p className="text-sm text-devnest-muted">{p.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setCurrentProject(p); setIsEditing(true); }} className="p-2 hover:bg-white/10 rounded-lg text-blue-400">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
