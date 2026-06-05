import './App.css';

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
  // Live CI data hydrates the status card asynchronously — it never blocks render.
  const { run, allure, ready } = useLiveStatus();

  return (
    <div className="app-root">
      <Constellation />
      <StatusBar run={run} ready={ready} />
      <Navbar />
      <Hero run={run} allure={allure} ready={ready} />
      <About />
      <Marquee />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
