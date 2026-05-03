import { useEffect, useRef, useState } from 'react';
import './SectionLog.css';

export default function SectionLog({ ts, level = 'INFO', method = 'GET', path, status = '200 ok', children, id }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRun(true);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} id={id} className={`log ${run ? 'run' : ''}`} data-testid={`log-${path?.replace(/^\//, '') || 'section'}`}>
      <span className="ts">{ts}</span>
      <span className="level">{level}</span>
      <span>{method} {path}</span>
      <span className="leader" />
      <span className="ok">{status}{children ? ` · ${children}` : ''}</span>
    </div>
  );
}
