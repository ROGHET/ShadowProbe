import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Circle, Calendar } from 'lucide-react';
import { TIMELINE_EVENTS } from '../../data/missionData';
import './MissionTimeline.css';

const STATUS_LABELS = [
  'Illustrative',
  'Illustrative',
  'Expected Workflow',
  'Expected Workflow',
  'Concept',
  'Planned',
  'Future Module',
  'Dataset Required',
  'Planned',
  'Concept',
  'Expected Workflow',
];

const STATUS_CLASSES = [
  'badge-neutral',
  'badge-neutral',
  'badge-accent',
  'badge-accent',
  'badge-warning',
  'badge-neutral',
  'badge-accent',
  'badge-warning',
  'badge-neutral',
  'badge-warning',
  'badge-accent',
];

function TimelineEvent({ ev, index, inView }) {
  return (
    <motion.div
      className="timeline-event"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="timeline-node">
        <Circle size={20} style={{ color: index < 4 ? 'var(--success)' : index < 8 ? 'var(--accent)' : 'var(--warning)' }} />
      </div>

      <div className="timeline-content">
        <div className="timeline-date">{ev.date}</div>
        <div className="timeline-label">{ev.label}</div>
        <div className="timeline-desc">{ev.desc}</div>
        <span className={`badge ${STATUS_CLASSES[index]}`} style={{ marginTop: 6, fontSize: '0.5rem' }}>
          {STATUS_LABELS[index]}
        </span>
      </div>
    </motion.div>
  );
}

export default function MissionTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const firstRow = TIMELINE_EVENTS.slice(0, 6);
  const secondRow = TIMELINE_EVENTS.slice(6);

  return (
    <section id="timeline" className="timeline-section">
      <div className="section">
        <motion.div
          ref={ref}
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="section-label-line" />
          <span className="section-label-text">Mission Schedule · SP-01</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: 40 }}
        >
          Mission <span style={{ color: 'var(--accent)' }}>Timeline</span>
        </motion.h2>

        <div className="timeline-wrap">
          <div className="timeline-rows">
            <div className="timeline-row timeline-row--first">
              <div className="timeline-track">
                <motion.div
                  className="timeline-track-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 1.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              {firstRow.map((ev, index) => (
                <TimelineEvent key={ev.id} ev={ev} index={index} inView={inView} />
              ))}
            </div>

            <div className="timeline-bridge">
              <div className="timeline-bridge-line" />
              <div className="timeline-bridge-node">
                <Calendar size={12} />
              </div>
            </div>

            <div className="timeline-row timeline-row--second">
              <div className="timeline-track">
                <motion.div
                  className="timeline-track-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 1.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              {secondRow.map((ev, index) => (
                <TimelineEvent key={ev.id} ev={ev} index={index + firstRow.length} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

