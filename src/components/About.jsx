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
          I'm a QA engineer and developer from Hicksville, on Long Island. I
          started out in QA at PrintScan, where I tested releases, helped build
          their test automation in C#, and built the location search that's
          still on their site today.
        </p>
        <p className="reveal" data-testid="about-paragraph-2">
          This site is also my test target. Every deploy to production kicks off
          my Selenium suite, and the results are published as a public Allure
          report. The numbers in the card above come straight from the latest run.
        </p>
        <p className="reveal about-note" data-testid="about-paragraph-3">
          I'm looking for a junior QA or developer role on Long Island or in NYC,
          on-site or hybrid.
        </p>
      </section>
    </>
  );
}
