import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  const observe = () => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el))
  }

  const mutObs = new MutationObserver(observe)
  mutObs.observe(document.body, { childList: true, subtree: true })

  observe()
}

requestAnimationFrame(() => requestAnimationFrame(initReveal))
