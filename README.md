# Junhyung Park — Portfolio

Personal portfolio site built with **Next.js 15**, deployed on **Vercel**.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript
- **Styling:** Plain CSS (CSS variables, no Tailwind)
- **Deploy:** Vercel + GitHub

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── globals.css       # All styles + CSS variables
│   ├── layout.js         # Root layout + metadata
│   └── page.js           # Main page (assembles all sections)
└── components/
    ├── Navbar.js          # Sticky nav with scroll-based active tab
    └── sections/
        ├── HomeSection.js
        ├── AboutSection.js
        ├── ProjectsSection.js
        ├── SkillsSection.js
        └── ContactSection.js
```

---

## How to Deploy (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the GitHub repo
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **Deploy**

Every `git push` to `main` will auto-deploy.

---

## Customizing Content

All content is in the section files under `src/components/sections/`.

| File | What to edit |
|------|-------------|
| `HomeSection.js` | Name, tagline, featured project |
| `AboutSection.js` | Bio, stats, interests |
| `ProjectsSection.js` | Project list (title, type, engine, desc) |
| `SkillsSection.js` | Skill percentages, tools, game design tags |
| `ContactSection.js` | Email, GitHub, LinkedIn, availability |

To add a real photo, replace the `<div className="about-photo">` with an `<Image>` tag.  
To add project screenshots, replace the `<div className="project-card-img">` with `<Image>`.

---

## Adding a Resume

Place your resume PDF at `public/resume.pdf` — the download button in Contact is already wired up.
