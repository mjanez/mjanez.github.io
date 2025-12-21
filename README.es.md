# [mjanez.dev](https://mjanez.dev)

<p align="center">
	<a href="https://mjanez.dev">
		<img alt="Sitio web mjanez.dev" src="https://img.shields.io/badge/website-mjanez.dev-0ea5e9?style=for-the-badge&logo=hugo&logoColor=white" />
	</a>
	<a href="README.md">
		<img alt="Documentación en inglés" src="https://img.shields.io/badge/docs-EN-2563EB?style=for-the-badge" />
	</a>
	<a href="README.es.md">
		<img alt="Documentación en español" src="https://img.shields.io/badge/docs-ES-F97316?style=for-the-badge" />
	</a>
</p>

Sitio estático construido con Hugo + Tailwind. Todo el contenido visible se gestiona via `data/` (por idioma) e `i18n/` para textos UI. No hay hardcodes en layouts.

## Requisitos
- Hugo Extended (>=0.125).
- Node 18+.

## Comandos
- `npm install`
- `npm run dev` levanta Hugo en watch y sirve Tailwind vía PostCSS.
- `npm run build` genera el sitio minificado en `public/`.

## Estructura rápida
- `data/*.es.yaml` y `data/*.en.yaml`: experiencia, proyectos y stack localizados.
- `i18n/`: claves estáticas (navegación, CTA, etc.).
- `layouts/partials/`: head, nav, hero, secciones y scripts.
- `assets/css/main.css`: entrada Tailwind.
- `hugo.toml`: config multilenguaje y paths de assets.

## Flujo de contenido
1) Edita los datos del idioma que corresponda. Hugo carga automáticamente el dataset según `--language` o la URL. 
2) Si necesitas textos de UI nuevos, añade las claves en ambos ficheros de `i18n/` y referencia con `{{ T "clave" }}` en los layouts.

## Despliegue
`npm run build` y sube `public/` (o usa GitHub Pages).

## GitHub Pages (código minificado automático)
1. En la configuración del repo activa Pages desde la rama `gh-pages` (root).
2. Añade `.github/workflows/gh-pages.yml`:

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
3. La primera ejecución crea `gh-pages`; Pages servirá el build minificado desde esa rama.
