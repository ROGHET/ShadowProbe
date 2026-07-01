import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Users } from 'lucide-react';
import SpBadge from '../Brand/SpBadge';
import './Team.css';

const LEADER = {
  name: 'Harshit Rawat',
  role: 'Team Leader',
  email: 'harshit.rawat@somaiya.edu',
  phone: '+91 7074081071',
  linkedin: 'https://www.linkedin.com/in/harshit-rawat-956850298/',
};

const MEMBERS = [
  { name: 'Kaushiki Choubey', linkedin: 'https://www.linkedin.com/in/kaushiki-choubey-a38215320/' },
  { name: 'Akshat Saxena', linkedin: 'https://www.linkedin.com/in/akshat-saxena-68b3312a3/' },
  { name: 'Meet Motwani', linkedin: 'https://www.linkedin.com/in/meet-motwani' },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
          <motion.article
            className="team-leader card card-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 }}
          >
            <div className="team-card-head">
              <SpBadge size={52} />
              <div>
                <div className="team-role">Leader</div>
                <a href={LEADER.linkedin} target="_blank" rel="noopener noreferrer" className="team-name team-link">{LEADER.name}</a>
              </div>
            </div>

            <div className="team-contact-row">
              <Mail size={12} />
              <span>{LEADER.email}</span>
            </div>
            <div className="team-contact-row">
              <Phone size={12} />
              <span>{LEADER.phone}</span>
            </div>
          </motion.article>

          <motion.article
            className="team-members card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
          >
            <div className="team-panel-heading">
              <Users size={12} />
              <span>Members</span>
            </div>
            <div className="team-member-list">
              {MEMBERS.map((member) => (
                <a key={member.name} href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-member team-link">
                  {member.name}
                </a>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
