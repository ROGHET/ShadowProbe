export default function SpBadge({ size = 40, className = '' }) {
  const accentSize = Math.max(4, Math.round(size * 0.18));

  return (
    <div
      className={className}
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
  );
}
