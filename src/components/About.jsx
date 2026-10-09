import { useReveal } from '../hooks/useReveal.js';

export default function About() {
  const ref = useReveal(0.2);
  return (
    <section ref={ref} className="section" id="about" data-testid="about">
      <h2>About</h2>
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
      <p className="reveal" data-testid="about-paragraph-3">
        I'm looking for a junior QA or developer role on Long Island or in NYC,
        on-site or hybrid.
      </p>
    </section>
  );
}
