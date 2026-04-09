const STATS = [
  { key: 'Major',  val: 'Game Development' },
  { key: 'School', val: 'Purdue University' },
  { key: 'Year',   val: 'Junior' },
  { key: 'Focus',  val: 'Unity · Unreal' },
];

const INTERESTS = [
  'Procedural Generation', 'Narrative Design',
  'Game Jams', 'Web Apps', 'Full-Stack',
];

export default function AboutSection() {
  return (
    <section id="about" style={{ background: 'var(--paper)' }}>
      <div className="section">
        <p className="section-label">01</p>
        <h2 className="section-title">About Me</h2>
        <div className="section-divider" />

        <div className="about-grid">
          {/* Left — photo + stats */}
          <div>
            <div className="about-photo">Photo</div>
            <div className="about-stats">
              {STATS.map(({ key, val }) => (
                <div className="about-stat-row" key={key}>
                  <span className="about-stat-key">{key}</span>
                  <span className="about-stat-val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bio */}
          <div className="about-right">
            <p className="about-greeting">Hi, I&apos;m Junhyung Park</p>
            <p className="about-bio">
              I&apos;m a Game Development student at Purdue University with a passion
              for building both interactive games and web applications. My work spans
              gameplay programming, level design, and full-stack web development —
              I enjoy crafting experiences that are both technically solid and visually
              engaging.
              <br /><br />
              Outside of coursework, I participate in game jams, build personal web
              projects, and explore procedural generation.
            </p>

            <div className="about-interests">
              <p className="about-interests-label">Interests &amp; Passion Projects</p>
              <div className="about-tags">
                {INTERESTS.map((tag) => (
                  <span className="about-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
