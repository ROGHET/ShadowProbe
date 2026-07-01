import { Fragment, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import { LANDING_SITES } from '../../data/missionData';
import './LandingSiteTable.css';

export default function LandingSiteTable() {
  const [sortKey, setSortKey] = useState('iceProbability');
  const [sortDir, setSortDir] = useState(-1); // -1 = desc
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const sorted = [...LANDING_SITES].sort((a, b) => sortDir * (b[sortKey] - a[sortKey]));

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => -d);
    else { setSortKey(key); setSortDir(-1); }
  };

  const COL_HEADERS = [
    { label: 'Rank',    key: null        },
    { label: 'Site',    key: null        },
    { label: 'Lat',     key: 'lat'       },
    { label: 'Lon',     key: 'lon'       },
    { label: 'Slope',   key: 'slope'     },
    { label: 'CPR',     key: 'cpr'       },
    { label: 'Ice %',   key: 'iceProbability' },
    { label: 'Risk',    key: 'riskScore' },
    { label: 'Status',  key: null        },
  ];

  return (
    <section className="landing-table-section">
      <div className="section">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Landing Assessment | Ranked Candidates</span>
        </div>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: 40 }}
        >
          Landing Site <span style={{ color: 'var(--accent)' }}>Ranking</span>
        </motion.h2>

        <div className="data-source-card" style={{ marginBottom: 20 }}>
          <div className="data-source-card__label">Data Source</div>
          <div className="data-source-card__title">Official Chandrayaan-2 landing-site references</div>
          <div className="data-source-card__meta">Status: Illustrative rankings until the official competition dataset is supplied.</div>
        </div>

        <motion.div
          className="table-wrap glass-strong"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <table className="site-table">
            <thead>
              <tr>
                {COL_HEADERS.map((col) => (
                  <th
                    key={col.label}
                    className={col.key ? 'th-sortable' : ''}
                    onClick={() => col.key && handleSort(col.key)}
                  >
                    <div className="th-inner">
                      {col.label}
                      {col.key && (
                        <span className="sort-icon">
                          {sortKey === col.key
                            ? sortDir === -1 ? <ChevronDown size={10} /> : <ChevronUp size={10} />
                            : <ChevronDown size={10} style={{ opacity: 0.3 }} />
                          }
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((site, i) => (
                <Fragment key={site.id}>
                  <motion.tr
                    className={`site-row ${selected === site.id ? 'site-row--selected' : ''}`}
                    onClick={() => setSelected(prev => prev === site.id ? null : site.id)}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.04 }}
                  >
                    <td>
                      <div className="rank-cell">
                        <span className="rank-num">{String(i + 1).padStart(2, '0')}</span>
                        {i === 0 && <span className="rank-star">★</span>}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, color: 'white', fontSize: '0.875rem' }}>{site.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-dim)', marginTop: 1 }}>{site.id}</div>
                    </td>
                    <td><span className="mono">{site.lat}|</span></td>
                    <td><span className="mono">{site.lon}|</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 36, height: 2, background: 'var(--border)', borderRadius: 1, overflow: 'hidden' }}>
                          <div style={{ width: `${(site.slope / 15) * 100}%`, height: '100%', background: site.slope > 8 ? 'var(--danger)' : site.slope > 5 ? 'var(--warning)' : 'var(--success)', borderRadius: 1 }} />
                        </div>
                        <span className="mono">{site.slope}|</span>
                      </div>
                    </td>
                    <td><span className="mono">{site.cpr}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 36, height: 2, background: 'var(--border)', borderRadius: 1, overflow: 'hidden' }}>
                          <div style={{ width: `${site.iceProbability * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: 1 }} />
                        </div>
                        <span className="mono" style={{ color: 'var(--accent)' }}>{(site.iceProbability * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="mono" style={{ color: site.riskScore > 0.5 ? 'var(--danger)' : site.riskScore > 0.3 ? 'var(--warning)' : 'var(--success)' }}>
                        {(site.riskScore * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${site.status === 'OPTIMAL' ? 'success' : site.status === 'EXCLUDED' ? 'danger' : site.status === 'REVIEW' ? 'warning' : 'accent'}`}>
                        {site.status}
                      </span>
                    </td>
                  </motion.tr>

                  {/* Expanded row */}
                  <AnimatePresence>
                    {selected === site.id && (
                      <tr key={`${site.id}-expand`}>
                        <td colSpan={9} style={{ padding: 0 }}>
                          <motion.div
                            className="site-expand"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="site-expand-inner">
                              <div className="site-expand-grid">
                                <div>
                                  <div className="data-label" style={{ marginBottom: 6 }}>Notes</div>
                                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{site.notes}</p>
                                </div>
                                <div>
                                  <div className="data-label" style={{ marginBottom: 8 }}>Detailed Metrics</div>
                                  {[
                                    ['Elevation', `${site.elevation} m`],
                                    ['DOP', site.dop],
                                    ['PSR Coverage', `${site.psrCoverage}%`],
                                    ['Illumination', `${site.illumination}%`],
                                    ['Boulder Density', site.boulderDensity],
                                    ['Science Score', `${(site.scientificScore * 100).toFixed(0)}%`],
                                    ['Traverse Dist.', `${site.traverseDistance} km`],
                                  ].map(([k, v]) => (
                                    <div key={k} className="data-row">
                                      <span className="data-label">{k}</span>
                                      <span className="data-value">{v}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

