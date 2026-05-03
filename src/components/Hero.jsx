import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { relTime, fmtDuration } from '../utils/format';

const HERO_LABEL = 'qa engineer + developer · long island, ny';

function splitChars(text) {
  return [...text].map((char, i) => (
    <span
      key={i}
      className="char"
      style={{ animationDelay: `${250 + i * 22}ms` }}
    >
      {char === ' ' ? ' ' : char}
    </span>
  ));
}

function useCountUp(target, run, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) { setVal(0); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function UptimeRow({ failed }) {
  const totalBars = 30;
  const failedSet = new Set();
  if (failed > 0) {
    for (let i = 0; i < Math.min(3, failed); i++) {
      failedSet.add(Math.floor(Math.random() * (totalBars - 5)));
    }
  }
  return (
    <div className="uptime-row" aria-hidden="true">
      {Array.from({ length: totalBars }).map((_, i) => (
        <div
          key={i}
          className={`bar ${failedSet.has(i) ? 'warn' : ''}`}
          style={{ animationDelay: `${i * 0.025}s` }}
        />
      ))}
    </div>
  );
}

export default function Hero({ start, run, allure, ready }) {
  const [labelText, setLabelText] = useState('');
  const [labelDone, setLabelDone] = useState(false);
  const [drawUnderline, setDrawUnderline] = useState(false);
  const heroNameRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    let cancelled = false;
    let i = 0;
    const speed = 28;

    function tick() {
      if (cancelled) return;
      i++;
      setLabelText(HERO_LABEL.slice(0, i));
      if (i >= HERO_LABEL.length) {
        setTimeout(() => !cancelled && setLabelDone(true), 400);
      } else {
        setTimeout(tick, speed);
      }
    }
    setTimeout(tick, 80);

    const drawT = setTimeout(() => !cancelled && setDrawUnderline(true), 800);

    return () => {
      cancelled = true;
      clearTimeout(drawT);
    };
  }, [start]);

  const passed = allure?.passed ?? 0;
  const failed = (allure?.failed ?? 0) + (allure?.broken ?? 0);
  const total = allure?.total ?? 0;
  const testsCount = useCountUp(passed, !!allure);

  let badgeText = 'SYNCING';
  let badgeClass = 'pending';
  if (ready) {
    if (run?.conclusion === 'success') {
      badgeText = 'PASSING';
      badgeClass = '';
    } else if (run?.conclusion === 'failure') {
      badgeText = 'FAILURE';
      badgeClass = 'fail';
    } else if (run) {
      badgeText = (run.conclusion || run.status || 'pending').toUpperCase();
      badgeClass = 'pending';
    } else {
      badgeText = 'OFFLINE';
      badgeClass = 'pending';
    }
  }

  return (
    <section className="hero" data-testid="hero">
      <div className="hero-left">
        <div className="hero-label" data-testid="hero-label">
          {labelText}
          {!labelDone && <span className="type-cursor" />}
        </div>
        <h1
          ref={heroNameRef}
          className={`hero-name ${start ? 'cascade' : ''}`}
          data-testid="hero-name"
        >
          {splitChars('Logan Garbacki.')}
        </h1>
        <p className="hero-summary" data-testid="hero-summary">
          I write Selenium frameworks in C# — and the React applications they're aimed at.
          Two halves of the same job:{' '}
          <em className={drawUnderline ? 'draw' : ''}>quality and code,</em> end to end.
          Hands-on across <span className="accent">test automation</span>,{' '}
          <span className="accent">CI/CD</span>, and the apps under test.
        </p>
        <div className="hero-actions">
          <a className="cmd" href="#projects" data-testid="hero-cta-projects">
            <span className="caret">$</span> view projects
          </a>
          <a className="cmd ghost" href="/Logan_Garbacki_Resume.pdf" data-testid="hero-cta-resume">
            <span className="caret">↓</span> resume.pdf
          </a>
        </div>
      </div>

      <div className="status-card" data-testid="status-card">
        <span className="status-card-hint">live ci/cd · this site</span>
        <div className="status-card-head">
          <span><span className="caret">$</span> ./status --verbose</span>
          <span className={`badge ${badgeClass}`} data-testid="status-card-badge">{badgeText}</span>
        </div>
        <div className="status-card-body">
          <div className="metric-row">
            <span className="k">framework</span>
            <span className="v">react-portfolio-selenium-tests</span>
          </div>
          <div className="metric-row">
            <span className="k">last run</span>
            <span className="v" data-testid="metric-last-run">
              {run ? relTime(run.startedAt) : '—'}
            </span>
          </div>
          <div className="metric-row">
            <span className="k">conclusion</span>
            <span
              className={`v ${run?.conclusion === 'success' ? 'pass' : run?.conclusion === 'failure' ? 'fail' : ''}`}
              data-testid="metric-conclusion"
            >
              {run?.conclusion || run?.status || '—'}
            </span>
          </div>
          <div className="metric-row">
            <span className="k">tests</span>
            <span className="v" data-testid="metric-tests">
              {allure ? (
                <>
                  <span className="num" style={{ color: failed ? 'var(--ink)' : 'var(--pass)' }}>
                    {testsCount}
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: 11 }}>
                    {' '}/ {total} {failed ? `· ${failed} fail` : '· 0 fail'}
                  </span>
                </>
              ) : '—'}
            </span>
          </div>
          <div className="metric-row">
            <span className="k">duration</span>
            <span className="v" data-testid="metric-duration">
              {run ? fmtDuration(run.durationSec) : '—'}
            </span>
          </div>
          <div className="metric-row">
            <span className="k">commit</span>
            <span className="v accent" data-testid="metric-commit">{run?.commit || '—'}</span>
          </div>
          <UptimeRow failed={failed} />
          <div className="uptime-legend">
            <span>30 days</span>
            <span>today</span>
          </div>
        </div>
      </div>
    </section>
  );
}
