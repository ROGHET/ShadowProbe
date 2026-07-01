import SpBadge from '../Brand/SpBadge';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const LINKS = [
    {
      heading: 'About',
      items: ['Mission Overview', 'Problem Statement', 'Prototype Disclaimer', 'References', 'Official Datasets'],
    },
    {
      heading: 'Analysis',
      items: ['Landing Sites', 'Rover Planning', 'PSR Mapping', 'Ice Probability', 'CPR Map'],
    },
    {
      heading: 'Resources',
      items: ['DFSAR Documentation', 'OHRC Specs', 'Mission Report', 'API Reference', 'Export GIS'],
    },
  ];

  return (
    <footer className="footer">
      <div className="separator-accent" />
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-wordmark">ShadowProbe</div>
            <div className="footer-tagline">
              Research prototype for lunar south polar ice detection and mission-planning workflows.
            </div>

            <div className="footer-badge">
              <SpBadge size={48} />
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>MISSION</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', letterSpacing: '0.06em' }}>SP-01 | ISRO</div>
              </div>
            </div>
          </div>

          {LINKS.map((col) => (
            <div key={col.heading} className="footer-col">
              <div className="footer-col-heading">{col.heading}</div>
              <ul className="footer-col-links">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="footer-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="separator" style={{ margin: '32px 0' }} />

        <div className="footer-bottom">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>
            © {year} ISRO | Bharatiya Antariksh Hackathon 2026 | Team ShadowProbe
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)' }}>Mission SP-01</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)' }}>Spacecraft: Chandrayaan-2</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)' }}>89.9°S | Lunar South Pole</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

