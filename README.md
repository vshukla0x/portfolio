# vivekk.me

Source code and assets for [vivekk.me](https://vivekk.me/)[cite: 2], the personal engineering portfolio and showcase for Vivek Shukla[cite: 2, 3].

The application is deployed on GitHub Pages with a custom domain, showcasing work across defensive security, application hardening, and full-stack systems[cite: 1, 2].

---

## Live Deployment

- **Production URL:** [https://vivekk.me/](https://vivekk.me/)
- **Hosting:** GitHub Pages
- **DNS / Custom Domain:** Configured via apex `A` records and `CNAME` pointing to GitHub Pages

---

## Tech Stack

- **Framework:** Next.js (Static HTML Export via `output: 'export'`)
- **Styling:** Tailwind CSS / CSS Modules
- **Fonts:** Geist (`next/font`)[cite: 4]
- **CI/CD:** GitHub Actions (Deploy to GitHub Pages workflow)

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or later)
- npm, pnpm, yarn, or bun[cite: 4]

### Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/vshukla0x/](https://github.com/vshukla0x/)<your-repo-name>.git
   cd <your-repo-name>
