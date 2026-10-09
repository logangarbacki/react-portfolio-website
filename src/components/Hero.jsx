import './Hero.css';
import CiStatus from './CiStatus.jsx';
import Note from './Note.jsx';
import { FRAMEWORK_REPO_URL } from '../hooks/useLiveStatus.js';

export default function Hero({ run, allure, ready }) {
  return (
    <header className="hero" data-testid="hero">
      <div className="masthead" data-testid="nav">
        <nav className="nav-links" data-testid="nav-links" aria-label="Sections">
          <a href="#about" data-testid="nav-link-about">about</a>
          <a href="#projects" data-testid="nav-link-projects">work</a>
          <a href="#contact" data-testid="nav-link-contact">contact</a>
        </nav>
        <div className="id">
          <figure className="polaroid">
            <img src="/logan.jpg" alt="Logan Garbacki" width="134" height="134" />
          </figure>
          <div>
            {/* The suite checks the name as both the nav name and the hero name. */}
            <h1 className="name" data-testid="hero-name">
              <span data-testid="nav-name">Logan Garbacki</span>
            </h1>
            <p className="role" data-testid="hero-label">
              Junior QA engineer &amp; developer, <span className="nowrap">Long Island, NY</span>
            </p>
          </div>
        </div>
        <Note side="left" top={118} tilt={-6} desktopOnly>that's me →</Note>
      </div>

      <p className="intro" data-testid="hero-summary">
        I write test automation in C# and build web apps with React and .NET. I
        started in QA at PrintScan at 18, and I've kept building since. Every
        deploy of this site runs my{' '}
        <a href={FRAMEWORK_REPO_URL} target="_blank" rel="noreferrer">Selenium suite</a>{' '}
        against it.
      </p>

      <p className="intro-links">
        <a href="#projects" data-testid="hero-cta-projects">See my work</a>
        <a href="#contact" data-testid="hero-cta-contact">Get in touch</a>
      </p>

      <div className="ci-wrap">
        <CiStatus run={run} allure={allure} ready={ready} />
        <Note side="right" top={18} tilt={4} desktopOnly>← live from<br />GitHub Actions</Note>
      </div>
    </header>
  );
}
