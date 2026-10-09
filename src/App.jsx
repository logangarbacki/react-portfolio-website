import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

import { useLiveStatus } from './hooks/useLiveStatus.js';

export default function App() {
  // Live CI data loads in the background so it never blocks the first render.
  const { run, allure, ready } = useLiveStatus();

  return (
    <div className="page">
      <Navbar />
      <Hero run={run} allure={allure} ready={ready} />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
