import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronDown } from 'lucide-react';
import SpBadge from '../Brand/SpBadge';
import './Navigation.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission-viewer' },
  { label: 'Analysis', href: '#analytics' },
  { label: 'Detection', href: '#ice-detection' },
  { label: 'Planning', href: '#landing-sites' },
  { label: 'Team', href: '#team' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div className="nav-brand">
        <SpBadge size={34} className="nav-isro-logo" />
        <div className="nav-brand-text">
          <span className="nav-wordmark">ShadowProbe</span>
          <span className="nav-mission-id">Mission SP-01</span>
        </div>
      </div>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <button
              className={`nav-link ${activeSection === link.href ? 'nav-link--active' : ''}`}
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-status">
        <div className="nav-status-badge">
          <Activity size={12} />
          <span>PROTOTYPE</span>
          <div className="pulse-dot" />
        </div>
        <div className="nav-separator" />
        <span className="nav-mission-label">ISRO · SP</span>
      </div>
    </motion.nav>
  );
}
