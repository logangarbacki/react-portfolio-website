import { useEffect, useState } from 'react';
import './Hero.css';
import { relTime, fmtDuration } from '../utils/format';

const HERO_LABEL = 'sdet · full-stack · long island, ny';

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

export default function Hero({ run, allure, ready }) {
  const passed = allure?.passed ?? 0;
  const failed = (allure?.failed ?? 0) + (allure?.broken ?? 0);
  const total = allure?.total ?? 0;
  const testsCount = useCountUp(passed, !!allure);

  // Badge must agree with the data: never show green PASSING when tests failed.
  let badgeText = 'SYNCING';
  let badgeClass = 'pending';
  if (ready) {
    if (!run) {
      badgeText = 'OFFLINE';
    } else if (run.conclusion === 'success' && failed === 0) {
      badgeText = 'PASSING';
      badgeClass = '';
    } else if (failed > 0) {
      badgeText = `${failed} KNOWN-FAIL`;
      badgeClass = 'pending';
    } else if (run.conclusion === 'failure') {
      badgeText = 'FAILING';
      badgeClass = 'fail';
    } else {
      badgeText = (run.conclusion || run.status || 'pending').toUpperCase();
    }
  }

  return (
    <section className="hero" data-testid="hero">
      <div className="hero-left">
        <div className="hero-label" data-testid="hero-label">{HERO_LABEL}</div>
        <h1 className="hero-name" data-testid="hero-name">Logan Garbacki.</h1>
        <p className="hero-summary" data-testid="hero-summary">
          QA Automation Engineer and developer on Long Island. I build the test
          frameworks that catch what humans miss — and the apps they run against.
          This page ships with its own <span className="accent">Selenium suite</span>{' '}
          that runs on every deploy; the card to the right is its live result.
        </p>
        <div className="hero-actions">
          <a className="cmd" href="#projects" data-testid="hero-cta-projects">
            View work
          </a>
          <a className="cmd ghost" href="#contact" data-testid="hero-cta-contact">
            Get in touch
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
            <span className="v mono">react-portfolio-selenium-tests</span>
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
              className={`v ${run?.conclusion === 'success' && failed === 0 ? 'pass' : run?.conclusion === 'failure' ? 'fail' : ''}`}
              data-testid="metric-conclusion"
            >
              {run?.conclusion || run?.status || '—'}
            </span>
          </div>
          <div className="metric-row">
            <span className="k">tests</span>
            <span className="v mono" data-testid="metric-tests">
              {allure ? (
                <>
                  <span className="num">{testsCount}</span>
                  <span className="tests-meta">
                    {' '}/ {total} {failed ? `· ${failed} known-fail` : '· 0 fail'}
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
            <span className="v mono accent" data-testid="metric-commit">{run?.commit || '—'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
