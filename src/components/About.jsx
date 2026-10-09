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
        I treat this site like a production app. The Selenium suite covers every
        section with smoke, regression, negative, and end-to-end tests, and each
        run publishes a public Allure report with screenshots of any failures.
      </p>
      <p className="reveal" data-testid="about-paragraph-3">
        I'm looking for a junior QA or developer role on Long Island or in NYC,
        on-site or hybrid, and I'm open to remote.
      </p>
    </section>
  );
}
