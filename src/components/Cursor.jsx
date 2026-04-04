import React, { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      ring.current?.classList.add('expand');
      dot.current?.classList.add('hide');
    };
    const onLeaveLink = () => {
      ring.current?.classList.remove('expand');
      dot.current?.classList.remove('hide');
    };

    window.addEventListener('mousemove', onMove);
    animate();

    const links = document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .btn-download');
    links.forEach(l => {
      l.addEventListener('mouseenter', onEnterLink);
      l.addEventListener('mouseleave', onLeaveLink);
    });

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot}></div>
      <div className="cursor-ring" ref={ring}></div>
    </>
  );
}
