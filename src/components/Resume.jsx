import React from 'react';
import useReveal from '../hooks/useReveal.js';
import './Resume.css';

const experience = [
  {
    role: 'Quality Assurance Specialist',
    company: 'PrintScan Fingerprinting',
    period: 'Jul 2023 – Dec 2023',
    type: 'Professional',
    bullets: [
      'Architected Selenium-based regression framework in C# → 40%+ reduction in manual testing per sprint',
      'Investigated, reproduced, and documented bugs in close collaboration with dev team',
      'Contributed directly to C# codebase with bug fixes and feature work',
      'Engineered database-driven location search system, improving SEO and navigation',
      'Built custom automation tools for appointment creation workflows',
    ],
  },
  {
    role: 'Guest Advocate',
    company: 'Target',
    period: 'Dec 2021 – Mar 2023',
    type: 'Service',
    bullets: [
      'Resolved high-volume customer inquiries under pressure with strong attention to detail',
      'Developed communication, teamwork, and problem-solving skills in a fast-paced environment',
    ],
  },
];

export default function Resume() {
  useReveal();
  return (
    <section className="resume-section" id="resume">
      <div className="resume-label reveal">
        <span className="section-num">04</span>
        <span className="section-slash">/</span>
        <span>resume</span>
      </div>
      <div className="resume-layout">
        <div className="resume-left reveal">
          <h2 className="resume-heading">
            Full<br />
            <span className="heading-accent">background.</span>
          </h2>
          <p className="resume-blurb">
            Detail-oriented QA Engineer with hands-on automation experience, direct codebase contributions,
            and five industry certifications. Currently expanding into front-end development.
          </p>
          <a href="/resume.pdf" download className="btn-download">
            <span>↓</span>
            <span>Download PDF Resume</span>
          </a>
          <div className="resume-edu">
            <div className="edu-label">Education</div>
            <div className="edu-name">Hicksville High School</div>
            <div className="edu-deg">High School Diploma · 2023</div>
          </div>
        </div>
        <div className="resume-right">
          {experience.map((exp, i) => (
            <div className="exp-item reveal" key={exp.company} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="exp-header">
                <div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company">{exp.company}</div>
                </div>
                <div className="exp-right">
                  <span className="exp-badge">{exp.type}</span>
                  <span className="exp-period">{exp.period}</span>
                </div>
              </div>
              <ul className="exp-bullets">
                {exp.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
