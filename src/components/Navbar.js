'use client';

import { useEffect, useState, useCallback } from 'react';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills' },
  { id: 'contact',  label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');

  // Use IntersectionObserver to track which section is in view
  useEffect(() => {
    const observers = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        {
          // Trigger when section enters the top 20% of the viewport
          rootMargin: '-10% 0px -75% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 56;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <a className="navbar-logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
          <span className="navbar-logo-initials">JP</span>
          <span className="navbar-logo-divider" />
          <span className="navbar-logo-sub">Game Dev &amp; Web Dev</span>
        </a>

        {/* Nav links */}
        <div className="navbar-links">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`navbar-link${active === id ? ' active' : ''}`}
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label} section`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
