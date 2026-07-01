import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { SlidersHorizontal, Eye, Crosshair, Database } from 'lucide-react';
import './IceDetection.css';
import { PIPELINE_STAGES } from '../../data/missionData';

const ICE_CLASSES = [
  { color: '#4FC3F7', label: 'Ice Probable', pct: 23 },
  { color: '#2ECC71', label: 'Safe Terrain', pct: 48 },
  { color: '#F4C542', label: 'Uncertain', pct: 18 },
  { color: '#EF5350', label: 'Hazard Zone', pct: 6 },
  { color: '#1a2535', label: 'Permanent Shadow', pct: 5 },
];

const WORKFLOW_STATUS = [
  'Illustrative',
  'Illustrative',
  'Expected Workflow',
  'Expected Workflow',
  'Concept',
  'Planned',
  'Future Module',
  'Dataset Required',
];

const WORKFLOW_BADGE_CLASS = [
  'badge-neutral',
  'badge-neutral',
  'badge-accent',
  'badge-accent',
  'badge-warning',
  'badge-neutral',
  'badge-accent',
  'badge-warning',
];

function CompareSlider() {
  const containerRef = useRef(null);
  const [splitPct, setSplitPct] = useState(50);
  const dragging = useRef(false);

  const onMove = useCallback((clientX) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 5), 95);
    setSplitPct(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="compare-slider"
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchEnd={() => { dragging.current = false; }}
    >
      <div className="compare-panel compare-panel--left" style={{ clipPath: `inset(0 ${100 - splitPct}% 0 0)` }}>
        <div className="compare-label compare-label--left">OHRC · Optical</div>
        <div className="ohrc-image" />
      </div>

      <div className="compare-panel compare-panel--right">
        <div className="compare-label compare-label--right">Conceptual AI Visualization</div>
        <div className="ohrc-image">
          <div className="seg-overlay">
            <div className="seg-region seg-ice" style={{ top: '20%', left: '15%', width: '25%', height: '30%' }} />
            <div className="seg-region seg-safe" style={{ top: '55%', left: '30%', width: '40%', height: '25%' }} />
            <div className="seg-region seg-uncertain" style={{ top: '10%', left: '55%', width: '20%', height: '20%' }} />
            <div className="seg-region seg-hazard" style={{ top: '70%', left: '10%', width: '15%', height: '15%' }} />
            <div className="seg-region seg-psr" style={{ top: '35%', left: '60%', width: '30%', height: '45%' }} />
          </div>
        </div>
      </div>

      <div
        className="compare-divider"
        style={{ left: `${splitPct}%` }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
      >
        <div className="compare-handle">
          <SlidersHorizontal size={14} />
        </div>
      </div>
    </div>
  );
}

function PipelineStage({ stage, index }) {
  const tones = ['var(--success)', 'var(--success)', 'var(--accent)', 'var(--accent)', 'var(--warning)', 'var(--text-dim)', 'var(--accent)', 'var(--warning)'];
  const tone = stage.tone || tones[index] || 'var(--text-dim)';

  return (
    <motion.div
      className="pipeline-stage"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="pipeline-node">
        <div className="pipeline-dot" style={{ background: tone }}>
          {index === 3 && <div className="pipeline-pulse" />}
        </div>
        {index < PIPELINE_STAGES.length - 1 && (
          <div className="pipeline-line" style={{ background: 'var(--border)' }} />
        )}
      </div>
      <div className="pipeline-content">
        <div className="pipeline-label">{stage.label}</div>
        <div className="pipeline-detail">{stage.detail}</div>
        {stage.duration && <div className="pipeline-duration">{stage.duration}</div>}
      </div>
      <div className={`badge ${WORKFLOW_BADGE_CLASS[index]}`}>
        {WORKFLOW_STATUS[index]}
      </div>
    </motion.div>
  );
}

export default function IceDetection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ice-detection" className="ice-detection-section">
      <div className="section">
        <motion.div ref={ref} className="section-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <div className="section-label-line" />
          <span className="section-label-text">Prototype Detection Workflow</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: 18 }}
        >
          Conceptual <span style={{ color: 'var(--accent)' }}>AI Visualization</span>
        </motion.h2>

        <motion.p
          className="ice-prototype-note"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.14 }}
        >
          This comparison demonstrates the intended interface for future AI-assisted subsurface ice detection. No real inference has been performed.
        </motion.p>

        <div className="ice-detection-grid">
          <div className="ice-compare-wrap">
            <div className="ice-compare-toolbar glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Shackleton Rim · Tile 047</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)' }}>Concept Prototype</span>
                <span className="badge badge-neutral">Illustrative</span>
              </div>
            </div>
            <CompareSlider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, justifyContent: 'center' }}>
              <Crosshair size={10} style={{ color: 'var(--text-dim)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                DRAG SLIDER TO COMPARE
              </span>
            </div>

            <div className="data-source-card" style={{ marginTop: 12 }}>
              <div className="data-source-card__label">Data Source</div>
              <div className="data-source-card__title">Official Chandrayaan-2 DFSAR / OHRC</div>
              <div className="data-source-card__meta">Status: Not Yet Integrated. Visuals are illustrative until the official hackathon dataset is supplied.</div>
            </div>
          </div>

          <div className="ice-sidebar">
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: 14 }}>
                CLASSIFICATION LEGEND
              </div>
              {ICE_CLASSES.map((cls) => (
                <div key={cls.label} className="ice-legend-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: cls.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{cls.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 80 }}>
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div className="progress-fill" style={{ width: `${cls.pct}%`, background: cls.color }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', width: 24, textAlign: 'right' }}>{cls.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: 16 }}>
                PROTOTYPE WORKFLOW
              </div>
              <div className="pipeline-list">
                {PIPELINE_STAGES.map((stage, index) => (
                  <PipelineStage key={stage.id} stage={stage} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

