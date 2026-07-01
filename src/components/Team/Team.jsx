import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Users } from 'lucide-react';
import SpBadge from '../Brand/SpBadge';
import './Team.css';

const TEAM = [
  {
    name: 'Harshit Rawat',
    role: 'Project Lead & Full-Stack Developer',
    email: 'harshit.rawat@somaiya.edu',
    phone: '+91 7074081071',
    linkedin: 'https://www.linkedin.com/in/harshit-rawat-956850298/',
    isLeader: true,
  },
  {
    name: 'Kaushiki Choubey',
    role: 'Geospatial Analysis & Research',
    linkedin: 'https://www.linkedin.com/in/kaushiki-choubey-a38215320/',
  },
  {
    name: 'Akshat Saxena',
    role: 'AI & Data Processing',
    linkedin: 'https://www.linkedin.com/in/akshat-saxena-68b3312a3/',
  },
  {
    name: 'Meet Motwani',
    role: 'Mission Planning & Algorithms',
    linkedin: 'https://www.linkedin.com/in/meet-motwani',
  }
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const leader = TEAM[0];
  const members = TEAM.slice(1);

  return (
    <section id="team" className="team-section">
      <div className="section">
        <motion.div
          ref={ref}
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <div className="section-label-line" />
          <span className="section-label-text">ShadowProbe Team</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          style={{ marginBottom: 24 }}
        >
          Research <span style={{ color: 'var(--accent)' }}>Team</span>
        </motion.h2>

        <div className="team-grid">
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Leader */}
            <motion.article
              className="team-card card card-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div className="team-card-head">
                <SpBadge size={44} />
                <div>
                  <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="team-name team-link">{leader.name}</a>
                  <div className="team-role">{leader.role}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <Mail size={12} />
                  <span>{leader.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <Phone size={12} />
                  <span>{leader.phone}</span>
                </div>
              </div>
            </motion.article>

            {/* Member: Akshat */}
            <motion.article
              className="team-card card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22 }}
              style={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}
            >
              <div className="team-card-head" style={{ marginBottom: 0 }}>
                <div className="team-avatar-placeholder"><Users size={20} /></div>
                <div>
                  <a href={members[1].linkedin} target="_blank" rel="noopener noreferrer" className="team-name team-link">{members[1].name}</a>
                  <div className="team-role">{members[1].role}</div>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Member: Kaushiki */}
            <motion.article
              className="team-card card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.16 }}
              style={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}
            >
              <div className="team-card-head" style={{ marginBottom: 0 }}>
                <div className="team-avatar-placeholder"><Users size={20} /></div>
                <div>
                  <a href={members[0].linkedin} target="_blank" rel="noopener noreferrer" className="team-name team-link">{members[0].name}</a>
                  <div className="team-role">{members[0].role}</div>
                </div>
              </div>
            </motion.article>

            {/* Member: Meet */}
            <motion.article
              className="team-card card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.20 }}
              style={{ display: 'flex', alignItems: 'center', height: 'fit-content' }}
            >
              <div className="team-card-head" style={{ marginBottom: 0 }}>
                <div className="team-avatar-placeholder"><Users size={20} /></div>
                <div>
                  <a href={members[2].linkedin} target="_blank" rel="noopener noreferrer" className="team-name team-link">{members[2].name}</a>
                  <div className="team-role">{members[2].role}</div>
                </div>
              </div>
            </motion.article>

            {/* Project Card */}
            <motion.article
              className="team-card card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.26 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, height: 'fit-content' }}
            >
              <div className="team-role">Research Prototype Website</div>
              <div className="team-name">ShadowProbe</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Interactive visualization platform for the ISRO Bharatiya Antariksh Hackathon 2026 prototype.
              </div>
              <a 
                href="https://shadow-probe.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: 'inline-block', 
                  marginTop: 4, 
                  padding: '10px 16px', 
                  background: 'rgba(79,195,247,0.1)', 
                  border: '1px solid rgba(79,195,247,0.3)',
                  color: 'var(--accent)', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  borderRadius: 'var(--radius-sm)', 
                  textDecoration: 'none', 
                  textAlign: 'center',
                  transition: 'background 0.2s, border-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79,195,247,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(79,195,247,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(79,195,247,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(79,195,247,0.3)';
                }}
              >
                Visit Website
              </a>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
