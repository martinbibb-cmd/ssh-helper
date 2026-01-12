import { useState, useEffect } from 'react';
import type { Host } from '../types';
import { getHosts, addHost, updateHost, deleteHost, exportHosts, importHosts } from '../utils/storage';
import { Toast } from '../components/Toast';
import './Hosts.css';

export const Hosts = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    host: '',
    port: '22',
    notes: ''
  });

  useEffect(() => {
    loadHosts();
  }, []);

  const loadHosts = () => {
    setHosts(getHosts());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.username || !formData.host) {
      setToast('Please fill in required fields');
      return;
    }

    const hostData = {
      name: formData.name,
      username: formData.username,
      host: formData.host,
      port: formData.port ? parseInt(formData.port) : undefined,
      notes: formData.notes || undefined
    };

    if (editingId) {
      updateHost(editingId, hostData);
      setToast('Host updated');
      setEditingId(null);
    } else {
      addHost(hostData);
      setToast('Host added');
    }

    resetForm();
    loadHosts();
  };

  const handleEdit = (host: Host) => {
    setFormData({
      name: host.name,
      username: host.username,
      host: host.host,
      port: host.port?.toString() || '22',
      notes: host.notes || ''
    });
    setEditingId(host.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this host?')) {
      deleteHost(id);
      setToast('Host deleted');
      loadHosts();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      host: '',
      port: '22',
      notes: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleExport = () => {
    const json = exportHosts();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ssh-hosts.json';
    a.click();
    URL.revokeObjectURL(url);
    setToast('Hosts exported');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importHosts(content);
      if (success) {
        setToast('Hosts imported');
        loadHosts();
      } else {
        setToast('Import failed');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="hosts-page">
      <div className="page-header">
        <h2>Saved Hosts</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleExport}>
            Export
          </button>
          <label className="btn-secondary file-button">
            Import
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Host'}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="host-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Host' : 'New Host'}</h3>

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. My Server"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="e.g. root"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="host">Host *</label>
              <input
                id="host"
                type="text"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                placeholder="e.g. 192.168.1.10"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="port">Port</label>
            <input
              id="port"
              type="number"
              value={formData.port}
              onChange={(e) => setFormData({ ...formData, port: e.target.value })}
              placeholder="22"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Optional notes..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="hosts-list">
        {hosts.length === 0 ? (
          <div className="empty-state">
            <p>No hosts saved yet.</p>
            <p>Add your first host to get started!</p>
          </div>
        ) : (
          hosts.map(host => (
            <div key={host.id} className="host-card">
              <div className="host-info">
                <h3>{host.name}</h3>
                <div className="host-details">
                  <code>{host.username}@{host.host}{host.port && host.port !== 22 ? `:${host.port}` : ''}</code>
                </div>
                {host.notes && <p className="host-notes">{host.notes}</p>}
              </div>
              <div className="host-actions">
                <button className="btn-edit" onClick={() => handleEdit(host)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(host.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};
