import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Database, FlaskConical, Workflow, ShieldAlert, Wrench } from 'lucide-react';
import { PROTOTYPE_DISCLAIMER, REFERENCES } from '../../data/missionData';
import './About.css';

const aboutCards = [
  {
    title: 'Mission Overview',
    icon: Workflow,
    body: 'ShadowProbe is a research pre-prototype for the Bharatiya Antariksh Hackathon 2026. It demonstrates the intended workflow for integrating Chandrayaan-2 DFSAR, OHRC, terrain analysis, and candidate landing-site reasoning.',
  },
  {
    title: 'Problem Statement',
    icon: FileText,
    body: 'The interface addresses Problem Statement 8 by presenting a guided analysis flow for lunar south polar ice assessment, landing-site screening, and rover-planning support.',
  },
  {
    title: 'Objectives',
    icon: FlaskConical,
    body: 'The prototype highlights the proposed end-to-end process: dataset ingestion, PSR mapping, radar interpretation, terrain evaluation, candidate ranking, and downstream planning.',
  },
  {
    title: 'Current Prototype Features',
    icon: Database,
    body: 'Interactive 3D Moon, mission dashboard, DFSAR and OHRC views, landing-site ranking, mission analytics, timeline, conceptual AI workflow, lunar mapping, rover planning, and command center.',
  },
  {
    title: 'Future Scope',
    icon: Wrench,
    body: 'Planned additions include live DFSAR ingestion, direct ISRO Bhuvan integration, real inference, deep-learning segmentation, mission simulation, 3D rover navigation, downloadable reports, mission replay, and API integration.',
  },
  {
    title: 'Technology Stack',
    icon: Wrench,
    body: 'React, Vite, Framer Motion, Three.js, React Three Fiber, Drei, Postprocessing, and canvas-based visualization layers.',
  },
];

const workflowSteps = [
  'Acquire official Chandrayaan-2 DFSAR dataset',
  'Acquire official Chandrayaan-2 OHRC imagery',
  'Map Permanently Shadowed Regions',
  'Identify double-shadowed craters',
  'Compute CPR and DOP',
  'Perform terrain analysis and boulder checks',
  'Fuse radar, terrain, and illumination features',
  'Estimate subsurface ice probability',
  'Rank landing sites',
  'Plan rover traverse paths',
  'Estimate ice volume',
  'Generate final mission recommendation',
];

const datasetItems = [
  ['DFSAR', 'Official Chandrayaan-2 radar dataset', 'Illustrative until supplied'],
  ['OHRC', 'Official Chandrayaan-2 optical imagery', 'Illustrative until supplied'],
  ['TMC-2 DEM', 'Terrain support layer', 'Reference elevation context'],
  ['IAU Gazetteer', 'Crater names and coordinates', 'Reference geometry'],
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="about-section">
      <div className="section">
        <motion.div
          ref={ref}
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="section-label-line" />
          <span className="section-label-text">About · Research Prototype</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          style={{ marginBottom: 20 }}
        >
          About <span style={{ color: 'var(--accent)' }}>ShadowProbe</span>
        </motion.h2>

        <motion.p
          className="about-intro"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }}
        >
          {PROTOTYPE_DISCLAIMER}
        </motion.p>

        <div className="about-grid">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                className="about-card card card-accent"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.16 + index * 0.05 }}
              >
                <div className="about-card-top">
                  <div className="about-card-icon">
                    <Icon size={16} />
                  </div>
                  <div className="about-card-title">{card.title}</div>
                </div>
                <p>{card.body}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="about-lower-grid">
          <motion.div
            className="about-panel card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28 }}
          >
            <div className="about-panel-heading">Scientific Workflow</div>
            <ol className="about-steps">
              {workflowSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            className="about-panel card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32 }}
          >
            <div className="about-panel-heading">Official Datasets</div>
            <div className="about-dataset-list">
              {datasetItems.map(([name, source, status]) => (
                <div key={name} className="about-dataset-row">
                  <div>
                    <div className="about-dataset-name">{name}</div>
                    <div className="about-dataset-source">{source}</div>
                  </div>
                  <span className="badge badge-neutral">{status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="about-lower-grid">
          <motion.div
            className="about-panel card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.36 }}
          >
            <div className="about-panel-heading">References</div>
            <div className="about-references">
              {REFERENCES.map((reference) => (
                <div key={reference.id} className="about-reference-item">
                  <div className="about-reference-citation">{reference.citation}</div>
                  <a href={reference.url} target="_blank" rel="noreferrer">{reference.url}</a>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-panel card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="about-panel-heading">Prototype Disclaimer</div>
            <p className="about-disclaimer">
              This application is a research prototype developed for the Bharatiya Antariksh Hackathon 2026. Unless explicitly stated otherwise, visualizations and numerical values are illustrative and are intended to demonstrate the proposed workflow rather than processed mission observations.
            </p>
            <p className="about-disclaimer">
              No scientific outputs shown here should be interpreted as processed Chandrayaan-2 results unless an official dataset reference is displayed.
            </p>
            <p className="about-disclaimer">
              Surface relief is represented using a high-resolution diffuse texture only. Physically accurate elevation/displacement rendering will be integrated when official DEM or height-map datasets are available.
            </p>
            <div className="about-data-source">
              <div className="about-data-source__label">Data Source</div>
              <div className="about-data-source__value">Official Chandrayaan-2 datasets: not yet integrated</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
