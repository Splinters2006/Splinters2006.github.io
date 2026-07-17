# Splinters Cozy Corner

Astro migration of the original `Splinters2006.github.io` static site.

## Project Structure

```text
/
├── public/
│   ├── assets/
│   └── music/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

The page content, repeated sections, and music player song list live in `src/pages/index.astro`.
Static media assets are served from `public/assets` and `public/music`.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Astro dev server |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build |
