# Vivek’s portfolio

Source for [vivekk.me](https://vivekk.me/), a student portfolio featuring the ideas, screenshots, and source repositories behind First Set and Better Tech.

First Set is presented as a prototype in development. Better Tech has a public demo and a source link.

## Published website

The live website is the static `site/` directory:

- `site/index.html` — content, project stories, links, and page metadata.
- `site/assets/styles.css` — responsive layout and cursor glow.
- `site/assets/script.js` — navigation, screenshot viewer, preview switch, and optional audio.
- `site/assets/*.webp` — optimized project screenshots.
- `site/CNAME` — the existing custom domain.

HTML, CSS, and JavaScript run directly in the browser. There is no build step for this version. The Next.js files elsewhere in the repository belong to the earlier implementation and are not used by the current Pages workflow.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8080 --directory site
```

Open `http://localhost:8080`. The website also opens directly from `site/index.html`.

## Publish an update

Commit changes to `site/` and push `main`. The existing `.github/workflows/deploy.yml` uploads that directory to GitHub Pages. Check the Actions tab for deployment status.

## Interaction and accessibility

- A mobile navigation menu, visible keyboard focus, a skip link, and active section links.
- A horizontally scrollable First Set gallery and native modal screenshot viewer.
- Responsive images, lazy loading, and fixed image dimensions to limit layout shifts.
- Cursor glow with an off switch and reduced-motion support.
- Optional cursor and click audio. Sound starts muted and only initializes after a visitor enables it.

## Featured source repositories

- [First Set](https://github.com/vshukla0x/fit-forge-) — HTML, CSS, JavaScript, and browser local storage.
- [Better Tech](https://github.com/vshukla0x/better-tech-) — React, TypeScript, Vite, and CSS. [Live demo](https://better-tech-chi.vercel.app/).

Keep availability labels, technology lists, and personal project stories accurate when updating the page. Add a résumé link only when the corresponding PDF exists, and a contact form only with a configured destination.
