const CONTACTS = [
  { label: 'Email',    val: 'park1472@purdue.edu',          href: 'mailto:park1472@purdue.edu' },
  { label: 'GitHub',   val: 'github.com/junhyungpark',      href: 'https://github.com' },
  { label: 'LinkedIn', val: 'linkedin.com/in/junhyungpark', href: 'https://linkedin.com' },
  { label: 'itch.io',  val: 'junhyungpark.itch.io',         href: 'https://itch.io' },
];

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="section">
        <p className="section-label">04</p>

        <div className="contact-grid">
          {/* Left */}
          <div>
            <h2 className="contact-heading">
              Let&apos;s Work<br />Together.
            </h2>
            <p className="contact-sub">
              Open to internships, collaborations, and game jam teams.
            </p>

            <div className="contact-rows">
              {CONTACTS.map(({ label, val, href }) => (
                <div className="contact-row" key={label}>
                  <span className="contact-row-label">{label}</span>
                  <a
                    className="contact-row-val"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {val}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="contact-card">
            <h3 className="contact-card-heading">Currently Available</h3>
            <hr className="contact-card-divider" />
            <p className="contact-card-text">
              I&apos;m currently seeking summer internship opportunities in game
              development, gameplay programming, or level / systems design.
            </p>
            <div className="availability-badge">
              <span className="availability-dot" />
              Available — Spring / Summer 2025
            </div>
            <hr className="contact-card-divider" />
            <a className="btn-download" href="/resume.pdf" download>
              Download Resume ↓
            </a>
            <p className="contact-note">
              Thank you for visiting my portfolio.<br />
              Looking forward to connecting!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
