# logangarbacki.dev

My portfolio site, built with React and Vite. It's also the system under test for my Selenium framework, [react-portfolio-selenium-tests](https://github.com/logangarbacki/react-portfolio-selenium-tests).

Live site: https://logangarbacki.dev

## How the two repos work together

- A push to `main` here triggers the Selenium suite in the test repo through a `repository_dispatch` event.
- The suite runs against the production site and publishes an Allure report to GitHub Pages.
- The test status panel at the top of the homepage draws one checkmark per test. It reads the test totals from the Allure summary and the run details (commit, link, outcome) from a `ci-run.json` file the workflow publishes alongside the report, so it shows the real result of the last run without depending on the rate-limited GitHub API.

## Built to be tested

- Every element the tests touch has a `data-testid`.
- Sections fade in on scroll using IntersectionObserver. Content is visible by default and only hidden when JavaScript is available to bring it back, so crawlers and screenshots never see empty sections.
- The contact form has a test mode (`?test-form=1`) so the suite can run the full submit flow without sending real messages.

## Run it locally

```
npm install
npm run dev
```

## Stack

React 18, Vite 5, plain CSS. The contact form posts to Formspree.
