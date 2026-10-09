import './Projects.css';
import { useReveal } from '../hooks/useReveal.js';

const PROJECTS = [
  {
    title: 'PrintScan Regression Framework',
    status: 'QA Specialist, 2023',
    tone: 'muted',
    stack: 'C#, Selenium WebDriver',
    desc: (
      <>
        A Selenium regression suite in C# that I helped build with a senior
        developer for PrintScan's web platform. It cut the manual testing
        needed each sprint by over 40%.
      </>
    ),
    note: 'Proprietary',
  },
  {
    title: 'PrintScan Location Search',
    status: 'In production',
    tone: 'pass',
    stack: 'C#, .NET, Razor Pages',
    desc: (
      <>
        The location search on printscan.com: a database-driven directory that
        generates a page for every PrintScan location, built to improve site
        navigation and local SEO. It's still live after First Advantage
        acquired the company.
      </>
    ),
    links: [
      { href: 'https://printscan.com/Locations/Search', label: 'See it live', testid: 'project-2-live' },
    ],
  },
  {
    title: 'Selenium UI Test Framework',
    status: 'Live CI',
    tone: 'accent',
    stack: 'C#, NUnit, Selenium WebDriver 4, Allure, GitHub Actions',
    desc: (
      <>
        The test suite for this site: over 40 Selenium tests in C# and NUnit
        using the Page Object Model, run against production by GitHub Actions
        on every deploy and nightly, with a public Allure report. Two problems
        I had to solve: elements that only render once they're scrolled into
        view, and animated hero text that Selenium read as empty.
      </>
    ),
    links: [
      { href: 'https://github.com/logangarbacki/react-portfolio-selenium-tests', label: 'GitHub', testid: 'project-3-github' },
      { href: 'https://logangarbacki.github.io/react-portfolio-selenium-tests/', label: 'Allure report', testid: 'project-3-allure' },
    ],
  },
  {
    title: 'Lead Generation Tool',
    status: 'Personal project',
    tone: 'muted',
    stack: 'Next.js, TypeScript, Supabase, Google Places API, OpenRouter',
    desc: (
      <>
        A tool that finds local businesses with no website. It pulls listings
        from the Google Places API, filters out businesses that already have a
        site, ranks the rest by reviews and rating, and uses an LLM to draft
        outreach.
      </>
    ),
    note: 'Private repo',
  },
];

export default function Projects() {
  const ref = useReveal(0.1);
  return (
    <section ref={ref} className="section" id="projects" data-testid="projects">
      <h2>Work</h2>
      {PROJECTS.map((p, i) => (
        <article
          key={p.title}
          className="project reveal"
          data-testid={`project-card-${i + 1}`}
        >
          <h3 className="project-title" data-testid={`project-${i + 1}-title`}>{p.title}</h3>
          {/* The test suite finds the stack and description by class name. */}
          <p className="project-meta">
            <span className={`project-status ${p.tone}`} data-testid={`project-${i + 1}-status`}>{p.status}</span>
            <span className="project-stack">{p.stack}</span>
          </p>
          <p className="project-desc">{p.desc}</p>
          {p.links ? (
            <p className="link-row">
              {p.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-testid={l.testid}>
                  {l.label}
                </a>
              ))}
            </p>
          ) : (
            <p className="project-note">{p.note}</p>
          )}
        </article>
      ))}
    </section>
  );
}
