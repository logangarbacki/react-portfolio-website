import React from 'react';
import useReveal from '../hooks/useReveal.js';
import './About.css';

const stats = [
  { value: '40%+', label: 'Reduced manual regression testing by 40%+ on PrintScan’s production front-end appointment scheduling system' },
  { value: '5', label: '5 relevant certifications earned' },
  { value: 'C# / HTML / CSS / JS', label: 'Primary languages' },
  { value: '2023', label: 'Started professional QA career' },
];

export default function About() {
  useReveal();
  return (
    <section className="about" id="about">
      <div className="about-label reveal">
        <span className="section-num">01</span>
        <span className="section-slash">/</span>
        <span>about</span>
      </div>
      <div className="about-grid">
        <div className="about-left reveal">
          <h2 className="about-heading">
            Quality first,<br />
            <span className="heading-accent">always.</span>
          </h2>
          <div className="about-badge">
            <span className="badge-dot"></span>
            Hicksville, NY · Open to Remote
          </div>
        </div>
        <div className="about-right">
          <p className="about-text reveal">
            I'm a self-taught QA Engineer and web developer who got real-world experience
            early — building a Selenium-based regression framework at PrintScan that cut
            manual testing effort by over 40%. I don't just find bugs, I fix them too.
          </p>
          <p className="about-text reveal" style={{transitionDelay:'0.15s'}}>
            Currently expanding into front-end development with React and modern tooling,
            so I can contribute across the full SDLC — from writing test plans to shipping
            features. I understand both sides of the codebase.
          </p>
          <div className="about-stats">
            {stats.map((s, i) => (
              <div className="stat-item reveal" key={s.label} style={{transitionDelay: `${i * 0.1}s`}}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
