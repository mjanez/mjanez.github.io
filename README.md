# [mjanez.dev](https://mjanez.dev)

<p align="center">
	<a href="https://mjanez.dev">
		<img alt="Website mjanez.dev" src="https://img.shields.io/badge/website-mjanez.dev-0ea5e9?style=for-the-badge&logo=hugo&logoColor=white" />
	</a>
	<a href="README.md">
		<img alt="Read in English" src="https://img.shields.io/badge/docs-EN-2563EB?style=for-the-badge" />
	</a>
	<a href="README.es.md">
		<img alt="Documentación en Español" src="https://img.shields.io/badge/docs-ES-F97316?style=for-the-badge" />
	</a>
</p>

Static site built with Hugo + Tailwind. Visible content lives in `data/` (per language) and UI strings in `i18n/`. Layouts avoid hardcoded text.

## Requirements
- Hugo Extended (>=0.125).
- Node 18+.

## Commands
- `npm install`
- `npm run dev` runs Hugo in watch mode and serves Tailwind via PostCSS.
- `npm run build` builds the minified site into `public/`.

### Development troubleshooting

**Changes not reflecting in the browser?**

Hugo caches aggressively. If your edits don't appear:

1. **Stop the server** (`Ctrl+C` or `pkill -f "hugo server"`)
2. **Clear cache**: `rm -rf public resources`
3. **Restart**: `npm run dev`

For critical changes (layouts, partials, config), always clear cache first:
```bash
rm -rf public resources && npm run dev
```

**Why does this happen?**
- Hugo's Fast Render mode (even when disabled) can cache partial templates
- The `resources/` folder stores processed assets (CSS, JS) that may be stale
- Browser cache can also interfere - try hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`)

**Clean rebuild command:**
```bash
npm run build  # Production build always cleans everything
```

## Quick structure
- `data/*.es.yaml` and `data/*.en.yaml`: localized experience, projects, stack.
- `i18n/`: static UI strings (nav, CTA, etc.).
- `layouts/partials/`: head, nav, hero, sections, scripts.
- `assets/css/main.css`: Tailwind entrypoint.
- `hugo.toml`: multilingual config and asset paths.

## Content workflow
1) Edit the language dataset you need. Hugo loads the correct one automatically based on `--language` or URL.
2) For new UI text, add keys to both `i18n/` files and reference via `{{ T "key" }}` in layouts.

## Deploy
`npm run build` then publish `public/` (or use GitHub Pages).

## GitHub Pages (auto-minified)
1. In repo settings enable Pages from the `gh-pages` branch (root).
2. Add `.github/workflows/gh-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
	push:
		branches: [main]
	workflow_dispatch:

permissions:
	contents: read
	pages: write
	id-token: write

concurrency: pages

jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- uses: actions/setup-node@v4
				with:
					node-version: 20
			- uses: peaceiris/actions-hugo@v2
				with:
					hugo-version: '0.125.0'
					extended: true
			- run: npm ci
			- run: npm run build
			- uses: actions/upload-pages-artifact@v3
				with:
					path: ./public

	deploy:
		needs: build
		runs-on: ubuntu-latest
		environment:
			name: github-pages
			url: ${{ steps.deployment.outputs.page_url }}
		steps:
			- id: deployment
				uses: actions/deploy-pages@v4
```
3. First run creates `gh-pages`; Pages serves the minified build under that branch.
