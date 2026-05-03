import { useEffect, useRef } from 'react';
import './About.css';
import SectionLog from './SectionLog';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ps = el.querySelectorAll('p');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    ps.forEach((p) => obs.observe(p));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const ref = useReveal();
  return (
    <>
      <SectionLog id="about" ts="[01:00]" path="/about" />
      <section ref={ref} className="about" data-testid="about">
        <p data-testid="about-paragraph-1">
          Self-taught engineer based on Long Island. I work the <em>QA</em> and{' '}
          <em>development</em> sides of the same problem — automation frameworks
          in C#, web apps in React, Next.js, and Django — and I'm most effective
          when I get to do both at once.
        </p>
        <p data-testid="about-paragraph-2">
          The dashboard above isn't decoration. It's the live CI/CD pipeline for{' '}
          <em>this very page</em> — every push to <code>main</code> triggers a
          Selenium framework I built solo, runs against the production deploy,
          and publishes an Allure report. The numbers you see come straight from
          the latest run.
        </p>
      </section>
    </>
  );
}
