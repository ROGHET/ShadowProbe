import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpBadge({ size = 40, className = '' }) {
  const [showToast, setShowToast] = useState(false);
  const accentSize = Math.max(4, Math.round(size * 0.18));

  const handleClick = () => {
    if (showToast) return;
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -24 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              x: '-50%',
              background: 'rgba(5, 7, 11, 0.95)',
              border: '1px solid var(--border)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Hello to you too!
            <motion.div
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ transformOrigin: 'bottom right', display: 'flex' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#B7B7B7"><path d="m430-500 283-283q12-12 28-12t28 12q12 12 12 28t-12 28L487-444l-57-56Zm99 99 254-255q12-12 28.5-12t28.5 12q12 12 12 28.5T840-599L586-345l-57-56ZM211-211q-91-91-91-219t91-219l120-120 59 59q7 7 12 14.5t10 15.5l148-149q12-12 28.5-12t28.5 12q12 12 12 28.5T617-772L444-599l-85 84 19 19q46 46 44 110t-49 111l-57-56q23-23 25.5-54.5T321-440l-47-46q-12-12-12-28.5t12-28.5l57-56q12-12 12-28.5T331-656l-64 64q-68 68-68 162.5T267-267q68 68 163 68t163-68l239-240q12-12 28.5-12t28.5 12q12 12 12 28.5T889-450L649-211q-91 91-219 91t-219-91Zm219-219ZM680-39v-81q66 0 113-47t47-113h81q0 100-70.5 170.5T680-39ZM39-680q0-100 70.5-170.5T280-921v81q-66 0-113 47t-47 113H39Z"/></svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={className}
        onClick={handleClick}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: 'linear-gradient(180deg, #0f1621 0%, #070b10 100%)',
          border: '1px solid #f4a13d',
          boxShadow: '0 0 0 1px rgba(79,195,247,0.15) inset, 0 10px 24px rgba(0,0,0,0.35)',
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          flexShrink: 0,
          cursor: 'pointer',
        }}
        aria-label="ShadowProbe SP badge"
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: `${Math.round(size * 0.42)}px`,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.06em',
            lineHeight: 1,
          }}
        >
          SP
        </span>
        <span
          style={{
            position: 'absolute',
            right: Math.max(3, Math.round(size * 0.08)),
            bottom: Math.max(3, Math.round(size * 0.08)),
            width: accentSize,
            height: accentSize,
            borderRadius: 3,
            background: 'var(--accent)',
            boxShadow: '0 0 8px rgba(79,195,247,0.6)',
          }}
        />
      </div>
    </div>
  );
}
