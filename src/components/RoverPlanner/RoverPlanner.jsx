import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Navigation, Target, MapPin, Flag } from 'lucide-react';
import { ROVER_WAYPOINTS } from '../../data/missionData';
import './RoverPlanner.css';

export default function RoverPlanner() {
  const canvasRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeRoute, setActiveRoute] = useState('Planned');
  const wptsPct = [
    { x: 0.15, y: 0.80, id: 0 },
    { x: 0.32, y: 0.65, id: 1 },
    { x: 0.50, y: 0.50, id: 2 },
    { x: 0.68, y: 0.35, id: 3 },
    { x: 0.85, y: 0.20, id: 4 },
  ];

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Terrain background
    const terrainGrad = ctx.createLinearGradient(0, 0, 0, H);
    terrainGrad.addColorStop(0, '#080e18');
    terrainGrad.addColorStop(1, '#0b1220');
    ctx.fillStyle = terrainGrad;
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Elevation contours (decorative)
    ctx.strokeStyle = 'rgba(79,195,247,0.04)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const centerX = W * 0.5 + (Math.random() - 0.5) * 40;
      const centerY = H * 0.5 + (Math.random() - 0.5) * 40;
      const rx = 60 + i * 30 + Math.random() * 20;
      const ry = rx * (0.6 + Math.random() * 0.4);
      ctx.ellipse(centerX, centerY, rx, ry, Math.random(), 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crater shadows
    const craters = [
      { x: 0.15, y: 0.3, r: 50 }, { x: 0.75, y: 0.65, r: 70 },
      { x: 0.5, y: 0.8, r: 40 }, { x: 0.85, y: 0.2, r: 35 },
    ];
    craters.forEach(c => {
      const g = ctx.createRadialGradient(c.x*W, c.y*H, c.r*0.2, c.x*W, c.y*H, c.r);
      g.addColorStop(0, 'rgba(0,0,0,0.4)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(c.x*W, c.y*H, c.r, 0, Math.PI*2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // Define waypoint positions on canvas
    const wpts = wptsPct.map(p => ({ x: p.x * W, y: p.y * H, ...p }));

    // Draw path with glow
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#F4C542';
    ctx.strokeStyle = '#F4C542';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    wpts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;

    // Path glow underlay
    ctx.strokeStyle = 'rgba(244,197,66,0.1)';
    ctx.lineWidth = 12;
    ctx.beginPath();
    wpts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Draw waypoint dots (basic)
    wpts.forEach((p, i) => {
      const wp = ROVER_WAYPOINTS[i];
      const isLander = wp.type === 'lander';
      const isTarget = wp.type === 'target';
      const color = isLander ? '#2ECC71' : isTarget ? '#EF5350' : '#4FC3F7';

      ctx.beginPath();
      ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Label
      ctx.font = '500 10px "IBM Plex Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.fillText(wp.label, p.x, p.y - 20);
    });

    // Animate rover dot
    let progress = 0;
    let raf;
    const animDot = () => {
      // Recompute total path length
      const totalLen = wpts.reduce((acc, p, i) => {
        if (i === 0) return acc;
        const prev = wpts[i - 1];
        return acc + Math.sqrt((p.x - prev.x) ** 2 + (p.y - prev.y) ** 2);
      }, 0);

      progress = (progress + 0.5) % totalLen;

      // Find position along path
      let acc = 0;
      let roverX = wpts[0].x, roverY = wpts[0].y;
      for (let i = 1; i < wpts.length; i++) {
        const seg = Math.sqrt((wpts[i].x - wpts[i-1].x)**2 + (wpts[i].y - wpts[i-1].y)**2);
        if (acc + seg > progress) {
          const t = (progress - acc) / seg;
          roverX = wpts[i-1].x + t * (wpts[i].x - wpts[i-1].x);
          roverY = wpts[i-1].y + t * (wpts[i].y - wpts[i-1].y);
          break;
        }
        acc += seg;
      }

      // Redraw
      // (for full animation we'd redraw everything — simplified: just draw rover)
      ctx.clearRect(roverX - 15, roverY - 15, 30, 30);

      // Re-patch background
      ctx.fillStyle = '#080e18';
      ctx.fillRect(roverX - 15, roverY - 15, 30, 30);

      ctx.beginPath();
      ctx.arc(roverX, roverY, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244,197,66,0.15)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(roverX, roverY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#F4C542';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#F4C542';
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(animDot);
    };

    raf = requestAnimationFrame(animDot);
    
    return () => cancelAnimationFrame(raf);
  }, [inView, activeRoute]);

  return (
    <section id="rover-planner" className="rover-section">
      <div className="section">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">A* Pathfinding · Hazard Avoidance</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 40 }}
        >
          Rover Path <span style={{ color: 'var(--accent)' }}>Planner</span>
        </motion.h2>

        <div className="data-source-card" style={{ marginBottom: 24 }}>
          <div className="data-source-card__label">Data Source</div>
          <div className="data-source-card__title">Official Chandrayaan-2 terrain references</div>
          <div className="data-source-card__meta">Status: Concept planning until terrain and traverse datasets are integrated.</div>
        </div>

        <div className="rover-layout">
          {/* Canvas */}
          <motion.div
            ref={ref}
            className="rover-canvas-wrap"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={480} 
              className="rover-canvas"
            />

            {/* Route Toggles */}
            <div className="rover-route-toggles glass" style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, padding: 8, borderRadius: 8, zIndex: 10 }}>
              {['Planned', 'Alternate', 'Safe', 'Shortest'].map(rt => (
                <button
                  key={rt}
                  onClick={() => setActiveRoute(rt)}
                  style={{
                    background: activeRoute === rt ? 'rgba(79,195,247,0.2)' : 'transparent',
                    border: `1px solid ${activeRoute === rt ? '#4FC3F7' : 'rgba(255,255,255,0.1)'}`,
                    color: activeRoute === rt ? '#4FC3F7' : 'var(--text-dim)',
                    padding: '4px 8px', fontSize: '10px', fontFamily: 'var(--font-mono)', borderRadius: 4, cursor: 'pointer'
                  }}
                >
                  {rt} Route
                </button>
              ))}
            </div>

            {/* Legend overlay */}
            <div className="rover-legend glass">
              <div className="rover-legend-item"><div className="rover-dot rover-dot--green" /><span>Lander</span></div>
              <div className="rover-legend-item"><div className="rover-dot rover-dot--blue" /><span>Waypoint</span></div>
              <div className="rover-legend-item"><div className="rover-dot rover-dot--red" /><span>Target</span></div>
              <div className="rover-legend-item"><div className="rover-dash" /><span>Route</span></div>
            </div>
          </motion.div>

          {/* Waypoint list */}
          <div className="rover-waypoints-list">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: 20 }}>TRAVERSE PLAN</div>
            {ROVER_WAYPOINTS.map((wp, i) => (
              <motion.div
                key={wp.id}
                className="rover-wp-item"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`rover-wp-icon rover-wp-icon--${wp.type}`}>
                  {wp.type === 'lander' ? <Flag size={12} />
                    : wp.type === 'target' ? <Target size={12} />
                    : <MapPin size={12} />}
                </div>
                {i < ROVER_WAYPOINTS.length - 1 && <div className="rover-wp-connector" />}
                <div className="rover-wp-content">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500, color: 'white' }}>{wp.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', marginTop: 2 }}>{wp.note}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-dim)', marginTop: 1 }}>
                    {wp.lat}° · {wp.lon}°
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Route stats */}
            <div className="card" style={{ marginTop: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 12 }}>ROUTE STATISTICS</div>
              {[
                ['Total Distance', activeRoute === 'Planned' ? '14.8 km (Illustrative)' : '16.2 km (Illustrative)'],
                ['Hazard Segments', '0 (Illustrative)'],
                ['Max Slope', '4.7° (Illustrative)'],
                ['Est. Duration', '18.4 hrs (Illustrative)'],
                ['Energy Budget', '87% nominal (Illustrative)'],
              ].map(([k, v]) => (
                <div key={k} className="data-row">
                  <span className="data-label">{k}</span>
                  <span className="data-value">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
