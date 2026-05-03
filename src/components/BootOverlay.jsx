import { useEffect, useRef, useState } from 'react';
import './BootOverlay.css';

const SKIP_KEY = 'lg_booted';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Boot sequence overlay. ~3.5s total runtime, paced lines:
 *   1. init shell           - 600ms
 *   2. sync github actions  - 1000ms
 *   3. sync allure summary  - 1000ms
 *   4. mount view           - 560ms
 *   ready + fade            - ~340ms
 *
 * Auto-runs to completion. Skip button is opt-in.
 */
export default function BootOverlay({ run, allure, onDone }) {
  const [done, setDone] = useState(false);
  const [lines, setLines] = useState([
    { text: 'init shell', state: 'idle' },
    { text: 'sync github actions', state: 'idle' },
    { text: 'sync allure summary', state: 'idle' },
    { text: 'mount view', state: 'idle' },
  ]);
  const [showReady, setShowReady] = useState(false);
  const skipRequestedRef = useRef(false);
  const stateRef = useRef({ run, allure });
  stateRef.current = { run, allure };

  useEffect(() => {
    // Closure-scoped flags so React 18 StrictMode's double-invocation
    // in dev doesn't poison the second run with the first run's cancel.
    let cancelled = false;
    let finished = false;

    function setLineSafe(i, patch) {
      if (cancelled) return;
      setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
    }

    function finish(instant = false) {
      if (cancelled || finished) return;
      finished = true;
      sessionStorage.setItem(SKIP_KEY, '1');
      setDone(true);
      setTimeout(() => onDone && onDone(instant), instant ? 0 : 450);
    }

    function checkAbort() {
      if (cancelled) return true;
      if (skipRequestedRef.current) {
        finish();
        return true;
      }
      return false;
    }

    async function runSequence() {
      await sleep(160);
      if (checkAbort()) return;
      setLineSafe(0, { state: 'pending' });
      await sleep(440);
      if (checkAbort()) return;
      setLineSafe(0, { state: 'ok' });

      await sleep(120);
      if (checkAbort()) return;
      setLineSafe(1, { state: 'pending' });
      await sleep(880);
      if (checkAbort()) return;
      setLineSafe(1, { state: stateRef.current.run ? 'ok' : 'fail' });

      await sleep(120);
      if (checkAbort()) return;
      setLineSafe(2, { state: 'pending' });
      await sleep(880);
      if (checkAbort()) return;
      setLineSafe(2, { state: stateRef.current.allure ? 'ok' : 'fail' });

      await sleep(120);
      if (checkAbort()) return;
      setLineSafe(3, { state: 'pending' });
      await sleep(440);
      if (checkAbort()) return;
      setLineSafe(3, { state: 'ok' });

      await sleep(120);
      if (checkAbort()) return;
      setShowReady(true);
      await sleep(220);
      if (cancelled) return;
      finish();
    }

    const shouldSkip =
      sessionStorage.getItem(SKIP_KEY) === '1' ||
      new URLSearchParams(window.location.search).get('skip-boot') === '1';

    if (shouldSkip) {
      finish(true);
    } else {
      runSequence();
    }

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`boot ${done ? 'done' : ''}`} data-testid="boot-overlay">
      <div className="boot-inner">
        <div className="boot-prompt">$ logangarbacki --boot</div>
        {lines.map((line, i) => (
          <div key={i} className="boot-line show">
            <span className={`tag ${line.state === 'ok' ? 'ok' : line.state === 'fail' ? 'fail' : ''}`}>
              {'['}
              <span className="state">
                {line.state === 'ok' ? ' ok ' : line.state === 'fail' ? 'fail' : '....'}
                {line.state === 'pending' && <span className="pending" />}
              </span>
              {']'}
            </span>
            <span className="text">{line.text}</span>
          </div>
        ))}
        {showReady && <div className="boot-ready show">&gt; ready.</div>}
      </div>
      <button
        type="button"
        className="boot-skip"
        onClick={() => { skipRequestedRef.current = true; }}
        data-testid="boot-skip"
      >
        skip ›
      </button>
    </div>
  );
}
