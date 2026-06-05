import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <span>© 2026 Logan Garbacki — Long Island, NY</span>
      <span className="right">
        Built &amp; tested in public ·{' '}
        <a
          href="https://github.com/logangarbacki/react-portfolio-selenium-tests"
          target="_blank"
          rel="noreferrer"
        >
          view the suite ↗
        </a>
      </span>
    </footer>
  );
}
