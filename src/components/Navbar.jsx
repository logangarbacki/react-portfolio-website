import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-logo">
        <span className="logo-bracket">[</span>
        LG
        <span className="logo-bracket">]</span>
      </a>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {['about','projects','skills','resume','contact'].map(s => (
          <li key={s}>
            <a href={`#${s}`} onClick={() => setMenuOpen(false)}>
              <span className="nav-num">//</span> {s}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav-status" aria-label="Status">
        <span className="status-dot"></span>
        available
      </button>
    </nav>
  );
}
