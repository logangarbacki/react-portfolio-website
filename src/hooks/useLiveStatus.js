import { useEffect, useState } from 'react';

const REPO = 'logangarbacki/react-portfolio-selenium-tests';
const WORKFLOW = 'ui-tests.yml';
const ALLURE_BASE = 'https://logangarbacki.github.io/react-portfolio-selenium-tests';

async function fetchJson(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function parseAllure(summary) {
  const stat = summary?.statistic;
  if (!stat) return null;
  return {
    passed: stat.passed || 0,
    failed: stat.failed || 0,
    broken: stat.broken || 0,
    skipped: stat.skipped || 0,
    unknown: stat.unknown || 0,
    total: stat.total || 0,
  };
}

// Run details that CI publishes next to the Allure report (ci-run.json). This comes
// from GitHub Pages, so unlike the GitHub API it has no per-IP rate limit. The
// suite loads the homepage once per test, which was enough to exhaust the API's
// 60 requests an hour from a shared runner IP and turn the card "Offline".
function parsePublishedRun(info, summary) {
  const time = summary?.time;
  if (!info?.commit || !time?.start) return null;
  const startedAt = new Date(time.start);
  const endedAt = new Date(time.stop ?? time.start);
  return {
    status: 'completed',
    conclusion: info.outcome || 'success',
    startedAt,
    durationSec: Math.max(1, Math.round((endedAt - startedAt) / 1000)),
    branch: info.branch || 'main',
    commit: String(info.commit).slice(0, 7),
    runNumber: info.runNumber,
    url: info.url || `https://github.com/${REPO}/actions`,
  };
}

// Fallback for reports published before ci-run.json existed.
async function fetchRunFromApi() {
  // Latest finished run of the test workflow only. Without these filters the
  // card could pick up the Pages deploy, or the run that is testing it right now.
  const data = await fetchJson(
    `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?status=completed&per_page=1`
  );
  const r = data?.workflow_runs?.[0];
  if (!r) return null;
  const started = new Date(r.run_started_at);
  const ended = new Date(r.updated_at);
  return {
    status: r.status,
    conclusion: r.conclusion,
    startedAt: started,
    durationSec: Math.max(1, Math.round((ended - started) / 1000)),
    branch: r.head_branch || 'main',
    commit: (r.head_sha || '').slice(0, 7),
    runNumber: r.run_number,
    url: r.html_url,
  };
}

export function useLiveStatus() {
  const [run, setRun] = useState(null);
  const [allure, setAllure] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [summary, info] = await Promise.all([
        fetchJson(`${ALLURE_BASE}/widgets/summary.json`),
        fetchJson(`${ALLURE_BASE}/ci-run.json`),
      ]);
      const r = parsePublishedRun(info, summary) ?? (await fetchRunFromApi());
      if (cancelled) return;
      setRun(r);
      setAllure(parseAllure(summary));
      setReady(true);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { run, allure, ready };
}

export const ALLURE_URL = ALLURE_BASE;
export const FRAMEWORK_REPO_URL = `https://github.com/${REPO}`;
