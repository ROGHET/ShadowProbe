import { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import SpBadge from '../Brand/SpBadge';
import {
  Layers, MapPin, Activity, Navigation, Target,
  ZoomIn, ZoomOut, RefreshCw, Info, Eye,
  Radio, Thermometer, Mountain, Sun, CloudOff
} from 'lucide-react';
import { LANDING_SITES, PSR_REGIONS, VIZ_MODES, ROVER_WAYPOINTS } from '../../data/missionData';
import './MissionViewer.css';

// Convert lat/lon to 3D point on sphere surface
function latLonToVec3(lat, lon, radius = 1.015) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Moon sphere with textures - resilient loader
function Moon({ vizMode }) {
  const meshRef = useRef();
  const { gl } = useThree();
  const colorMap = useLoader(THREE.TextureLoader, '/2k_moon.jpg');

  useEffect(() => {
    if (colorMap) {
      colorMap.colorSpace = THREE.SRGBColorSpace;
      colorMap.anisotropy = gl.capabilities.getMaxAnisotropy();
    }
  }, [colorMap, gl]);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial
        map={colorMap}
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  );
}

// Atmosphere rim glow
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.08, 64, 64]} />
      <meshBasicMaterial
        color={new THREE.Color(0x4fc3f7)}
        transparent
        opacity={0.025}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Landing site markers
function SiteMarker({ site, onClick, isSelected }) {
  const position = latLonToVec3(site.lat, site.lon);
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const color = site.status === 'OPTIMAL' ? '#2ECC71'
    : site.status === 'CANDIDATE' ? '#4FC3F7'
    : site.status === 'REVIEW' ? '#F4C542'
    : '#EF5350';

  return (
    <group position={position}>
      {/* Marker sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(site); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.022, 0.028, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Info card */}
      {isSelected && (
        <Html distanceFactor={2.5} style={{ pointerEvents: 'none' }}>
          <div className="globe-site-card">
            <div className="globe-site-card-header">
              <span className="globe-site-id">{site.id}</span>
              <span className={`badge badge-${
                site.status === 'OPTIMAL' ? 'success' : site.status === 'EXCLUDED' ? 'danger' : site.status === 'REVIEW' ? 'warning' : 'accent'
              }`}>{site.status}</span>
            </div>
            <div className="globe-site-name">{site.name}</div>
            <div className="globe-site-data">
              <div className="data-row"><span className="data-label">Lat/Lon</span><span className="data-value">{site.lat}| / {site.lon}|</span></div>
              <div className="data-row"><span className="data-label">Ice Prob.</span><span className="data-value" style={{ color: '#4FC3F7' }}>{(site.iceProbability * 100).toFixed(0)}%</span></div>
              <div className="data-row"><span className="data-label">CPR</span><span className="data-value">{site.cpr}</span></div>
              <div className="data-row"><span className="data-label">Slope</span><span className="data-value">{site.slope}|</span></div>
              <div className="data-row"><span className="data-label">Risk</span><span className="data-value">{(site.riskScore * 100).toFixed(0)}%</span></div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// PSR region overlay disc
function PSRDisc({ psr }) {
  const pos = latLonToVec3(psr.lat, psr.lon, 1.002);
  const normal = pos.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
  const radius = psr.radius * 0.0004; // scale to sphere

  return (
    <mesh position={pos} quaternion={quaternion}>
      <circleGeometry args={[radius, 32]} />
      <meshBasicMaterial
        color={new THREE.Color(0x1a2535)}
        transparent
        opacity={0.65}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Rover path line
function RoverPath() {
  const points = ROVER_WAYPOINTS.map(wp => latLonToVec3(wp.lat, wp.lon, 1.018));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#F4C542" linewidth={2} />
    </line>
  );
}

// Star field
function StarField() {
  return (
    <Stars
      radius={200}
      depth={60}
      count={6000}
      factor={3}
      saturation={0}
      fade
      speed={0.3}
    />
  );
}

// Auto-rotate + camera controller
function CameraController({ autoRotate, selectedSite, onInteraction }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const targetRef = useRef(new THREE.Spherical().setFromVector3(camera.position));
  const idleTimer = useRef(null);

  const handleStart = useCallback(() => {
    onInteraction();
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      onInteraction(true);
    }, 5000);
  }, [onInteraction]);

  useFrame((_, delta) => {
    if (autoRotate && controlsRef.current) {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 0.25;
    } else if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }
    controlsRef.current?.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={1.4}
      maxDistance={4}
      enablePan={false}
      onStart={handleStart}
    />
  );
}

// Coordinate readout from mouse position
function CoordinateReadout({ onCoords }) {
  const { camera, size } = useThree();
  const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
  const raycaster = new THREE.Raycaster();

  useEffect(() => {
    const handleMove = (e) => {
      const rect = e.target.getBoundingClientRect?.();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera({ x, y }, camera);
      const target = new THREE.Vector3();
      if (raycaster.ray.intersectSphere(sphere, target)) {
        const lat = (90 - Math.acos(target.y) * (180 / Math.PI)).toFixed(2);
        const lon = (Math.atan2(target.z, -target.x) * (180 / Math.PI) - 180).toFixed(2);
        onCoords({ lat, lon, elev: (Math.random() * 200 - 4000).toFixed(0) });
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [camera, onCoords]);

  return null;
}

// ──────────────────────────────────────────────
// Main Three.js Scene
// ──────────────────────────────────────────────
function Scene({ vizMode, selectedSite, setSelectedSite, autoRotate, setAutoRotate, onCoords }) {
  const handleInteraction = useCallback((resumeAuto = false) => {
    if (resumeAuto) setAutoRotate(true);
    else setAutoRotate(false);
  }, [setAutoRotate]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.06} color={new THREE.Color(0x8ab4c8)} />
      <directionalLight
        position={[5, 3, 2]}
        intensity={2.2}
        color={new THREE.Color(0xfff8f0)}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight
        skyColor={new THREE.Color(0x0b111a)}
        groundColor={new THREE.Color(0x050709)}
        intensity={0.1}
      />

      <StarField />

      <Suspense fallback={null}>
        <Moon vizMode={vizMode} />
        <Atmosphere />

        {/* PSR regions */}
        {PSR_REGIONS.map(psr => <PSRDisc key={psr.id} psr={psr} />)}

        {/* Landing sites */}
        {LANDING_SITES.map(site => (
          <SiteMarker
            key={site.id}
            site={site}
            isSelected={selectedSite?.id === site.id}
            onClick={(s) => setSelectedSite(prev => prev?.id === s.id ? null : s)}
          />
        ))}

        {/* Rover path */}
        <RoverPath />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.3} intensity={0.4} />
      </EffectComposer>

      <CameraController
        autoRotate={autoRotate}
        selectedSite={selectedSite}
        onInteraction={handleInteraction}
      />

      <CoordinateReadout onCoords={onCoords} />
    </>
  );
}

// ──────────────────────────────────────────────
// HUD Overlay Components
// ──────────────────────────────────────────────
function HUDTopLeft() {
  return (
    <div className="hud hud--tl glass">
      <div className="hud-logo-row">
        <SpBadge size={22} />
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ISRO | Mission</div>
          <div style={{ fontFamily: 'var(--font-brand)', fontSize: '0.9375rem', color: 'white', letterSpacing: '0.04em' }}>ShadowProbe</div>
        </div>
      </div>
      <div className="separator" style={{ margin: '8px 0' }} />
      <div className="data-row"><span className="data-label">Mission ID</span><span className="data-value">SP-01</span></div>
      <div className="data-row"><span className="data-label">Instrument</span><span className="data-value">DFSAR / OHRC</span></div>
      <div className="data-row"><span className="data-label">Altitude</span><span className="data-value">100 km</span></div>
    </div>
  );
}

function HUDTopRight() {
  const [time, setTime] = useState(new Date());
  const [showProgress, setShowProgress] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hud hud--tr glass">
      <div className="data-row">
        <span className="data-label">Mission Date</span>
        <span className="data-value">{time.toISOString().slice(0, 10)}</span>
      </div>
      <div className="data-row">
        <span className="data-label">Dataset</span>
        <span className="data-value">DFSAR (Illustrative)</span>
      </div>
      <div className="data-row">
        <span className="data-label">AI Status</span>
        <span className="data-value" style={{ color: 'var(--warning)' }}>Prototype Mode</span>
      </div>
      <div className="data-row">
        <span className="data-label">Radar Coverage</span>
        <span className="data-value">Pending Official Dataset</span>
      </div>
      <div className="separator" style={{ margin: '6px 0' }} />
      <div 
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => setShowProgress(!showProgress)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="progress-bar" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: '50%' }} />
          </div>
          <span className="mono" style={{ fontSize: '0.625rem' }}>50%</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', marginTop: 4 }}>
          PROTOTYPE PROGRESS (CLICK)
        </div>
        
        {showProgress && (
          <div className="glass" style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, padding: 12, width: 240, zIndex: 10, fontSize: '0.625rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ color: 'var(--text-bright)', marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 4 }}>Completed Modules</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span>Frontend</span><span>100%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span>Three.js Viewer</span><span>100%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span>Responsive UI</span><span>100%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span>Official DFSAR</span><span>0%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span>Official OHRC</span><span>0%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>AI Inference</span><span>0%</span></div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 4, display: 'flex', justifyContent: 'space-between', color: 'var(--accent)' }}>
              <span>Overall</span><span>3 / 6 = 50%</span>
            </div>
            <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.4 }}>
              Illustrative project progress. Not scientific confidence.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HUDBottomLeft({ coords }) {
  return (
    <div className="hud hud--bl glass">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: 6 }}>CURSOR POSITION</div>
      <div className="data-row"><span className="data-label">Latitude</span><span className="data-value">{coords.lat}|</span></div>
      <div className="data-row"><span className="data-label">Longitude</span><span className="data-value">{coords.lon}|</span></div>
      <div className="data-row"><span className="data-label">Elevation</span><span className="data-value">{coords.elev} m</span></div>
      <div className="data-row"><span className="data-label">CPR</span><span className="data-value">0.{Math.abs(parseInt(coords.lat)) % 100} (Illustrative)</span></div>
    </div>
  );
}

function HUDBottomRight() {
  const LEGEND = [
    { color: '#2ECC71', label: 'Optimal Site' },
    { color: '#4FC3F7', label: 'Candidate Site' },
    { color: '#F4C542', label: 'Review Required' },
    { color: '#EF5350', label: 'Excluded' },
    { color: 'rgba(26,37,53,0.9)', label: 'Permanent Shadow', border: '1px solid rgba(79,195,247,0.2)' },
    { color: '#F4C542', label: 'Rover Traverse', dashed: true },
  ];

  return (
    <div className="hud hud--br glass">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: 8 }}>LAYER LEGEND</div>
      {LEGEND.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <div style={{
            width: item.dashed ? 18 : 8,
            height: item.dashed ? 2 : 8,
            background: item.color,
            borderRadius: item.dashed ? 0 : '50%',
            border: item.border || 'none',
            borderStyle: item.dashed ? 'dashed' : undefined,
            flexShrink: 0,
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-muted)' }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Visualization mode switcher
function VizModePanel({ activeMode, onSelect }) {
  const icons = {
    optical: Eye, radar: Radio, cpr: Activity,
    ice: Thermometer, elevation: Mountain, psr: CloudOff
  };

  return (
    <div className="viz-mode-panel glass">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-dim)', letterSpacing: '0.12em', marginBottom: 8, textTransform: 'uppercase' }}>Visualization</div>
      {VIZ_MODES.map((mode) => {
        const Icon = icons[mode.id] || Eye;
        const active = activeMode === mode.id;
        return (
          <button
            key={mode.id}
            className={`viz-mode-btn ${active ? 'viz-mode-btn--active' : ''}`}
            onClick={() => onSelect(mode.id)}
            title={mode.label}
          >
            <Icon size={11} />
            <span>{mode.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────
// Exported Mission Viewer Section
// ──────────────────────────────────────────────
export default function MissionViewer() {
  const [vizMode, setVizMode] = useState('optical');
  const [selectedSite, setSelectedSite] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [coords, setCoords] = useState({ lat: '-89.54', lon: '0.00', elev: '-1842' });

  const handleCoords = useCallback((c) => setCoords(c), []);

  return (
    <section id="mission-viewer" className="mission-viewer-section">
      {/* Section header */}
      <div className="mission-viewer-header">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Interactive Mission Workspace</span>
        </div>
        <h2>Lunar South Polar<br /><span style={{ color: 'var(--accent)' }}>Mission Control</span></h2>
        <p className="mission-viewer-desc" style={{ marginBottom: 24 }}>
          Drag to rotate | Scroll to zoom | Click markers for site details
        </p>
        <div className="data-source-card">
          <div className="data-source-card__label">Data Source</div>
          <div className="data-source-card__title">Official Chandrayaan-2 DFSAR / OHRC</div>
          <div className="data-source-card__meta">Status: Illustrative prototype visualization until the official dataset is integrated.</div>
        </div>
      </div>

      {/* Globe container */}
      <div className="globe-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 2.8], fov: 45 }}
          shadows
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
          style={{ background: 'transparent' }}
        >
          <Scene
            vizMode={vizMode}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            onCoords={handleCoords}
          />
        </Canvas>

        {/* HUD Overlays */}
        <HUDTopLeft />
        <HUDTopRight />
        <HUDBottomLeft coords={coords} />
        <HUDBottomRight />
        <VizModePanel activeMode={vizMode} onSelect={setVizMode} />



        {/* Selected site panel */}
        <AnimatePresence>
          {selectedSite && (
            <motion.div
              className="selected-site-panel glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="data-label" style={{ marginBottom: 4 }}>{selectedSite.id}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: 'white' }}>{selectedSite.name}</div>
                </div>
                <span className={`badge badge-${selectedSite.status === 'OPTIMAL' ? 'success' : selectedSite.status === 'EXCLUDED' ? 'danger' : selectedSite.status === 'REVIEW' ? 'warning' : 'accent'}`}>
                  {selectedSite.status}
                </span>
              </div>
              <div className="separator" style={{ margin: '12px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                {[
                  ['Latitude', `${selectedSite.lat}|`],
                  ['Longitude', `${selectedSite.lon}|`],
                  ['Ice Prob.', `${(selectedSite.iceProbability * 100).toFixed(0)}%`],
                  ['Slope', `${selectedSite.slope}|`],
                  ['CPR', selectedSite.cpr],
                  ['Risk', `${(selectedSite.riskScore * 100).toFixed(0)}%`],
                ].map(([k, v]) => (
                  <div key={k} className="data-row">
                    <span className="data-label">{k}</span>
                    <span className="data-value">{v}</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 10, fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{selectedSite.notes}</p>
              <button className="btn btn-ghost" style={{ padding: '6px 0', fontSize: '0.75rem', marginTop: 6 }} onClick={() => setSelectedSite(null)}>
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}






