import { useEffect, useRef } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    num: '01',
    suite: 'PrintScan Regression Framework',
    status: 'QA Specialist · 2023',
    statusKind: 'role',
    tail: 'PrintScan Fingerprinting',
    stack: 'C# · Selenium WebDriver',
    desc: (
      <>
        A Selenium regression suite in C# that I helped build with a senior
        developer for PrintScan's web platform. It cut the manual testing
        needed each sprint by over 40%.
      </>
    ),
    tags: ['regression', 'automation'],
    note: 'proprietary',
  },
  {
    num: '02',
    suite: 'PrintScan Location Search',
    status: 'in production',
    statusKind: 'pass',
    tail: 'PrintScan Fingerprinting',
    stack: 'C# · .NET · Razor Pages',
    desc: (
      <>
        The location search on printscan.com: a database-driven directory that
        generates a page for every PrintScan location, built to improve site
        navigation and local SEO. It's still live after First Advantage
        acquired the company.
      </>
    ),
    tags: ['full-stack', 'SEO', 'production'],
    links: [
      { href: 'https://printscan.com/Locations/Search', label: 'see it live →', testid: 'project-2-live' },
    ],
  },
  {
    num: '03',
    suite: 'Selenium UI Test Framework',
    status: 'live CI',
    statusKind: 'role',
    tail: 'tests this site',
    stack: 'C# · NUnit · Selenium WebDriver 4 · Allure · GitHub Actions',
    desc: (
      <>
        The test suite for this site: nearly 50 Selenium tests in C# and NUnit
        using the Page Object Model, run against production by GitHub Actions
        on every deploy and nightly, with a public Allure report. Two problems
        I had to solve: elements that only render once they're scrolled into
        view, and animated hero text that Selenium read as empty.
      </>
    ),
    tags: ['smoke', 'regression', 'e2e', 'parallel'],
    links: [
      { href: 'https://github.com/logangarbacki/react-portfolio-selenium-tests', label: 'github →', testid: 'project-3-github' },
      { href: 'https://logangarbacki.github.io/react-portfolio-selenium-tests/', label: 'allure →', testid: 'project-3-allure' },
    ],
  },
  {
    num: '04',
    suite: 'Lead Generation Tool',
    status: 'personal project',
    statusKind: 'role',
    tail: '2026',
    stack: 'Next.js · TypeScript · Supabase · Google Places API · OpenRouter',
    desc: (
      <>
        A tool that finds local businesses with no website. It pulls listings
        from the Google Places API, filters out businesses that already have a
        site, ranks the rest by reviews and rating, and uses an LLM to draft
        outreach.
      </>
    ),
    tags: ['full-stack', 'APIs', 'LLM'],
    note: 'private repo',
  },
];

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
    }, { threshold: 0.1 });
    items.forEach((n) => obs.observe(n));
    const t = setTimeout(() => items.forEach((n) => n.classList.add('in')), 1200);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

export default function Projects() {
  const ref = useReveal();
  return (
    <>
      <div className="section-head">
        <span className="ix">02</span>
        <h2>Selected work</h2>
      </div>
      <section ref={ref} className="projects" id="projects" data-testid="projects">
        {PROJECTS.map((p, i) => (
          <article
            key={p.num}
            className="project-card reveal"
            data-testid={`project-card-${i + 1}`}
          >
            <div className="project-head">
              <span className="project-num">{p.num} /</span>
              <span className="project-suite" data-testid={`project-${i + 1}-title`}>{p.suite}</span>
              <span
                className={`project-status ${p.statusKind}`}
                data-testid={`project-${i + 1}-status`}
              >
                {p.status}
              </span>
              <span className="project-tail">{p.tail}</span>
            </div>
            <div className="project-body">
              {p.stack && <div className="project-stack">{p.stack}</div>}
              <p className="project-desc">{p.desc}</p>
              <div className="project-foot">
                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="link-row">
                  {p.links ? (
                    p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-testid={l.testid}>
                        {l.label}
                      </a>
                    ))
                  ) : (
                    <span className="tag tag-pending">{p.note}</span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
