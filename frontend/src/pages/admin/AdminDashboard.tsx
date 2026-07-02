import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, Activity, FolderGit2, Blocks, Settings } from 'lucide-react';
import ProjectsManager from '../../components/admin/ProjectsManager';
import ServicesManager from '../../components/admin/ServicesManager';
import SiteConfigManager from '../../components/admin/SiteConfigManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('inquiries');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/devnest-secure-admin');
      return;
    }

    fetch('http://localhost:8081/api/admin/contacts', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        setContacts(data.data);
      }
    })
    .catch(err => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/devnest-secure-admin');
  };

  return (
    <div className="min-h-screen bg-devnest-dark text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8 bg-devnest-card p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-devnest-indigo/20 flex items-center justify-center text-devnest-indigo">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-outfit">Admin Dashboard</h1>
              <p className="text-devnest-muted text-sm">System Overview & Management</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </header>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button onClick={() => setActiveTab('inquiries')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${activeTab === 'inquiries' ? 'bg-devnest-mint text-devnest-dark' : 'bg-white/5 text-devnest-muted hover:bg-white/10'}`}>
            <Users size={18} /> Inquiries
          </button>
          <button onClick={() => setActiveTab('projects')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${activeTab === 'projects' ? 'bg-devnest-mint text-devnest-dark' : 'bg-white/5 text-devnest-muted hover:bg-white/10'}`}>
            <FolderGit2 size={18} /> Projects
          </button>
          <button onClick={() => setActiveTab('services')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${activeTab === 'services' ? 'bg-devnest-mint text-devnest-dark' : 'bg-white/5 text-devnest-muted hover:bg-white/10'}`}>
            <Blocks size={18} /> Services
          </button>
          <button onClick={() => setActiveTab('config')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${activeTab === 'config' ? 'bg-devnest-mint text-devnest-dark' : 'bg-white/5 text-devnest-muted hover:bg-white/10'}`}>
            <Settings size={18} /> Site Config
          </button>
        </div>

        {activeTab === 'inquiries' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="text-devnest-mint" />
                  <h3 className="font-bold">Total Inquiries</h3>
                </div>
                <p className="text-4xl font-outfit font-bold">{contacts.length}</p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <h2 className="text-xl font-bold mb-6">Recent Contact Requests</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-devnest-muted text-sm">
                      <th className="pb-4 font-medium">Name</th>
                      <th className="pb-4 font-medium">College</th>
                      <th className="pb-4 font-medium">Email</th>
                      <th className="pb-4 font-medium">Phone</th>
                      <th className="pb-4 font-medium">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 pr-4">{c.name}</td>
                        <td className="py-4 pr-4 text-devnest-muted">{c.college}</td>
                        <td className="py-4 pr-4">{c.email}</td>
                        <td className="py-4 pr-4">{c.phone}</td>
                        <td className="py-4 text-sm text-devnest-muted max-w-xs truncate">{c.message}</td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-devnest-muted">No requests found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'services' && <ServicesManager />}
        {activeTab === 'config' && <SiteConfigManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;
