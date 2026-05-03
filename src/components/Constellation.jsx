import { useEffect, useRef } from 'react';

export default function Constellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles = [];
    const mouse = {
      clientX: -9999, clientY: -9999,
      x: -9999, y: -9999,
      active: false, glow: 0,
    };
    let running = true;
    let w = 0, h = 0;
    let raf = 0;

    function resize() {
      w = window.innerWidth;
      h = Math.max(window.innerHeight, document.documentElement.scrollHeight);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      const count = Math.max(20, Math.min(48, Math.floor((w * h) / 95000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 0.7 + Math.random() * 1.3,
        baseAlpha: 0.28 + Math.random() * 0.22,
      }));
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      const targetGlow = mouse.active ? 1 : 0;
      mouse.glow += (targetGlow - mouse.glow) * 0.08;

      const maxDist = 130;
      const mouseRadius = 200;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const d = Math.sqrt(d2);
            const op = (1 - d / maxDist) * 0.14;
            ctx.strokeStyle = `rgba(232, 227, 212, ${op})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        let r = p.r;
        let alpha = p.baseAlpha;
        if (mouse.glow > 0.02) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < mouseRadius) {
            const factor = (1 - d / mouseRadius) * mouse.glow;
            r = p.r + factor * 1.4;
            alpha = p.baseAlpha + factor * 0.55;
            ctx.strokeStyle = `rgba(232, 227, 212, ${factor * 0.34})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(232, 227, 212, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.glow > 0.02) {
        const g = mouse.glow;
        ctx.fillStyle = `rgba(232, 227, 212, ${0.75 * g})`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    function onMouseMove(e) {
      mouse.clientX = e.clientX;
      mouse.clientY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
      mouse.active = true;
    }
    function onScroll() {
      if (mouse.active) mouse.y = mouse.clientY + window.scrollY;
    }
    function onMouseLeave() { mouse.active = false; }
    function onResize() { resize(); init(); }
    function onVisibility() {
      running = document.visibilityState !== 'hidden';
      if (running) tick();
    }

    resize();
    init();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibility);
    const ro = new ResizeObserver(() => resize());
    ro.observe(document.documentElement);
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />;
}
