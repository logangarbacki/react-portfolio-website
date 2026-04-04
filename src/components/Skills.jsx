import React from 'react';
import useReveal from '../hooks/useReveal.js';
import './Skills.css';

const skillGroups = [
  { category: 'QA & Testing', color: 'var(--cyan)',
    items: ['Manual Testing', 'Test Automation', 'Regression Testing', 'Functional Testing', 'Defect Tracking', 'Agile / SDLC'] },
  { category: 'Automation Tools', color: 'var(--orange)',
    items: ['Selenium WebDriver', 'Cypress', 'JMeter', 'Postman'] },
  { category: 'Languages', color: 'var(--green)',
    items: ['C#', 'JavaScript', 'HTML5', 'CSS3'] },
  { category: 'Frameworks & Tools', color: 'var(--cyan)',
    items: ['.NET', 'React', 'Vite', 'Git & GitHub', 'VS Code'] },
];

const certs = [
  { name: 'Software QA & Test Automation Engineering', issuer: 'Coursera', year: '2026' },
  { name: 'Software Testing, Deployment & Maintenance', issuer: 'IBM', year: '2026' },
  { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta / Coursera', year: '2026' },
  { name: 'Selenium 4 Fundamentals with C#', issuer: 'Pluralsight', year: '2023' },
  { name: 'Foundational C# with Microsoft', issuer: 'Microsoft / FreeCodeCamp', year: '2023' },
];

export default function Skills() {
  useReveal();
  return (
    <section className="skills" id="skills">
      <div className="skills-label reveal">
        <span className="section-num">03</span>
        <span className="section-slash">/</span>
        <span>skills</span>
      </div>
      <div className="skills-layout">
        <div className="skills-left">
          <h2 className="skills-heading reveal">
            What I<br />
            <span className="heading-accent">work with.</span>
          </h2>
        </div>
        <div className="skills-right">
          <div className="skill-groups">
            {skillGroups.map((g, gi) => (
              <div className="skill-group reveal" key={g.category} style={{ transitionDelay: `${gi * 0.1}s` }}>
                <div className="skill-group-header" style={{ '--g-color': g.color }}>
                  <span className="skill-group-dot" style={{ background: g.color }}></span>
                  {g.category}
                </div>
                <div className="skill-pills">
                  {g.items.map(item => (
                    <span className="skill-pill" key={item} style={{ '--g-color': g.color }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="certs reveal">
            <div className="certs-header">
              <span className="section-num">✓</span> Certifications
            </div>
            <div className="certs-sub">
              Certifications are easily verified on my LinkedIn profile, click 
              <a href="https://www.linkedin.com/in/logan-garbacki-2b9b7b277/" target="_blank" rel="noopener noreferrer"> here </a>
              to{' '} verify.
            </div>
            {certs.map(c => (
              <div className="cert-row" key={c.name}>
                <span className="cert-name">{c.name}</span>
                <span className="cert-meta">{c.issuer} · {c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
