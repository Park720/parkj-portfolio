'use client';

import { useState, useEffect, useCallback } from 'react';

const EMPTY_FORM = {
  title: '', type: 'game', engine: '', mode: 'Solo',
  year: new Date().getFullYear().toString(), desc: '', longDesc: '',
  role: '', duration: '', youtube: '', github: '', live: '', order: '0',
};

// ── Small helpers ─────────────────────────────────────────────────────
function Field({ label, name, value, onChange, type = 'text', placeholder = '', required = false }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

function TextArea({ label, name, value, onChange, rows = 4, placeholder = '', required = false }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        required={required}
        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      <select name={name} value={value} onChange={onChange} style={inputStyle}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const labelStyle = {
  display: 'block', fontSize: 11, fontWeight: 700,
  letterSpacing: '1px', textTransform: 'uppercase',
  color: '#888', marginBottom: 5,
};
const inputStyle = {
  width: '100%', padding: '8px 10px', fontSize: 14,
  border: '1px solid #ddd', borderRadius: 3,
  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
};

// ── Main admin page ───────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword]     = useState('');
  const [authed, setAuthed]         = useState(false);
  const [authError, setAuthError]   = useState('');

  const [projects, setProjects]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');

  const [form, setForm]             = useState(EMPTY_FORM);
  const [editingId, setEditingId]   = useState(null);  // null = new project
  const [showForm, setShowForm]     = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Load projects once authed
  const loadProjects = useCallback(async (pwd) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!res.ok) {
        setError(`DB error: ${data.error || res.status}. Make sure DATABASE_URL is set and you ran: npx prisma migrate dev`);
        setProjects([]);
      } else {
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch {
      setError('Failed to load projects. Check your DATABASE_URL.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check password (just tries an API call)
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.status === 401) {
        setAuthError('Wrong password.');
        return;
      }
      if (!res.ok) {
        setAuthError('Server error. Check ADMIN_PASSWORD env var.');
        return;
      }
      setAuthed(true);
      loadProjects(password);
    } catch {
      setAuthError('Could not connect to server.');
    }
  };

  const apiHeaders = () => ({
    'Content-Type': 'application/json',
    'x-admin-key': password,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openNew = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setError('');
  };

  const openEdit = (p) => {
    setForm({
      title:    p.title,
      type:     p.type,
      engine:   p.engine,
      mode:     p.mode,
      year:     p.year,
      desc:     p.desc,
      longDesc: p.longDesc,
      role:     p.role,
      duration: p.duration,
      youtube:  p.youtube  ?? '',
      github:   p.github   ?? '',
      live:     p.live     ?? '',
      order:    String(p.order ?? 0),
    });
    setEditingId(p.id);
    setShowForm(true);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      order: Number(form.order) || 0,
      youtube:  form.youtube  || null,
      github:   form.github   || null,
      live:     form.live     || null,
    };

    try {
      const url    = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: apiHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      await loadProjects(password);
      setShowForm(false);
      setForm(EMPTY_FORM);
      setEditingId(null);
    } catch (err) {
      setError('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: apiHeaders(),
      });
      await loadProjects(password);
      setDeleteConfirm(null);
    } catch {
      setError('Delete failed.');
    } finally {
      setSaving(false);
    }
  };

  // ── Login screen ────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F3EE' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: 40, width: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Admin</h1>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Portfolio Project Manager</p>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter ADMIN_PASSWORD"
            style={{ ...inputStyle, marginBottom: 16 }}
            autoFocus
          />
          {authError && <p style={{ color: '#C75B39', fontSize: 13, marginBottom: 12 }}>{authError}</p>}
          <button type="submit" style={btnPrimaryStyle}>Enter →</button>
        </form>
      </div>
    );
  }

  // ── Admin UI ─────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh', fontFamily: 'Calibri, Segoe UI, sans-serif' }}>
      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #D9D5CE', padding: '0 40px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" style={{ fontSize: 13, color: '#C75B39', fontWeight: 700, textDecoration: 'none' }}>← Portfolio</a>
          <span style={{ color: '#D9D5CE' }}>|</span>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Project Manager</span>
        </div>
        <button onClick={openNew} style={btnPrimaryStyle}>+ Add Project</button>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {error && (
          <div style={{ background: '#FEE', border: '1px solid #C75B39', color: '#C75B39', padding: '10px 14px', marginBottom: 20, fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* ── Form ──────────────────────────────────────────────── */}
        {showForm && (
          <div style={{ background: '#fff', padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>
                {editingId ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#aaa' }}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Title" name="title" value={form.title} onChange={handleChange} required placeholder="My Game" />
                <Field label="Engine / Stack" name="engine" value={form.engine} onChange={handleChange} required placeholder="Unity / React" />
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px', gap: 16 }}>
                <Select label="Type" name="type" value={form.type} onChange={handleChange} options={['game', 'web']} />
                <Select label="Mode" name="mode" value={form.mode} onChange={handleChange} options={['Solo', 'Team', 'Jam']} />
                <Field label="Year" name="year" value={form.year} onChange={handleChange} required placeholder="2025" />
                <Field label="Order" name="order" value={form.order} onChange={handleChange} type="number" placeholder="0" />
              </div>

              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Role" name="role" value={form.role} onChange={handleChange} required placeholder="Solo Developer" />
                <Field label="Duration" name="duration" value={form.duration} onChange={handleChange} required placeholder="4 weeks" />
              </div>

              <TextArea label="Short Description (card)" name="desc" value={form.desc} onChange={handleChange} rows={2} required placeholder="One-line summary shown on the card." />
              <TextArea label="Full Description (modal)" name="longDesc" value={form.longDesc} onChange={handleChange} rows={5} required placeholder="Detailed description shown in the modal popup." />

              {/* Links */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <Field label="YouTube Video ID" name="youtube" value={form.youtube} onChange={handleChange} placeholder="dQw4w9WgXcQ" />
                <Field label="GitHub URL" name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/..." />
                <Field label="Live URL" name="live" value={form.live} onChange={handleChange} placeholder="https://..." />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="submit" disabled={saving} style={{ ...btnPrimaryStyle, opacity: saving ? 0.6 : 1 }}>
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Project'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={btnOutlineStyle}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* ── Project list ────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{projects.length} Projects</h2>
          {loading && <span style={{ fontSize: 13, color: '#aaa' }}>Loading...</span>}
        </div>

        {projects.length === 0 && !loading && (
          <div style={{ background: '#fff', padding: 48, textAlign: 'center', color: '#aaa', fontSize: 14 }}>
            No projects yet. Click <strong>+ Add Project</strong> to get started.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {projects.map((p) => (
            <div key={p.id} style={{ background: '#fff', borderLeft: `4px solid ${p.type === 'web' ? '#4A7FA5' : '#C75B39'}`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 2,
                    background: p.type === 'web' ? '#E8F1F9' : '#F9EDE8',
                    color: p.type === 'web' ? '#4A7FA5' : '#C75B39',
                  }}>
                    {p.type === 'web' ? 'Web' : 'Game'}
                  </span>
                  <span style={{ fontSize: 11, color: '#aaa' }}>{p.engine} · {p.mode} · {p.year}</span>
                </div>
                <p style={{ fontSize: 13, color: '#888', margin: 0 }}>{p.desc}</p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {p.youtube && (
                  <span title="Has YouTube video" style={{ fontSize: 16 }}>▶</span>
                )}
                <button onClick={() => openEdit(p)} style={btnSmallStyle}>Edit</button>
                <button
                  onClick={() => setDeleteConfirm(p.id)}
                  style={{ ...btnSmallStyle, color: '#C75B39', borderColor: '#C75B39' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete confirm */}
        {deleteConfirm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
            <div style={{ background: '#fff', padding: 32, width: 340, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Delete project?</h3>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>This cannot be undone.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => handleDelete(deleteConfirm)} style={{ ...btnPrimaryStyle, background: '#C75B39' }}>Delete</button>
                <button onClick={() => setDeleteConfirm(null)} style={btnOutlineStyle}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const btnPrimaryStyle = {
  background: '#C75B39', color: '#fff', border: 'none',
  padding: '9px 20px', fontSize: 13, fontWeight: 700,
  cursor: 'pointer', fontFamily: 'inherit',
};
const btnOutlineStyle = {
  background: 'transparent', color: '#333',
  border: '1px solid #ccc', padding: '9px 20px',
  fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
};
const btnSmallStyle = {
  background: 'transparent', color: '#555',
  border: '1px solid #ccc', padding: '5px 12px',
  fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
};
