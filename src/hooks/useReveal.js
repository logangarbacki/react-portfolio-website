import { useEffect, useRef } from 'react';

// Progressive-enhancement reveal. Elements ship visible; this only animates them
// in when JS + IntersectionObserver exist, and a fallback timer reveals everything
// regardless so non-scrolling bots/screenshots never see empty content.
export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((n) => n.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold });
    items.forEach((n) => obs.observe(n));
    const t = setTimeout(() => items.forEach((n) => n.classList.add('in')), 1200);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, [threshold]);
  return ref;
}
