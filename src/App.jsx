import { useEffect, useState } from 'react';
import './App.css';

import BootOverlay from './components/BootOverlay.jsx';
import Constellation from './components/Constellation.jsx';
import StatusBar from './components/StatusBar.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Marquee from './components/Marquee.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

import { useLiveStatus } from './hooks/useLiveStatus.js';

export default function App() {
  const { run, allure, ready } = useLiveStatus();
  const [booting, setBooting] = useState(true);
  const [scanRun, setScanRun] = useState(false);

  useEffect(() => {
    if (booting) document.body.classList.add('booting');
    else document.body.classList.remove('booting');
  }, [booting]);

  function handleBootDone() {
    setBooting(false);
    setTimeout(() => setScanRun(true), 200);
  }

  return (
    <>
      {booting && (
        <BootOverlay run={run} allure={allure} ready={ready} onDone={handleBootDone} />
      )}
      <div className={`scanline ${scanRun ? 'run' : ''}`} aria-hidden="true" />
      <div className="app-root">
        <Constellation />
        <StatusBar run={run} ready={ready} />
        <Navbar />
        <Hero start={!booting} run={run} allure={allure} ready={ready} />
        <About />
        <Marquee />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
