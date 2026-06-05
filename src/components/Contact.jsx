import { useState } from 'react';
import './Contact.css';

// Formspree endpoint. Override via VITE_CONTACT_ENDPOINT in env vars if needed.
const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  'https://formspree.io/f/xvzlkowp';

// Tests append ?test-form=1 so they exercise UI flow without hitting the real endpoint.
const TEST_MODE =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('test-form') === '1';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [error, setError] = useState(null);

  function typeSuccess(text) {
    let i = 0;
    const typer = setInterval(() => {
      i++;
      setSuccessText(text.slice(0, i));
      if (i >= text.length) clearInterval(typer);
    }, 30);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    if (TEST_MODE) {
      await sleep(700);
      setSubmitting(false);
      setSuccess(true);
      typeSuccess('POST /contact → 200 ok');
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error || data?.errors?.[0]?.message || `Server returned ${res.status}`
        );
      }

      setSuccess(true);
      typeSuccess(`POST /contact → ${res.status} ok`);
    } catch (err) {
      setError(err.message || 'Send failed. Email contact@logangarbacki.dev directly.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Escape') e.currentTarget.reset();
  }

  return (
    <>
      <div className="section-head">
        <span className="ix">03</span>
        <h2>Get in touch</h2>
      </div>
      <section className="contact" id="contact" data-testid="contact">
        <div className="contact-card">
          <div className="contact-card-head">
            <span>contact</span>
            <span className="badge">open to work</span>
          </div>
          <div className="contact-blurb">
            I'm looking for a full-time QA Automation, SDET, or software
            engineering role — around NYC / Long Island or remote. Send a note and
            I'll read it myself.
          </div>

          {!success && (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              onKeyDown={handleKey}
              noValidate
              data-testid="contact-form"
            >
              <div className="form-row">
                <label className="form-label" htmlFor="cf-name">Name</label>
                <input id="cf-name" type="text" name="name" placeholder="Your name" required data-testid="contact-name" />
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="cf-email">Email</label>
                <input id="cf-email" type="email" name="email" placeholder="Where to reply" required data-testid="contact-email" />
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="cf-message">Message</label>
                <textarea id="cf-message" name="message" rows="4" placeholder="What's on your mind?" required data-testid="contact-message" />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit" disabled={submitting} data-testid="contact-submit">
                  {submitting ? 'Sending…' : 'Send message'}
                </button>
                <span className="hint">enter to submit · esc to clear</span>
              </div>
              {error && (
                <div className="form-error" data-testid="contact-error">
                  <span className="prefix">[err]</span> {error}
                </div>
              )}
            </form>
          )}

          {success && (
            <div className="form-success" data-testid="contact-success">
              <div className="ok-line mono">
                <span className="prefix">[200]</span> {successText}
              </div>
              <div>Message received. Expect a reply within 24 hours.</div>
            </div>
          )}

          <div className="contact-meta">
            <a href="mailto:contact@logangarbacki.dev" data-testid="contact-email-link">
              contact@logangarbacki.dev
            </a>
            <a href="https://github.com/logangarbacki" target="_blank" rel="noreferrer" data-testid="contact-github">
              github.com/logangarbacki
            </a>
            <a href="https://linkedin.com/in/logangarbacki" target="_blank" rel="noreferrer" data-testid="contact-linkedin">
              linkedin.com/in/logangarbacki
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
