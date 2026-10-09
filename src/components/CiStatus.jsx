import './CiStatus.css';
import { relTime, fmtDuration } from '../utils/format';
import { ALLURE_URL } from '../hooks/useLiveStatus.js';

// One square per test in the latest report, colored by result.
function TestStrip({ allure }) {
  if (!allure || !allure.total) return null;
  const failed = (allure.failed || 0) + (allure.broken || 0);
  const skipped = allure.skipped || 0;
  const cells = [
    ...Array(allure.passed || 0).fill('pass'),
    ...Array(failed).fill('fail'),
    ...Array(skipped).fill('skip'),
  ];
  const label = `${allure.passed} passed, ${failed} failed, ${skipped} skipped`;
  return (
    <div className="ci-strip" role="img" aria-label={label} data-testid="status-strip">
      {cells.map((kind, i) => (
        <span key={i} className={`ci-cell ${kind}`} style={{ '--i': i }} />
      ))}
    </div>
  );
}

export default function CiStatus({ run, allure, ready }) {
  const passed = allure?.passed ?? 0;
  const failed = (allure?.failed ?? 0) + (allure?.broken ?? 0);
  const total = allure?.total ?? 0;

  // The status word must agree with the data: never "Passing" when tests failed.
  let state = 'Checking';
  let tone = 'warn';
  if (ready) {
    if (!run) {
      state = 'Offline';
      tone = 'off';
    } else if (run.conclusion === 'success' && failed === 0) {
      state = 'Passing';
      tone = 'pass';
    } else if (failed > 0) {
      state = `${failed} known-fail`;
      tone = 'warn';
    } else if (run.conclusion === 'failure') {
      state = 'Failing';
      tone = 'fail';
    } else {
      const raw = (run.conclusion || run.status || 'pending').replace(/_/g, ' ');
      state = raw.charAt(0).toUpperCase() + raw.slice(1);
    }
  }

  return (
    <div className={`ci-status ${tone}`} data-testid="status-card">
      <p className="ci-head">
        <span className="ci-dot" aria-hidden="true" />
        <span className="ci-state" data-testid="status-card-badge">{state}</span>
        <span className="ci-count">
          {allure ? (
            <>
              <span data-testid="metric-tests">{passed} of {total}</span> tests passed in the latest report
            </>
          ) : (
            'Test results unavailable'
          )}
        </span>
      </p>
      <TestStrip allure={allure} />
      {run ? (
        <p className="ci-meta">
          Last run <span data-testid="metric-last-run">{relTime(run.startedAt)}</span>
          {', took '}
          <span data-testid="metric-duration">{fmtDuration(run.durationSec)}</span>
          {', commit '}
          <a href={run.url} target="_blank" rel="noreferrer">
            <span className="ci-hash" data-testid="metric-commit">{run.commit}</span>
          </a>
          {'. '}
          <a href={ALLURE_URL} target="_blank" rel="noreferrer">Open the Allure report</a>
        </p>
      ) : (
        <p className="ci-meta">
          {ready ? "Couldn't load the latest run from GitHub. " : 'Loading the latest run. '}
          <a href={ALLURE_URL} target="_blank" rel="noreferrer">Open the Allure report</a>
        </p>
      )}
    </div>
  );
}
