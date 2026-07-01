import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Database, Clock, Terminal, ChevronDown, ChevronUp, Wifi } from 'lucide-react';
import './CommandCenter.css';

export default function CommandCenter() {
  const [collapsed, setCollapsed] = useState(false);

  const browserMatch = navigator.userAgent.match(/(Chrome|Firefox|Safari)\/?\s*(\d+)/i);
  const browserInfo = browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : 'Unknown Browser';

  const metrics = [
    { icon: Zap,      label: 'Rendering',     value: 'WebGL 2',               color: 'var(--accent)' },
    { icon: Terminal, label: 'Browser',       value: browserInfo,             color: 'var(--text-muted)' },
    { icon: Database, label: 'Dataset',       value: 'Chandrayaan-2 DFSAR + OHRC (Illustrative)', color: 'var(--text-muted)' },
    { icon: Clock,    label: 'Inference',     value: 'Not Executed',          color: 'var(--warning)' },
    { icon: Terminal, label: 'Mission Mode',  value: 'Research Prototype',    color: 'var(--warning)' },
    { icon: Wifi,     label: 'Status',        value: 'Ready for Official Dataset', color: 'var(--success)' },
  ];

  return (
    <motion.div
      className="command-center glass-accent"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Header */}
      <div className="cc-header" onClick={() => setCollapsed(c => !c)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="pulse-dot" />
          <span className="cc-title">Command Center</span>
        </div>
        <button className="cc-toggle" aria-label={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Body */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            className="cc-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="separator" style={{ marginBottom: 10 }} />
            {metrics.map((m) => (
              <div key={m.label} className="cc-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <m.icon size={10} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                  <span className="data-label">{m.label}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: m.color, fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {m.value}
                </span>
              </div>
            ))}
            <div className="separator" style={{ marginTop: 10, marginBottom: 8 }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-dim)', letterSpacing: '0.06em', textAlign: 'center' }}>
              SP-01 · Research Prototype
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


