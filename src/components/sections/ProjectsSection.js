'use client';

import { useState, useEffect } from 'react';

const FILTERS = ['All', 'Game', 'Web', 'Solo', 'Jam'];

// ── Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const { title, type, engine, mode, year, longDesc } = project;
  const accentColor = type === 'web' ? 'var(--web)'    : 'var(--accent)';
  const accentBg    = type === 'web' ? 'var(--web-bg)' : 'var(--accent-bg)';

  let images = [];
  try { images = project.images ? JSON.parse(project.images) : []; } catch {}

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Left — media */}
        <div className="modal-media">
          {project.youtube ? (
            <iframe
              className="modal-video"
              src={`https://www.youtube.com/embed/${project.youtube}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="modal-img-placeholder">Screenshot / Video</div>
          )}
          {images.length > 0 && (
            <div className="modal-thumbnails">
              {images.map((src, i) => (
                <img key={i} src={src} alt={`${title} screenshot ${i + 1}`} className="modal-thumb" />
              ))}
            </div>
          )}
        </div>

        {/* Right — info */}
        <div className="modal-info">
          <div className="modal-tags">
            <span className="tag-type" style={{ background: accentBg, color: accentColor }}>
              {type === 'web' ? 'Web' : 'Game'}
            </span>
            <span className="tag-engine">{engine}</span>
            <span className="tag-engine">{mode}</span>
            <span className="tag-year">{year}</span>
          </div>

          <h2 className="modal-title" style={{ borderLeftColor: accentColor }}>{title}</h2>
          <p className="modal-longdesc">{longDesc}</p>

          <div className="modal-meta">
            {[
              ['Role',     project.role],
              ['Engine',   project.engine],
              ['Duration', project.duration],
            ].map(([k, v]) => (
              <div className="modal-meta-row" key={k}>
                <span className="modal-meta-key">{k}</span>
                <span className="modal-meta-val">{v}</span>
              </div>
            ))}
          </div>

          <div className="modal-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="modal-link-btn" style={{ borderColor: accentColor, color: accentColor }}>
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="modal-link-btn modal-link-filled" style={{ background: accentColor }}>
                Live Site ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [projects, setProjects]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [activeFilter, setActiveFilter]       = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(async (r) => {
        if (!r.ok) throw new Error(`API error ${r.status}`);
        return r.json();
      })
      .then((data) => {
        // Guard: API might return an error object instead of array
        if (Array.isArray(data)) setProjects(data);
      })
      .catch((err) => console.error('Failed to load projects:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    if (activeFilter === 'All')  return true;
    if (activeFilter === 'Game') return p.type === 'game';
    if (activeFilter === 'Web')  return p.type === 'web';
    if (activeFilter === 'Solo') return p.mode === 'Solo';
    if (activeFilter === 'Jam')  return p.mode === 'Jam';
    return true;
  });

  return (
    <>
      <section id="projects">
        <div className="section">
          <p className="section-label">02</p>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" />

          <div className="projects-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <p style={{ color: 'var(--ink-faint)', fontSize: 14, padding: '40px 0' }}>
              Loading projects...
            </p>
          ) : filtered.length === 0 ? (
            <p style={{ color: 'var(--ink-faint)', fontSize: 14, padding: '40px 0' }}>
              No projects found.
            </p>
          ) : (
            <div className="projects-grid">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className={`project-card${p.type === 'web' ? ' web' : ''}`}
                  onClick={() => setSelectedProject(p)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* YouTube thumbnail if available, otherwise placeholder */}
                  <div className="project-card-img">
                    {p.youtube ? (
                      <img
                        src={`https://img.youtube.com/vi/${p.youtube}/mqdefault.jpg`}
                        alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : 'Screenshot'}
                  </div>
                  <div className="project-card-body">
                    <div className="project-card-tags">
                      <span className={`tag-type ${p.type}`}>
                        {p.type === 'game' ? 'Game' : 'Web'}
                      </span>
                      <span className="tag-engine">{p.engine}</span>
                      <span className="tag-year">{p.year}</span>
                    </div>
                    <h3 className="project-card-title">{p.title}</h3>
                    <p className="project-card-desc">{p.desc}</p>
                    <span className="project-card-link">View Details →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
