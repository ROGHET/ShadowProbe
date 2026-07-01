import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

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

      <ul className="nav-links desktop-only">
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
        <div className="nav-separator desktop-only" />
        <span className="nav-mission-label desktop-only">ISRO · SP</span>
        <button className="nav-mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-menu glass"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ul className="nav-mobile-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    className={`nav-mobile-link ${activeSection === link.href ? 'nav-mobile-link--active' : ''}`}
                    onClick={() => { scrollTo(link.href); setMenuOpen(false); }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
