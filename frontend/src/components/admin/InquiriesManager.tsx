import { useState, useEffect, useRef } from 'react';
import { Users, Clock } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';
import AlertModal from '../ui/AlertModal';

const InquiriesManager = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('NEWEST');
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {}, confirmText: '', isDestructive: false });
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '' });
  const hasFetched = useRef(false);

  const fetchContacts = () => {
    const token = localStorage.getItem('adminToken');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/contacts`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('adminToken');
        window.location.href = '/devnest-secure-admin';
        throw new Error('Unauthorized');
      }
      return res.json();
    })
    .then(data => {
      if(data.success) {
        setContacts(data.data);
      }
    })
    .catch(err => {
      console.error(err);
      setAlertConfig({ isOpen: true, message: 'Failed to fetch inquiries.' });
    });
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchContacts();
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    const token = localStorage.getItem('adminToken');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/admin/contacts/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        fetchContacts();
      } else {
        setAlertConfig({ isOpen: true, message: data.message || 'Failed to update status' });
      }
    })
    .catch(() => {
      setAlertConfig({ isOpen: true, message: 'Error updating status' });
    });
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Update Status',
      message: `Are you sure you want to mark this inquiry as ${newStatus}?`,
      confirmText: 'Yes, update',
      isDestructive: false,
      onConfirm: () => {
        setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        updateStatus(id, newStatus);
      }
    });
  };

  const filteredContacts = contacts.filter(c => filter === 'ALL' || c.status === filter)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'NEWEST' ? dateB - dateA : dateA - dateB;
    });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString();
  };

  const getTimeAgo = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <>
      <ConfirmModal 
        {...confirmConfig} 
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      <AlertModal 
        {...alertConfig} 
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Users className="text-devnest-mint" />
            <h3 className="font-bold">Total Inquiries</h3>
          </div>
          <p className="text-4xl font-outfit font-bold">{contacts.length}</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="text-amber-500" />
            <h3 className="font-bold">Pending Inquiries</h3>
          </div>
          <p className="text-4xl font-outfit font-bold text-amber-500">{contacts.filter(c => c.status === 'PENDING' || !c.status).length}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 bg-white/5 border border-white/5 p-4 rounded-2xl">
        <div className="flex gap-4 items-center flex-wrap">
           <select className="bg-devnest-darker border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-devnest-mint" value={filter} onChange={e => setFilter(e.target.value)}>
             <option value="ALL">All Status</option>
             <option value="PENDING">Pending</option>
             <option value="IN_PROGRESS">In Progress</option>
             <option value="RESOLVED">Resolved</option>
             <option value="CLOSED">Closed</option>
           </select>
           <select className="bg-devnest-darker border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-devnest-mint" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
             <option value="NEWEST">Newest First</option>
             <option value="OLDEST">Oldest First</option>
           </select>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl">
        <h2 className="text-xl font-bold mb-6">Recent Contact Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-devnest-muted text-sm">
                <th className="pb-4 font-medium min-w-[200px]">Contact Details</th>
                <th className="pb-4 font-medium min-w-[250px]">Concern & Message</th>
                <th className="pb-4 font-medium min-w-[150px]">Timing</th>
                <th className="pb-4 font-medium min-w-[100px]">Status</th>
                <th className="pb-4 font-medium text-right min-w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 pr-4">
                    <p className="font-bold text-white">{c.name}</p>
                    <p className="text-sm text-devnest-muted">{c.email}</p>
                    <p className="text-sm text-devnest-muted">{c.phone}</p>
                    {c.college && <p className="text-xs text-devnest-mint mt-1 bg-devnest-mint/10 w-fit px-2 py-0.5 rounded">{c.college}</p>}
                  </td>
                  <td className="py-4 pr-4 max-w-xs">
                    <p className="font-semibold text-xs mb-1 bg-white/10 w-fit px-2 py-1 rounded text-white">{c.concern}</p>
                    <p className="text-sm text-devnest-muted line-clamp-2" title={c.message}>{c.message}</p>
                  </td>
                  <td className="py-4 pr-4 text-sm text-devnest-muted">
                    <p className="text-white font-medium">{getTimeAgo(c.createdAt)}</p>
                    <p className="text-xs mt-1 text-devnest-muted opacity-70">Updated: {formatDate(c.updatedAt)}</p>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      (!c.status || c.status === 'PENDING') ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20' :
                      c.status === 'RESOLVED' ? 'bg-green-500/20 text-green-500 border border-green-500/20' :
                      c.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/20' :
                      'bg-gray-500/20 text-gray-400 border border-gray-500/20'
                    }`}>
                      {c.status || 'PENDING'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex gap-2 justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      {c.status !== 'RESOLVED' && (
                        <button onClick={() => handleUpdateStatus(c.id, 'RESOLVED')} className="text-xs bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20 px-3 py-1.5 rounded-lg font-medium transition-colors">Resolve</button>
                      )}
                      {c.status !== 'PENDING' && (
                        <button onClick={() => handleUpdateStatus(c.id, 'PENDING')} className="text-xs bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20 px-3 py-1.5 rounded-lg font-medium transition-colors">Pending</button>
                      )}
                      {c.status !== 'IN_PROGRESS' && (
                        <button onClick={() => handleUpdateStatus(c.id, 'IN_PROGRESS')} className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg font-medium transition-colors">In Progress</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-devnest-muted bg-white/5 rounded-xl mt-4">
                    <p className="text-lg mb-2">No requests found</p>
                    <p className="text-sm">Try changing your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InquiriesManager;
