import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Rocket, Database } from 'lucide-react';
import { PROTOTYPE_DISCLAIMER } from '../../data/missionData';
import SpBadge from '../Brand/SpBadge';
import './Hero.css';

// Animated star canvas
function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const STAR_COUNT = 280;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.002,
    }));

    // Shooting star state
    let shootingStar = null;
    let nextShoot = Date.now() + 3000;

    const render = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render stars
      stars.forEach((s) => {
        s.twinkle += s.speed;
        const opacity = s.opacity * (0.7 + 0.3 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });

      // Shooting star
      if (now > nextShoot) {
        shootingStar = {
          x: Math.random() * canvas.width * 0.6,
          y: Math.random() * canvas.height * 0.4,
          length: 80 + Math.random() * 80,
          speed: 8 + Math.random() * 6,
          angle: Math.PI / 5,
          life: 0,
          maxLife: 50,
        };
        nextShoot = now + 5000 + Math.random() * 5000;
      }

      if (shootingStar) {
        const s = shootingStar;
        s.life++;
        const p = s.life / s.maxLife;
        const op = p < 0.3 ? p / 0.3 : p < 0.7 ? 1 : (1 - p) / 0.3;
        const cx = s.x + Math.cos(s.angle) * s.speed * s.life;
        const cy = s.y + Math.sin(s.angle) * s.speed * s.life;
        const grd = ctx.createLinearGradient(
          cx - Math.cos(s.angle) * s.length, cy - Math.sin(s.angle) * s.length,
          cx, cy
        );
        grd.addColorStop(0, 'transparent');
        grd.addColorStop(1, `rgba(110,231,249,${op * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(cx - Math.cos(s.angle) * s.length, cy - Math.sin(s.angle) * s.length);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (s.life >= s.maxLife) shootingStar = null;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-stars-canvas" />;
}

// Mission Badge SVG for hero
function MissionBadge() {
  return (
    <div className="hero-mission-badge">
      <SpBadge size={56} />
      <div className="hero-badge-label">
        <span>ShadowProbe</span>
        <span>Mission SP-01</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToMission = () => {
    document.querySelector('#mission-viewer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="hero">
      <StarCanvas />

      {/* Background radial gradient */}
      <div className="hero-glow" />

      <div className="hero-content">
        {/* Left column */}
        <motion.div
          className="hero-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item}>
            <MissionBadge />
          </motion.div>

          <motion.div variants={item} className="hero-prototype-note">
            <div className="hero-prototype-note__title">Research Prototype</div>
            <p className="hero-prototype-note__body">{PROTOTYPE_DISCLAIMER}</p>
          </motion.div>

          <motion.div variants={item} className="hero-label-row">
            <div className="section-label-line" />
            <span className="section-label-text">ISRO | Bharatiya Antariksh Hackathon 2026</span>
          </motion.div>

          <motion.h1 variants={item} className="hero-headline">
            <span className="hero-headline-brand">ShadowProbe</span>
            <span className="hero-headline-sub">Lunar Ice<br />Detection</span>
          </motion.h1>

          <motion.p variants={item} className="hero-desc">
            Detection and characterization of subsurface ice in lunar south polar regions using DFSAR polarimetry, OHRC imagery, and AI-driven mission planning.
          </motion.p>

          <motion.div variants={item} className="hero-meta-row">
            <div className="hero-meta-item">
              <span className="hero-meta-label">SPACECRAFT</span>
              <span className="hero-meta-value">Chandrayaan-4 Orbiter</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="hero-meta-label">RESOLUTION</span>
              <span className="hero-meta-value">2.5m × 2.5m</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="hero-meta-label">COVERAGE</span>
              <span className="hero-meta-value">89.7%</span>
            </div>
          </motion.div>

          <motion.div variants={item} className="hero-cta-row">
            <button className="btn btn-primary" onClick={scrollToMission}>
              <Rocket size={16} />
              Launch Mission
            </button>
            <button className="btn btn-secondary" onClick={() => document.querySelector('#analytics')?.scrollIntoView({ behavior: 'smooth' })}>
              <Database size={16} />
              Explore Dataset
            </button>
          </motion.div>
        </motion.div>

        {/* Right column - floating mini globe placeholder (replaced by Three.js in full viewer) */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-globe-container">
            <div className="hero-globe-ring hero-globe-ring--1" />
            <div className="hero-globe-ring hero-globe-ring--2" />
            <div className="hero-globe-ring hero-globe-ring--3" />
            <div className="hero-globe-sphere">
              <div className="hero-globe-surface" />
              <div className="hero-globe-terminator" />
              <div className="hero-globe-glow" />
            </div>
            {/* Overlaid data points */}
            <div className="hero-data-point" style={{ top: '30%', left: '45%' }}>
              <div className="hero-data-dot" />
              <span className="hero-data-label">Shackleton</span>
            </div>
            <div className="hero-data-point" style={{ top: '55%', left: '35%' }}>
              <div className="hero-data-dot hero-data-dot--secondary" />
              <span className="hero-data-label">Haworth</span>
            </div>
            <div className="hero-data-point" style={{ top: '42%', left: '62%' }}>
              <div className="hero-data-dot hero-data-dot--secondary" />
              <span className="hero-data-label">de Gerlache</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero-scroll-cue"
        onClick={scrollToMission}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="hero-scroll-text">Scroll to Mission</span>
        <ChevronDown size={16} className="hero-scroll-chevron" />
      </motion.button>

      {/* Bottom gradient */}
      <div className="hero-bottom-fade" />
    </section>
  );
}

