import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;

    const COLS = 28;
    const ROWS = 18;
    const particles = [];

    const resizeCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseAlpha = Math.random() * 0.25 + 0.05;
        this.alpha = this.baseAlpha;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.008 + 0.003;
      }

      update(time, cursorX, cursorY) {

        this.alpha = this.baseAlpha + Math.sin(time * this.speed * 60 + this.phase) * 0.1;

        const dx = cursorX - this.baseX;
        const dy = cursorY - this.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 140;

        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * 22;
          this.x = this.baseX - (dx / dist) * force;
          this.y = this.baseY - (dy / dist) * force;
          this.alpha = Math.min(0.9, this.alpha + (1 - dist / influenceRadius) * 0.6);
        } else {

          this.x += (this.baseX - this.x) * 0.08;
          this.y += (this.baseY - this.y) * 0.08;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(0, 200, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles.length = 0;
      const gapX = width / COLS;
      const gapY = height / ROWS;

      for (let row = 0; row <= ROWS; row++) {
        for (let col = 0; col <= COLS; col++) {
          particles.push(new Particle(col * gapX, row * gapY));
        }
      }
    };

    let cursorX = -999;
    let cursorY = -999;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
    };

    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    initParticles();

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time++;
      particles.forEach(p => {
        p.update(time, cursorX, cursorY);
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="eyebrow-line"></span>
          <span>QA Engineer & Web Developer</span>
          <span className="eyebrow-line"></span>
        </div>
        <h1 className="hero-title">
          <span className="hero-name">Logan</span>
          <span className="hero-name accent">Garbacki</span>
        </h1>
        <p className="hero-tagline">
          <span className="tag-bracket">{'>'}</span>
          {' '}I break software on purpose —{' '}
          <em>then build it smarter, faster, and better.</em>
        </p>
        <p className="hero-sub">
          Selenium · C# · React · .NET  · QA Automation · Front-End Development
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            <span>View Work</span>
            <span className="btn-arrow">→</span>
          </a>
          <a href="#resume" className="btn-ghost">Download Resume</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-track"><div className="scroll-thumb"></div></div>
        <span>scroll</span>
      </div>
    </section>
  );
}