import './Hero.css';
import CiStatus from './CiStatus.jsx';
import { FRAMEWORK_REPO_URL } from '../hooks/useLiveStatus.js';

export default function Hero({ run, allure, ready }) {
  return (
    <header className="hero" data-testid="hero">
      <div className="masthead" data-testid="nav">
        <div>
          {/* The suite checks the name as both the nav name and the hero name. */}
          <h1 className="name" data-testid="hero-name">
            <span data-testid="nav-name">Logan Garbacki</span>
          </h1>
          <p className="role" data-testid="hero-label">
            Junior QA engineer and developer&nbsp;· <span className="nowrap">Long Island, NY</span>
          </p>
        </div>
        <nav className="nav-links" data-testid="nav-links" aria-label="Sections">
          <a href="#about" data-testid="nav-link-about">about</a>
          <a href="#projects" data-testid="nav-link-projects">work</a>
          <a href="#contact" data-testid="nav-link-contact">contact</a>
        </nav>
      </div>

      <p className="intro" data-testid="hero-summary">
        I write test automation in C# and build web apps with React and .NET.
        Every deploy of this site runs my{' '}
        <a href={FRAMEWORK_REPO_URL} target="_blank" rel="noreferrer">Selenium suite</a>{' '}
        against it, and the latest result is below.
      </p>

      <p className="intro-links">
        <a href="#projects" data-testid="hero-cta-projects">View work</a>
        <a href="#contact" data-testid="hero-cta-contact">Get in touch</a>
      </p>

      <CiStatus run={run} allure={allure} ready={ready} />
    </header>
  );
}
