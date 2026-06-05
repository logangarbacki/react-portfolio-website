import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="nav" data-testid="nav">
      <a className="nav-name" href="#" data-testid="nav-name">Logan Garbacki</a>
      <div className="nav-links" data-testid="nav-links">
        <a href="#about" data-testid="nav-link-about">about</a>
        <a href="#projects" data-testid="nav-link-projects">work</a>
        <a href="#contact" data-testid="nav-link-contact">contact</a>
      </div>
    </nav>
  );
}
