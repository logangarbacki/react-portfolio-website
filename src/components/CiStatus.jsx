import './CiStatus.css';
import { relTime, fmtDuration } from '../utils/format';
import { ALLURE_URL } from '../hooks/useLiveStatus.js';

export default function CiStatus({ run, allure, ready }) {
  const passed = allure?.passed ?? 0;
  const failed = (allure?.failed ?? 0) + (allure?.broken ?? 0);
  const total = allure?.total ?? 0;

  // Badge must agree with the data: never show PASSING when tests failed.
  let badgeText = 'SYNCING';
  let tone = 'warn';
  if (ready) {
    if (!run) {
      badgeText = 'OFFLINE';
      tone = 'off';
    } else if (run.conclusion === 'success' && failed === 0) {
      badgeText = 'PASSING';
      tone = 'pass';
    } else if (failed > 0) {
      badgeText = `${failed} KNOWN-FAIL`;
      tone = 'warn';
    } else if (run.conclusion === 'failure') {
      badgeText = 'FAILING';
      tone = 'fail';
    } else {
      badgeText = (run.conclusion || run.status || 'pending').toUpperCase();
    }
  }

  const commit = run?.commit || '—';

  return (
    <p className={`ci-status ${tone}`} data-testid="status-card">
      <span className="ci-items">
        <span className="ci-item">
          <span className="ci-dot" aria-hidden="true" />
          <span className="ci-state" data-testid="status-card-badge">{badgeText}</span>
        </span>
        <span className="ci-item">
          <span data-testid="metric-tests">{allure ? `${passed}/${total}` : '—'}</span> tests
        </span>
        <span className="ci-item">
          last run <span data-testid="metric-last-run">{run ? relTime(run.startedAt) : '—'}</span>
        </span>
        <span className="ci-item">
          <span data-testid="metric-conclusion">{run?.conclusion || run?.status || '—'}</span>
          {' in '}
          <span data-testid="metric-duration">{run ? fmtDuration(run.durationSec) : '—'}</span>
        </span>
        <span className="ci-item">
          commit{' '}
          {run?.url ? (
            <a href={run.url} target="_blank" rel="noreferrer" title="Open this run on GitHub Actions">
              <span className="ci-hash" data-testid="metric-commit">{commit}</span>
            </a>
          ) : (
            <span className="ci-hash" data-testid="metric-commit">{commit}</span>
          )}
        </span>
        <span className="ci-item">
          <a href={ALLURE_URL} target="_blank" rel="noreferrer">Allure report</a>
        </span>
      </span>
    </p>
  );
}
