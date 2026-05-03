import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="nav" data-testid="nav">
      <div className="nav-name" data-testid="nav-name">
        logan<span className="nav-cursor" />
      </div>
      <div className="nav-links" data-testid="nav-links">
        <a href="#about" data-testid="nav-link-about">about</a>
        <a href="#projects" data-testid="nav-link-projects">projects</a>
        <a href="#contact" data-testid="nav-link-contact">contact</a>
        <a href="/Logan_Garbacki_Resume.pdf" data-testid="nav-link-resume">resume.pdf ↓</a>
      </div>
    </nav>
  );
}
