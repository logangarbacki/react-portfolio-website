import './Marquee.css';

const TAGS = [
  'C#', 'TypeScript', 'React', 'Next.js', 'Django',
  'Selenium WebDriver', 'NUnit', 'Allure', 'GitHub Actions',
  'Vite', 'Supabase', 'Postman', 'Page Object Model', 'Parallel Execution',
];

export default function Marquee() {
  const seq = [...TAGS, ...TAGS]; // duplicate for seamless loop
  return (
    <div className="marquee" aria-hidden="true" data-testid="marquee">
      <div className="marquee-track">
        {seq.map((t, i) => (
          <span key={i}>
            {t}
            <span className="dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
