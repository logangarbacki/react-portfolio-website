import { useEffect, useState } from 'react';

const REPO = 'logangarbacki/react-portfolio-selenium-tests';
const ALLURE_BASE = 'https://logangarbacki.github.io/react-portfolio-selenium-tests';

export function useLiveStatus() {
  const [run, setRun] = useState(null);
  const [allure, setAllure] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchRun() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/actions/runs?per_page=1`,
          { cache: 'no-store' }
        );
        if (!res.ok) return null;
        const data = await res.json();
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
      } catch {
        return null;
      }
    }

    async function fetchAllure() {
      try {
        const res = await fetch(`${ALLURE_BASE}/widgets/summary.json`, { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        const stat = data?.statistic;
        if (!stat) return null;
        return {
          passed: stat.passed || 0,
          failed: stat.failed || 0,
          broken: stat.broken || 0,
          skipped: stat.skipped || 0,
          total: stat.total || 0,
        };
      } catch {
        return null;
      }
    }

    Promise.all([fetchRun(), fetchAllure()]).then(([r, a]) => {
      if (cancelled) return;
      setRun(r);
      setAllure(a);
      setReady(true);
    });

    return () => { cancelled = true; };
  }, []);

  return { run, allure, ready };
}

export const ALLURE_URL = ALLURE_BASE;
export const FRAMEWORK_REPO_URL = `https://github.com/${REPO}`;
