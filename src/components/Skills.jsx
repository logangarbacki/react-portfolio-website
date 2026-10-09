import './Skills.css';

const GROUPS = [
  {
    name: 'Testing',
    items: 'Selenium WebDriver, NUnit, Page Object Model, Allure, regression and end-to-end testing, manual testing, bug reporting',
  },
  {
    name: 'Development',
    items: 'C#, .NET, JavaScript, TypeScript, React, Next.js, Python, Django REST Framework',
  },
  {
    name: 'Workflow',
    items: 'Git, GitHub Actions, Azure DevOps, Vercel, AI coding tools',
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills" data-testid="skills">
      <h2>Skills</h2>
      <dl className="skills">
        {GROUPS.map((g) => (
          <div className="skills-row" key={g.name} data-testid={`skills-${g.name.toLowerCase()}`}>
            <dt>{g.name}</dt>
            <dd>{g.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
