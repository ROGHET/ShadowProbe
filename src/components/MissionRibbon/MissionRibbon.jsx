import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Satellite, Database, MapPin, Activity } from 'lucide-react';
import './MissionRibbon.css';

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="ribbon-value ribbon-clock">
      {time.toUTCString().slice(17, 25)} UTC
    </span>
  );
}

export default function MissionRibbon() {
  return (
    <motion.div
      className="mission-ribbon"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <div className="ribbon-inner">
        <div className="ribbon-item">
          <Satellite size={10} className="ribbon-icon" />
          <span className="ribbon-label">MISSION</span>
          <span className="ribbon-value ribbon-value--bright">ShadowProbe SP-01</span>
        </div>
        <div className="ribbon-sep" />
        <div className="ribbon-item">
          <Activity size={10} className="ribbon-icon ribbon-icon--pulse" />
          <span className="ribbon-label">STATUS</span>
          <span className="ribbon-value ribbon-value--warning">Research Prototype</span>
        </div>
        <div className="ribbon-sep" />
        <div className="ribbon-item">
          <Database size={10} className="ribbon-icon" />
          <span className="ribbon-label">DATASET</span>
          <span className="ribbon-value">DFSAR Rev.2 · OHRC-4K</span>
        </div>
        <div className="ribbon-sep" />
        <div className="ribbon-item">
          <MapPin size={10} className="ribbon-icon" />
          <span className="ribbon-label">TARGET</span>
          <span className="ribbon-value">Lunar South Pole · 89.9°S</span>
        </div>
        <div className="ribbon-sep" />
        <div className="ribbon-item">
          <Clock size={10} className="ribbon-icon" />
          <span className="ribbon-label">UTC</span>
          <LiveClock />
        </div>
      </div>
    </motion.div>
  );
}

