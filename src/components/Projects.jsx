import React, { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import './Projects.css'

const projects = [
  {
    num: '01',
    title: 'Selenium Regression Framework',
    type: 'Professional · QA Automation',
    year: '2023',
    description: 'Architected a Selenium-based regression framework in C# at PrintScan, cutting manual testing effort by 40%+ per sprint. Includes custom appointment-workflow automation tools.',
    tags: ['Selenium', 'C#', '.NET', 'QA Automation'],
    color: '#00e5ff',
    metric: '40% ↓ manual testing',
  },
  {
    num: '02',
    title: 'DB-Driven Location Search',
    type: 'Professional · Full-Stack',
    year: '2023',
    description: 'Built a database-driven location search system in C# for PrintScan, dynamically generating pages for every location. Improved SEO and site navigation at scale.',
    tags: ['C#', '.NET', 'SQL', 'SEO'],
    color: '#ff6b35',
    metric: 'SEO + nav improved',
  },
  {
    num: '03',
    title: 'logangarbacki.dev',
    type: 'Personal · Front-End',
    year: '2025',
    description: 'This portfolio — built with Vite + React, featuring an animated canvas dot grid, custom cursor, scroll-reveal animations, and a full resume section. Fully responsive.',
    tags: ['React', 'Vite', 'CSS', 'Canvas API'],
    color: '#00ff88',
    metric: 'Shipped & live',
  },
]

function ProjectItem({ p, i, hovered, setHovered }) {
  return (
    <div
      className={`project-item ${hovered === i ? 'hovered' : ''}`}
      style={{ '--project-color': p.color }}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="project-bar" style={{ background: p.color }}></div>
      <div className="project-num">{p.num}</div>
      <div className="project-body">
        <div className="project-header">
          <h3 className="project-title">{p.title}</h3>
          <span className="project-year">{p.year}</span>
        </div>
        <div className="project-type">{p.type}</div>
        <p className="project-desc">{p.description}</p>
        <div className="project-footer">
          <div className="project-tags">
            {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
          <div className="project-metric">{p.metric}</div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  useReveal()
  const [hovered, setHovered] = useState(null)

  return (
    <section className="projects" id="projects">
      <div className="projects-label reveal">
        <span className="section-num">02</span>
        <span className="section-slash">/</span>
        <span>projects</span>
      </div>
      <h2 className="projects-heading reveal">
        Selected <span className="heading-accent">work.</span>
      </h2>
      <div className="projects-list reveal">
        {projects.map((p, i) => (
          <ProjectItem
            key={p.num}
            p={p}
            i={i}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </section>
  )
}
