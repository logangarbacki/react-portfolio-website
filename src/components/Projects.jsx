import { useEffect, useRef } from 'react';
import './Projects.css';
import SectionLog from './SectionLog';

const PROJECTS = [
  {
    num: '01',
    suite: 'Selenium UI Test Framework',
    status: 'passing',
    statusKind: 'pass',
    tail: 'cross-repo CI',
    stack: 'C# · NUnit · Selenium WebDriver 4 · Allure · GitHub Actions',
    desc: (
      <>
        A Page Object Model framework I wrote solo, targeting a live React/Vite SPA.
        Resolved real automation problems — scroll-into-view wait logic for
        IntersectionObserver-deferred elements, and a JS innerText fallback for
        CSS-animated transparent hero text that <code>.Text</code> returned empty for.
        Allure reports auto-deploy after every run; cross-repo dispatch keeps it
        locked to production.
      </>
    ),
    tags: ['smoke', 'regression', 'negative', 'e2e', 'parallel'],
    links: [
      { href: 'https://github.com/logangarbacki/react-portfolio-selenium-tests', label: 'github →', testid: 'project-1-github' },
      { href: 'https://logangarbacki.github.io/react-portfolio-selenium-tests/', label: 'allure →', testid: 'project-1-allure' },
    ],
  },
  {
    num: '02',
    suite: 'Lead Generation Tool',
    status: 'in development',
    statusKind: 'dev',
    tail: 'private build',
    stack: 'Next.js · TypeScript · Tailwind · Supabase · Google Places · OpenRouter LLMs',
    desc: (
      <>
        An in-progress tool for finding local businesses with weak or missing
        web presence — the kind that need development services but don't know
        to ask. Pulls business data from the Google Places API, stores it in
        Supabase with row-level security, and uses LLMs (routed through
        OpenRouter) to generate the assets that make outreach concrete.
        Active build, not yet live.
      </>
    ),
    tags: ['full-stack TS', 'RLS', 'LLM', 'serverless'],
    pendingLinks: true,
  },
  {
    num: '03',
    suite: 'Little Lemon',
    status: 'live',
    statusKind: 'pass',
    tail: 'capstone',
    stack: 'React · Django · Django REST Framework · SQL · Vercel · Railway',
    desc: (
      <>
        A React SPA with menu browsing, cart, reservations, and token-based
        auth, served by a Django REST API on Railway. Cart and reservation
        data persists to SQL; admins manage menu items and daily specials in
        real time via the Django admin panel. Built originally as a Meta
        capstone, extended past assignment scope.
      </>
    ),
    tags: ['react SPA', 'DRF', 'token auth', 'admin panel'],
    links: [
      { href: 'https://meta-front-end-developer-capstone-three.vercel.app', label: 'live →', testid: 'project-3-live' },
    ],
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll('.project-card');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function Projects() {
  const ref = useReveal();
  return (
    <>
      <SectionLog id="projects" ts="[01:01]" path="/projects">{`${PROJECTS.length} records`}</SectionLog>
      <section ref={ref} className="projects" data-testid="projects">
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
                className={`project-status ${p.statusKind === 'dev' ? 'dev' : ''}`}
                data-testid={`project-${i + 1}-status`}
              >
                {p.status}
              </span>
              <span className="project-tail">{p.tail}</span>
            </div>
            <div className="project-body">
              <div className="project-stack">{p.stack}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-foot">
                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="link-row">
                  {p.pendingLinks ? (
                    <span className="tag tag-pending">links pending</span>
                  ) : (
                    p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-testid={l.testid}>
                        {l.label}
                      </a>
                    ))
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
