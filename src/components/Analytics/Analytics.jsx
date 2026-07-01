import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Droplets, Percent, Moon, Target, Navigation,
  Radio, CheckCircle, Zap, TrendingUp, TrendingDown,
  Minus, Eye, Mountain, Brain, Truck, AlertCircle
} from 'lucide-react';
import { MISSION_METRICS, FEATURE_CARDS } from '../../data/missionData';
import './Analytics.css';

// All Lucide icons - no custom SVGs
const METRIC_ICONS = {
  'ice-volume':     Droplets,
  'confidence':     Percent,
  'psrs':           Moon,
  'candidates':     Target,
  'traverse':       Navigation,
  'radar-coverage': Radio,
  'ohrc-resolution':Eye,
  'orbit-altitude': Zap,
};

const FEATURE_ICONS = {
  Radio, Eye, Mountain, Brain, Target, Truck,
};

function MetricCard({ metric, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = METRIC_ICONS[metric.id] || Percent;

  const displayValue = parseFloat(metric.value);
  const isFloat = String(metric.value).includes('.');
  const decimals = isFloat ? String(metric.value).split('.')[1].length : 0;

  return (
    <motion.div
      ref={ref}
      className="metric-card card card-accent"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="metric-top">
        <div className="metric-icon-wrap">
          <Icon size={16} />
        </div>
        {metric.isIllustrative && (
          <span className="badge badge-warning" style={{ fontSize: '0.45rem' }}>
            ILLUSTRATIVE
          </span>
        )}
      </div>

      <div className="metric-value">
        {inView ? (
          <CountUp
            end={displayValue}
            duration={2}
            decimals={decimals}
            separator=","
            useEasing
          />
        ) : '0'}
        <span className="metric-unit">{metric.unit}</span>
      </div>

      <div className="metric-label">{metric.label}</div>
      <div className="metric-module">
        <span className="badge badge-neutral">{metric.module}</span>
      </div>

      {metric.isIllustrative && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, marginTop: 8 }}>
          <AlertCircle size={10} style={{ color: 'var(--text-dim)', flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
            Research Prototype value
          </span>
        </div>
      )}
    </motion.div>
  );
}

function FeatureCard({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const IconComponent = FEATURE_ICONS[card.icon] || Radio;

  return (
    <motion.div
      ref={ref}
      className="feature-card card card-accent"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="feature-card-top">
        <div className="feature-icon-wrap">
          <IconComponent size={18} />
        </div>
        <div className="feature-card-tags">
          {card.tags.slice(0, 2).map(t => (
            <span key={t} className="badge badge-neutral">{t}</span>
          ))}
        </div>
      </div>

      <div className="feature-card-title">{card.title}</div>
      <div className="feature-card-subtitle">{card.subtitle}</div>

      <div className="separator" style={{ margin: '12px 0' }} />

      <p style={{ fontSize: '0.8125rem', lineHeight: 1.65 }}>{card.desc}</p>

      <div className="feature-card-extra-tags">
        {card.tags.slice(2).map(t => (
          <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Analytics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="analytics" className="analytics-section">
      <div className="section">
        {/* Header */}
        <motion.div
          ref={ref}
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="section-label-line" />
          <span className="section-label-text">Mission Summary | Chandrayaan-2 Based</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: 16 }}
        >
          Mission <span style={{ color: 'var(--accent)' }}>Metrics</span>
        </motion.h2>

        {/* Prototype banner */}
        <motion.div
          className="prototype-banner"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <AlertCircle size={13} style={{ color: 'var(--warning)', flexShrink: 0 }} />
          <span>
            Values marked <strong>ILLUSTRATIVE</strong> are research prototype estimates for demonstration purposes only.
            They are not derived from actual Chandrayaan-2 observations.
          </span>
        </motion.div>

        <div className="data-source-card" style={{ marginTop: 14 }}>
          <div className="data-source-card__label">Data Source</div>
          <div className="data-source-card__title">Official Chandrayaan-2 datasets</div>
          <div className="data-source-card__meta">Status: Illustrative until the hackathon dataset is integrated.</div>
        </div>

        {/* Metrics grid */}
        <div className="grid-4" style={{ marginTop: 32 }}>
          {MISSION_METRICS.map((m, i) => <MetricCard key={m.id} metric={m} index={i} />)}
        </div>

        {/* Feature cards */}
        <div style={{ marginTop: 80 }}>
          <div className="section-label" style={{ marginBottom: 32 }}>
            <div className="section-label-line" />
            <span className="section-label-text">Core Capabilities</span>
          </div>
          <div className="grid-3">
            {FEATURE_CARDS.map((c, i) => <FeatureCard key={c.id} card={c} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

