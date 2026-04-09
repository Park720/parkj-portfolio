'use client';

export default function HomeSection() {
  return (
    <section id="home">
      <div className="section home-section">
        {/* Left */}
        <div>
          <span className="home-badge">Portfolio</span>
          <h1 className="home-name">
            Junhyung<br />Park.
          </h1>
          <div className="home-divider" />
          <p className="home-subtitle">Game Dev &amp; Web Dev · Purdue University</p>
          <p className="home-bio">
            Building games and web experiences through<br />
            code, creativity, and interactive design.
          </p>
          <div className="home-buttons">
            <a
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              href="#projects"
            >
              View Projects
            </a>
            <a
              className="btn-outline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              href="#contact"
            >
              Contact
            </a>
          </div>
          <p className="home-links" style={{ marginTop: 24, fontSize: 13 }}>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            {' · '}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            {' · '}
            <a href="https://itch.io" target="_blank" rel="noreferrer">itch.io</a>
          </p>
        </div>

        {/* Right — featured card */}
        <div className="home-card">
          <div className="home-card-img">
            Featured Project Screenshot
          </div>
          <div className="home-card-footer">
            <div>
              <div className="home-card-title">3D Platformer</div>
              <div className="home-card-sub">Unity · Solo · 2025</div>
            </div>
            <div className="home-card-arrow">↗</div>
          </div>
        </div>
      </div>
    </section>
  );
}
