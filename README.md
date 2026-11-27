# Vivek’s portfolio

Source for [vivekk.me](https://vivekk.me/), a single-file student portfolio showcasing genuine work by Vivek Shukla: IET Grid, O.A.S.I.S., First Set, and Better Tech.

## Published website

The live website is served from the static `site/` directory:

- `site/index.html` — self-contained HTML5, CSS3, Vanilla JS, and flow-field Canvas implementation.
- `site/assets/*.webp` — actual application screenshots in crisp 16:10 WebP assets.
- `site/CNAME` — custom domain (`vivekk.me`).

No build step or runtime bundler dependencies exist for this version. Legacy Next.js files elsewhere in the repository are not part of `.github/workflows/deploy.yml`, which publishes `./site` directly to GitHub Pages.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8080 --directory site
```

Then open `http://localhost:8080`.

## Interaction & accessibility

- Multilingual entry greeting curtain (once per session, skipped under `prefers-reduced-motion`).
- Segmented 24-tick gallery scrubber synchronized across drag, wheel, click, touch, and keyboard navigation without trapping vertical page scroll.
- Masked typography reveals, static/reduced-motion fallbacks, and native `<dialog>` project details.
- Low-contrast neutral grey flow-field canvas controlled via `BACKGROUND_INTENSITY`.

## Project repositories

- [IET Grid](https://github.com/ThunderKhan/iet-grid) — React, Vite, Python, FastAPI, Supabase, PostgreSQL.
- [O.A.S.I.S.](https://github.com/ThunderKhan/oasis) — Next.js, TypeScript, Tailwind CSS, Python, FastAPI, SQLite, Scikit-learn.
- [First Set](https://github.com/vshukla0x/fit-forge-) — HTML, CSS, JavaScript, localStorage.
- [Better Tech](https://github.com/vshukla0x/better-tech-) — React, TypeScript, Vite, CSS.
