# React Portfolio — Logan Garbacki

I’m a QA Automation Engineer — this portfolio doubles as both a frontend project and the system under test for my automation framework.

👉 https://logangarbacki.dev  

---

## ⚙️ Real problems solved

### Scroll-based animations (IntersectionObserver)
Sections animate into view as the user scrolls. This improves UX, but introduces timing challenges and rendering edge cases.

**Solution:** Components are structured to ensure animations trigger reliably across screen sizes and do not block layout or interaction.

---

### Performance + Vite optimization
Fast load time is critical for first impressions.

**Solution:** Built with **Vite** for fast development and optimized production builds, reducing bundle size and improving load speed.

---

### Responsive layout across devices
Portfolio content needs to remain readable and visually consistent on all screen sizes.

**Solution:** Mobile-first layout with flexible CSS and breakpoints to ensure consistent spacing, alignment, and usability.

---

### UI consistency + maintainability
As the site grows, keeping styles and components consistent becomes harder.

**Solution:** Reusable React components with clear separation between layout, logic, and styling.

---

## 🧪 What this site demonstrates

This isn’t just a portfolio — it reflects how I build software:

- Clean, maintainable component structure  
- Strong attention to UX (animations, navigation flow)  
- Performance awareness  
- Real-world testability (paired with automation)

---

## 🧱 Stack

- **React + Vite** — component-based UI and fast tooling  
- **JavaScript (ES6+)** — application logic  
- **HTML5 + CSS3** — structure and styling  
- **Git + GitHub** — version control and deployment  

---

## 🚀 Deployment

Deployed as a static frontend application with continuous updates via GitHub.

Paired with an automated Selenium test suite to validate core functionality after changes.

---

## 📁 Project structure
portfolio/
├── .github/
│ └── workflows/ # GitHub Actions CI/CD
├── public/ # Static assets (images, favicon, icons)
├── src/ # React components and main code
├── .gitignore # Git ignore rules
├── README.md # Project documentation
├── index.html # Root HTML file
├── package-lock.json # Exact dependency versions
├── package.json # Dependencies and scripts
└── vite.config.js # Vite configuration
