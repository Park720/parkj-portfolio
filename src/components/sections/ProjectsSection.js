'use client';

import { useState } from 'react';

const PROJECTS = [
  {
    title: '3D Platformer',
    type:  'game',
    engine:'Unity',
    mode:  'Solo',
    year:  '2025',
    desc:  'Procedurally generated levels with custom physics interactions. Built in Unity with C#.',
  },
  {
    title: 'Task Manager App',
    type:  'web',
    engine:'React',
    mode:  'Solo',
    year:  '2025',
    desc:  'Full-stack web app with React frontend, Node.js backend, and MongoDB.',
  },
  {
    title: 'Top-Down Shooter',
    type:  'game',
    engine:'Unreal',
    mode:  'Team',
    year:  '2024',
    desc:  'Custom AI behavior trees and dynamic audio systems. Developed with a team of 3.',
  },
  {
    title: 'Portfolio Website',
    type:  'web',
    engine:'Next.js',
    mode:  'Solo',
    year:  '2024',
    desc:  'Personal portfolio with animations, dark mode, and fully responsive layout.',
  },
];

const FILTERS = ['All', 'Game', 'Web', 'Solo', 'Jam'];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = PROJECTS.filter((p) => {
    if (activeFilter === 'All')  return true;
    if (activeFilter === 'Game') return p.type === 'game';
    if (activeFilter === 'Web')  return p.type === 'web';
    if (activeFilter === 'Solo') return p.mode === 'Solo';
    if (activeFilter === 'Jam')  return p.mode === 'Jam';
    return true;
  });

  return (
    <section id="projects">
      <div className="section">
        <div className="projects-header">
          <div>
            <p className="section-label">02</p>
            <h2 className="section-title">Projects</h2>
            <div className="section-divider" />
          </div>
        </div>

        {/* Filter tabs */}
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

        {/* Grid */}
        <div className="projects-grid">
          {filtered.map((p) => (
            <div
              key={p.title}
              className={`project-card${p.type === 'web' ? ' web' : ''}`}
            >
              <div className="project-card-img">Screenshot</div>
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
                <a className="project-card-link" href="#">View →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
