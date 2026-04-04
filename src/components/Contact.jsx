import React from 'react';
import useReveal from '../hooks/useReveal.js';
import './Contact.css';

const links = [
  { label: 'GitHub', href: 'https://github.com/logangarbacki', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/logan-garbacki-2b9b7b277/', icon: '⊞' },
];

export default function Contact() {
  useReveal();
  return (
    <section className="contact" id="contact">
      <div className="contact-bg-text">HIRE ME</div>
      <div className="contact-label reveal">
        <span className="section-num">05</span>
        <span className="section-slash">/</span>
        <span>contact</span>
      </div>
      <div className="contact-inner">
        <div className="contact-left reveal">
          <h2 className="contact-heading">
            Let's build<br />
            <span className="heading-accent">something.</span>
          </h2>
          <p className="contact-sub">
            Open to QA engineering roles, junior developer positions and other software opportunities.
            Based in Hicksville, NY — available remote or local.
          </p>
        </div>
        <div className="contact-right reveal">
          <a href="mailto:contact@logangarbacki.dev" className="contact-email">
            <span className="email-label">primary</span>
            contact@logangarbacki.dev
            <span className="email-arrow">↗</span>
          </a>
          <div className="contact-links">
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="contact-link">
                <span className="link-icon">{l.icon}</span>
                <span>{l.label}</span>
                <span className="link-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="contact-footer reveal">
        <span>© 2026 Logan Garbacki</span>
        <span className="footer-sep">·</span>
        <span>logangarbacki.dev</span>
        <span className="footer-sep">·</span>
        <span>Built with Vite + React</span>
      </div>
    </section>
  );
}
