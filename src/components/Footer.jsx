import './Footer.css';
import { FRAMEWORK_REPO_URL } from '../hooks/useLiveStatus.js';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      © 2026 Logan Garbacki. Built and tested in public, so you can{' '}
      <a href={FRAMEWORK_REPO_URL} target="_blank" rel="noreferrer">read the test suite</a>.
    </footer>
  );
}
