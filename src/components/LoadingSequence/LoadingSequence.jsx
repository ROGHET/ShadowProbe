import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingSequence.css';

const STAGES = [
  { text: 'Initializing ShadowProbe...', duration: 600 },
  { text: 'Loading DFSAR Dataset...', duration: 800 },
  { text: 'Loading OHRC Imagery...', duration: 700 },
  { text: 'Generating DEM...', duration: 600 },
  { text: 'Initializing AI Models...', duration: 900 },
  { text: 'Prototype Console Ready', duration: 400 },
];

export default function LoadingSequence({ onComplete }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const total = STAGES.reduce((acc, stage) => acc + stage.duration, 0);
    let elapsed = 0;
    let index = 0;

    const advance = () => {
      if (index >= STAGES.length) {
        setDone(true);
        setTimeout(() => onComplete?.(), 600);
        return;
      }

      setStageIndex(index);
      const duration = STAGES[index].duration;
      const startElapsed = elapsed;
      const startTime = Date.now();

      const tick = () => {
        const dt = Date.now() - startTime;
        const pct = Math.min((startElapsed + dt) / total, 1);
        setProgress(pct * 100);
        if (dt < duration) requestAnimationFrame(tick);
        else {
          elapsed += duration;
          index += 1;
          advance();
        }
      };

      requestAnimationFrame(tick);
    };

    advance();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="loading-stars" />
          <div className="loading-center">
            <motion.div
              className="loading-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="loading-wordmark">ShadowProbe</span>
              <span className="loading-subtitle">Mission SP-01 · ISRO</span>
            </motion.div>

            <motion.div
              className="loading-progress-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="loading-progress-bar">
                <motion.div className="loading-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="loading-status-row">
                <span className="loading-stage-text">{STAGES[stageIndex]?.text}</span>
                <span className="loading-pct">{Math.round(progress).toString().padStart(3, '0')}%</span>
              </div>
            </motion.div>

            <div className="loading-grid-lines" />
          </div>

          <div className="loading-corner loading-corner--tl">
            <span className="mono" style={{ fontSize: '0.625rem', color: 'var(--text-dim)' }}>ISRO · SP</span>
          </div>
          <div className="loading-corner loading-corner--tr">
            <span className="mono" style={{ fontSize: '0.625rem', color: 'var(--text-dim)' }}>SP-01</span>
          </div>
          <div className="loading-corner loading-corner--bl">
            <span className="mono" style={{ fontSize: '0.625rem', color: 'var(--text-dim)' }}>89.9°S</span>
          </div>
          <div className="loading-corner loading-corner--br">
            <span className="mono" style={{ fontSize: '0.625rem', color: 'var(--text-dim)' }}>PROTOTYPE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
