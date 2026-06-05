import { useEffect, useRef } from 'react';
import './About.css';

// Progressive-enhancement reveal. Elements ship visible; this only animates them
// in when JS + IntersectionObserver exist, and a fallback timer reveals everything
// regardless so non-scrolling bots/screenshots never see empty content.
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((n) => n.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    items.forEach((n) => obs.observe(n));
    const t = setTimeout(() => items.forEach((n) => n.classList.add('in')), 1200);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

export default function About() {
  const ref = useReveal();
  return (
    <>
      <div className="section-head">
        <span className="ix">01</span>
        <h2>About</h2>
      </div>
      <section ref={ref} className="about" id="about" data-testid="about">
        <p className="reveal" data-testid="about-paragraph-1">
          I'm a self-taught engineer on Long Island, and I work both sides of the
          same problem: writing the <em>code</em>, and writing the <em>tests</em>{' '}
          that prove it holds up. Automation frameworks in C#, web apps in React,
          Next.js, and Django.
        </p>
        <p className="reveal" data-testid="about-paragraph-2">
          The dashboard above isn't decoration. Every push to <code>main</code>{' '}
          triggers a Selenium framework I built solo, runs it against the
          production deploy, and publishes an Allure report. The numbers come
          straight from the latest run.
        </p>
        <p className="reveal about-agency" data-testid="about-paragraph-3">
          I also ship client websites through{' '}
          <a
            href="https://garbackidigital.com/work"
            target="_blank"
            rel="noreferrer"
            data-testid="about-agency-link"
          >
            Garbacki Digital ↗
          </a>
        </p>
      </section>
    </>
  );
}
