import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Layers, Crosshair } from 'lucide-react';
import { LANDING_SITES, PSR_REGIONS } from '../../data/missionData';
import './LunarMap.css';

// Convert lat/lon to 2D pixel on a polar projection canvas
function projectToCanvas(lat, lon, cx, cy, maxRadius) {
  // South-polar azimuthal equidistant projection
  // lat from -90 (pole, center) to about -75 (edge)
  const r = ((lat + 90) / 20) * maxRadius; // lat: -90 to -70
  const theta = (lon * Math.PI) / 180;
  const x = cx + r * Math.sin(theta);
  const y = cy - r * Math.cos(theta);
  return { x, y };
}

export default function LunarMap() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredSite, setHoveredSite] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeLayer, setActiveLayer] = useState('optical');
  const inView = useInView(containerRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.min(W, H) * 0.44;

    ctx.clearRect(0, 0, W, H);

    // Background base
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    if (activeLayer === 'radar') {
      bgGrad.addColorStop(0, '#0a1a2a');
      bgGrad.addColorStop(1, '#05101a');
    } else if (activeLayer === 'elevation') {
      bgGrad.addColorStop(0, '#2e3a23');
      bgGrad.addColorStop(0.5, '#4a3a23');
      bgGrad.addColorStop(1, '#1a1a1a');
    } else {
      bgGrad.addColorStop(0, '#2a2a2a');
      bgGrad.addColorStop(0.5, '#1a1a1a');
      bgGrad.addColorStop(1, '#0d0d0d');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // Specific layer base textures
    if (activeLayer === 'optical') {
      // Craters
      const craterSeeds = [[0.2,0.3,0.05],[0.7,0.6,0.08],[0.5,0.8,0.06],[0.3,0.7,0.04],[0.8,0.2,0.07]];
      craterSeeds.forEach(([x, y, rad]) => {
        const px = cx + (x*2-1)*maxR; const py = cy + (y*2-1)*maxR; const pr = rad*maxR;
        const grad = ctx.createRadialGradient(px-pr*0.3, py-pr*0.3, pr*0.1, px, py, pr);
        grad.addColorStop(0, '#4a4a4a'); grad.addColorStop(0.8, '#1a1a1a'); grad.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI*2); ctx.fillStyle = grad; ctx.fill();
      });
    } else if (activeLayer === 'radar') {
      // Striping
      ctx.save();
      ctx.translate(cx, cy);
      for(let i=0; i<360; i+=4) {
        ctx.rotate((4*Math.PI)/180);
        ctx.fillStyle = i%8 === 0 ? 'rgba(79,195,247,0.1)' : 'rgba(79,195,247,0.03)';
        ctx.fillRect(0, 0, 2, maxR);
      }
      ctx.restore();
    } else if (activeLayer === 'elevation') {
      // Contours
      for (let r = 0; r < maxR; r += maxR/12) {
        ctx.beginPath(); ctx.arc(cx, cy, r + Math.sin(r)*5, 0, Math.PI*2);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1; ctx.stroke();
      }
    }

    // Grid rings (latitude lines)
    if (activeLayer !== 'optical' && activeLayer !== 'radar') {
      for (let latDeg = -85; latDeg <= -75; latDeg += 5) {
        const r = ((latDeg + 90) / 20) * maxR;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      // Grid spokes
      for (let lon = 0; lon < 360; lon += 30) {
        const theta = (lon * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + maxR * Math.sin(theta), cy - maxR * Math.cos(theta));
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // PSR regions
    if (activeLayer === 'psr' || activeLayer === 'optical' || activeLayer === 'elevation') {
      PSR_REGIONS.forEach((psr) => {
        const pos = projectToCanvas(psr.lat, psr.lon, cx, cy, maxR);
        const r = (psr.radius / 5000) * maxR * 0.7;
        const pGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
        pGrad.addColorStop(0, `rgba(10,15,25,${activeLayer==='psr' ? 0.95 : 0.6})`);
        pGrad.addColorStop(1, 'rgba(10,15,25,0)');
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2); ctx.fillStyle = pGrad; ctx.fill();
        if (activeLayer === 'psr') {
          ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(79,195,247,0.3)'; ctx.lineWidth = 1; ctx.stroke();
        }
      });
    }

    // Ice heatmap overlay
    if (activeLayer === 'ice') {
      LANDING_SITES.forEach((site) => {
        if (site.iceProbability < 0.5) return;
        const pos = projectToCanvas(site.lat, site.lon, cx, cy, maxR);
        const r = site.iceProbability * 30;
        const hGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
        hGrad.addColorStop(0, `rgba(79,195,247,${site.iceProbability * 0.5})`);
        hGrad.addColorStop(1, 'rgba(79,195,247,0)');
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2); ctx.fillStyle = hGrad; ctx.fill();
      });
    }

    // CPR overlay
    if (activeLayer === 'cpr') {
      LANDING_SITES.forEach((site) => {
        if (!site.cpr) return;
        const pos = projectToCanvas(site.lat, site.lon, cx, cy, maxR);
        const r = 25;
        const hGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
        // Blue -> Green -> Yellow -> Red based on CPR
        const color = site.cpr > 0.8 ? '255,50,50' : site.cpr > 0.6 ? '255,200,50' : site.cpr > 0.4 ? '50,255,100' : '50,100,255';
        hGrad.addColorStop(0, `rgba(${color}, 0.6)`);
        hGrad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2); ctx.fillStyle = hGrad; ctx.fill();
      });
    }

    // Rover path
    if (activeLayer !== 'radar') {
      const roverPts = [
        { lat: -89.54, lon: 0.0 }, { lat: -89.32, lon: 2.1 },
        { lat: -88.97, lon: 4.8 }, { lat: -88.61, lon: 6.2 }, { lat: -88.11, lon: 8.1 },
      ].map((p) => projectToCanvas(p.lat, p.lon, cx, cy, maxR));

      ctx.beginPath();
      roverPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = '#F4C542'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Pole indicator
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill();
    ctx.font = '500 8px IBM Plex Mono, monospace'; ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.textAlign = 'center';
    ctx.fillText('90|S', cx, cy - 8);

  }, [activeLayer]);

  // Hover detection
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const my = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxR = Math.min(canvas.width, canvas.height) * 0.44;

    let found = null;
    LANDING_SITES.forEach((site) => {
      const pos = projectToCanvas(site.lat, site.lon, cx, cy, maxR);
      const dist = Math.sqrt((mx - pos.x) ** 2 + (my - pos.y) ** 2);
      if (dist < 14) found = site;
    });

    setHoveredSite(found);
    if (found) setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const LAYER_BUTTONS = [
    { id: 'optical',   label: 'OHRC' },
    { id: 'radar',     label: 'DFSAR' },
    { id: 'cpr',       label: 'CPR' },
    { id: 'ice',       label: 'Ice Prob.' },
    { id: 'elevation', label: 'DEM' },
    { id: 'psr',       label: 'PSR' },
  ];

  return (
    <section id="landing-sites" className="lunar-map-section">
      <div className="section">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Polar Projection | DFSAR Coverage</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 40 }}
        >
          Lunar South Polar <span style={{ color: 'var(--accent)' }}>Map</span>
        </motion.h2>

        <div className="data-source-card" style={{ marginBottom: 24 }}>
          <div className="data-source-card__label">Data Source</div>
          <div className="data-source-card__title">Official Chandrayaan-2 DFSAR / OHRC references</div>
          <div className="data-source-card__meta">Status: Illustrative until official mission imagery and radar data are integrated.</div>
        </div>

        <div className="lunar-map-layout">
          {/* Map canvas */}
          <motion.div
            ref={containerRef}
            className="lunar-map-wrap"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Layer toggle */}
            <div className="map-layer-bar glass">
              <Layers size={12} style={{ color: 'var(--text-dim)' }} />
              {LAYER_BUTTONS.map((l) => (
                <button
                  key={l.id}
                  className={`map-layer-btn ${activeLayer === l.id ? 'map-layer-btn--active' : ''}`}
                  onClick={() => setActiveLayer(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={640}
              className="lunar-canvas"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredSite(null)}
            />

            {/* Landing site dots (HTML overlay for interaction) */}
            {LANDING_SITES.map((site) => {
              const cx = 320; const cy = 320; const maxR = 280;
              const pos = projectToCanvas(site.lat, site.lon, cx, cy, maxR);
              const color = site.status === 'OPTIMAL' ? '#2ECC71'
                : site.status === 'CANDIDATE' ? '#4FC3F7'
                : site.status === 'REVIEW' ? '#F4C542'
                : '#EF5350';
              return (
                <div
                  key={site.id}
                  className="map-site-marker"
                  style={{
                    left: `${(pos.x / 640) * 100}%`,
                    top: `${(pos.y / 640) * 100}%`,
                    borderColor: color,
                    boxShadow: `0 0 8px ${color}50`,
                  }}
                  title={site.name}
                >
                  <span className="map-site-label">{site.id.replace('SP-', '')}</span>
                </div>
              );
            })}

            {/* Crosshair */}
            <div className="map-crosshair">
              <Crosshair size={20} />
            </div>

            {/* Axis labels */}
            <div className="map-axis map-axis--top">0|N</div>
            <div className="map-axis map-axis--right">90|E</div>
            <div className="map-axis map-axis--bottom">180|</div>
            <div className="map-axis map-axis--left">90|W</div>
          </motion.div>

          {/* Site list */}
          <div className="map-site-list">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: 16 }}>CANDIDATE SITES</div>
            {LANDING_SITES.map((site, i) => (
              <motion.div
                key={site.id}
                className="map-site-item"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div className="map-site-rank">{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'white', fontWeight: 500 }}>{site.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', marginTop: 2 }}>
                      {site.lat}| / {site.lon}| | Slope {site.slope}|
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)' }}>Ice:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: '#4FC3F7' }}>{(site.iceProbability * 100).toFixed(0)}%</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', marginLeft: 6 }}>CPR:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{site.cpr}</span>
                  </div>
                  <span className={`badge badge-${site.status === 'OPTIMAL' ? 'success' : site.status === 'EXCLUDED' ? 'danger' : site.status === 'REVIEW' ? 'warning' : 'accent'}`} style={{ fontSize: '0.5rem' }}>
                    {site.status}
                  </span>
                </div>
                <div className="progress-bar" style={{ marginTop: 6 }}>
                  <div className="progress-fill" style={{ width: `${site.iceProbability * 100}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredSite && (
        <div
          className="map-tooltip glass"
          style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 60, position: 'fixed' }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8125rem', color: 'white', fontWeight: 600 }}>{hoveredSite.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', marginTop: 2 }}>
            {hoveredSite.lat}| | {hoveredSite.lon}|
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', marginTop: 4 }}>
            Ice: {(hoveredSite.iceProbability * 100).toFixed(0)}%
          </div>
        </div>
      )}
    </section>
  );
}

