import { useEffect, useRef } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    num: '01',
    suite: 'PrintScan Regression Framework',
    status: 'QA Specialist · 2023',
    statusKind: 'role',
    tail: 'PrintScan Fingerprinting',
    stack: 'C# · NUnit · Selenium WebDriver · Page Object Model',
    desc: (
      <>
        An end-to-end Selenium regression suite for PrintScan's biometric
        fingerprint-enrollment platform — covering the real enrollment and search
        flows in C# with NUnit and a Page Object Model. My first automation
        framework against a real production platform.
      </>
    ),
    tags: ['regression', 'e2e', 'POM'],
    note: 'proprietary',
  },
  {
    num: '02',
    suite: 'PrintScan Location Search',
    status: 'in production',
    statusKind: 'pass',
    tail: 'PrintScan Fingerprinting',
    // C# confirmed by Logan; "multi-view" read as ASP.NET MVC (Razor views) — confirm exact framework
    stack: 'C# · ASP.NET MVC',
    desc: (
      <>
        A location-search system and programmatic location-page architecture I
        built for printscan.com to drive local SEO — surfacing nearby enrollment
        sites. Server-rendered in ASP.NET MVC, still live in production after First
        Advantage acquired the company. I later reused this architecture as the SEO
        backbone for Garbacki Digital's client sites.
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
    status: 'passing',
    statusKind: 'pass',
    tail: 'cross-repo CI',
    stack: 'C# · NUnit · Selenium WebDriver 4 · Allure · GitHub Actions',
    desc: (
      <>
        The suite testing <em>this very page</em>. A Page Object Model framework
        I wrote solo against a live React/Vite SPA — scroll-into-view waits for
        IntersectionObserver-deferred elements, and a JS innerText fallback for
        CSS-animated hero text that <code>.Text</code> returned empty for. Allure
        reports auto-deploy; cross-repo dispatch keeps it locked to production.
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
    status: 'live',
    statusKind: 'pass',
    tail: 'garbacki digital',
    stack: 'Next.js · TypeScript · Supabase · Google Places · OpenRouter',
    desc: (
      <>
        Finds local businesses with weak web presence, stores them in Supabase
        with row-level security, and uses LLMs (routed through OpenRouter) to
        draft the outreach. Live.
      </>
    ),
    tags: ['full-stack TS', 'RLS', 'LLM', 'serverless'],
    links: [
      { href: 'https://garbackidigital.com/platform', label: 'live →', testid: 'project-4-live' },
    ],
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
