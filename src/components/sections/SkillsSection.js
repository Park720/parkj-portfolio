const SKILLS = [
  { name: 'C#  ·  Unity',       pct: 85 },
  { name: 'C++  ·  Unreal',     pct: 65 },
  { name: 'GDScript  ·  Godot', pct: 55 },
  { name: 'Python',             pct: 70 },
  { name: 'HLSL  ·  Shaders',   pct: 45 },
];

const TOOLS = [
  'Unity', 'Unreal Engine', 'Godot',
  'Blender', 'Photoshop', 'Git / GitHub',
];

const GD_SKILLS = [
  'Level Design', 'Gameplay Systems', 'UI / UX',
  'Narrative Design', 'Prototyping', 'Playtesting',
];

export default function SkillsSection() {
  return (
    <section id="skills" style={{ background: 'var(--paper)' }}>
      <div className="section">
        <p className="section-label">03</p>
        <h2 className="section-title">Skills</h2>
        <div className="section-divider" />

        <div className="skills-grid">
          {/* Programming */}
          <div className="skills-block">
            <p className="skills-block-title">Programming</p>
            {SKILLS.map(({ name, pct }) => (
              <div className="skill-bar-row" key={name}>
                <span className="skill-name">{name}</span>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="skill-pct">{pct}%</span>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="skills-block">
            <p className="skills-block-title">Tools &amp; Software</p>
            <div className="tools-grid">
              {TOOLS.map((t) => (
                <div className="tool-chip" key={t}>{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Design */}
        <div className="skills-bottom">
          <p className="skills-block-title">Game Design</p>
          <div className="gd-tags">
            {GD_SKILLS.map((g) => (
              <span className="gd-tag" key={g}>{g}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
