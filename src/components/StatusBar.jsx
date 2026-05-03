import './StatusBar.css';
import { relTime, fmtDuration } from '../utils/format';

export default function StatusBar({ run, ready }) {
  const branch = run?.branch ?? 'main';
  const buildLabel = run ? `#${run.runNumber}` : '#—';
  const ageLabel = run
    ? `${relTime(run.startedAt)} · ${fmtDuration(run.durationSec)}`
    : ready ? 'live data offline' : 'syncing…';
  const liveClass = !ready ? '' : run ? 'live' : 'fallback';
  const liveText = !ready ? 'syncing' : run ? '● live' : '● cached';

  return (
    <div className="status-bar" data-testid="status-bar">
      <span className="status-dot" aria-hidden="true" />
      <span><span className="v" data-testid="status-host">logangarbacki.dev</span></span>
      <span className="sep">/</span>
      <span className="v" data-testid="status-branch">{branch}</span>
      <span className="sep">·</span>
      <span>build <span className="v" data-testid="status-build">{buildLabel}</span></span>
      <span className="sep">·</span>
      <span data-testid="status-age">{ageLabel}</span>
      <span className="right">
        <span className={`live-tag ${liveClass}`} data-testid="status-live-tag">{liveText}</span>
      </span>
    </div>
  );
}
