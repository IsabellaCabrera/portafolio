# Portafolio · Isabella Cabrera Sogamoso

"Welcome to my creative city": portafolio bilingüe (EN/ES) construido desde el archivo de Figma **Portafolio**, página **Web**.

## Stack

- **Next.js (App Router) + React + TypeScript** (strict)
- **CSS Modules + variables CSS.** Los tokens de Figma viven en un solo archivo, `src/styles/tokens.css`.
- **Framer Motion** para animaciones y **React Three Fiber** para los escarabajos 3D.
- `next/image` para todas las imágenes y `next/font` para las tipografías de Google Fonts.

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000 → redirige a /en o /es
npm run build
npm run typecheck
```

## Rutas

Todas existen en `/en/...` y `/es/...`. El middleware redirige `/` según la cookie de idioma o el idioma del navegador.

| Ruta | Frame de Figma |
|---|---|
| `/` | Home / 01 Entrance → 02 Scroll → 03 Active |
| `/about` | About / 01 Intro · 02 Skillsets · 03 Experiences · 04 Passions |
| `/works` | Works / Lobby |
| `/works/product-design` | Category / Product Design |
| `/works/branding` | Category / Branding |
| `/works/product-design/{lumi,bipbip,linglink}` | Case / Product Design / … |
| `/works/branding/{ento,amphibia}` | Case / Branding / … |
| `/foundations` | UI Kit / 01 Foundations (tokens y assets, no indexada) |

## Estructura

```
src/
  app/[lang]/            rutas (server components)
  components/            un folder por sección (layout, home, about, works, case, circular-nav)
  content/
    projects.ts          categorías y proyectos → rutas, breadcrumbs, estampillas
    assets.generated.ts  tamaños intrínsecos de cada imagen (generado)
  i18n/config.ts         idiomas, detección y cambio de idioma
  lib/fonts.ts           fuentes globales · lib/fonts-pages.ts fuentes por página
  styles/tokens.css      tokens de Figma · styles/globals.css reset y base
  middleware.ts          redirección por idioma
public/
  assets/                imágenes optimizadas (ver docs/ASSETS.md)
  models/                escarabajos .glb optimizados
  content/               experiences.txt, passions.txt
scripts/                 conversión de assets y optimización de modelos
```

## Agregar un proyecto

1. Exporta sus imágenes a `public/assets/cases/<slug>/` y su estampilla a `public/assets/stamps/<slug>.webp`.
2. Agrégalo en `src/content/projects.ts`. La ruta, el breadcrumb y la estampilla en su categoría salen de ahí.
