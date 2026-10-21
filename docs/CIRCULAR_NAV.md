# Circular Experience Wheel: notas

Componentes: `src/components/circular-nav/` (`CircularNav.tsx`, `ExperienceWheel.tsx`, `experiences.ts`).
Datos: `public/content/experiences.{en,es}.txt` y `public/content/passions.{en,es}.txt`. La página About (server component) los lee en el build. Si falta un idioma, usa el inglés.

## Geometría (coordenadas polares)

```
δᵢ = ((i − p + N/2) mod N + N) mod N − N/2     distancia circular más corta (bucle infinito)
θᵢ = δᵢ · step
cx = activeX − R      (centro del círculo fuera del escenario, a la izquierda)
cy = H / 2
xᵢ = cx + R·cos θᵢ
yᵢ = cy + R·sin θᵢ    → el ítem activo (θ = 0) queda en (activeX, H/2)
```

`p` es un único `MotionValue` en unidades de índice. Escala, opacidad, el desvanecido del texto y el gris de los ítems inactivos se calculan de forma continua a partir de |δ|. React solo vuelve a renderizar cuando cambia el índice activo.

## Constantes ajustables (`WHEEL` en `CircularNav.tsx`)

| Constante | Desktop | Mobile (compact) | De dónde sale |
|---|---|---|---|
| `stepDeg` | 15° | 17° | Especificación |
| `radius` | 0,72 × alto | 0,55 × alto | Especificación. En Figma el ejemplo es un arco de ~800 px de alto dentro de la tarjeta de About |
| `activeX` | 0,30 × ancho | 0,20 × ancho | La especificación dice 0,40. Bajado a 0,30 para que el texto del ítem activo quepa en la columna del dial, a la izquierda del panel, dentro de la tarjeta de About (1218 × 810) |
| `compactBelow` | ancho del escenario < 560 px | | Se mide el escenario, no el viewport |
| `spring` | stiffness 180, damping 24, mass 0.9 | | Especificación |
| `fadeOutAt` | 3,2 pasos | | Especificación |
| `minScale` / `minScaleAt` | 0,5 a 2,5 pasos | | Especificación (~1 → 0,5) |
| `inertia` | 0,22 s | | Hasta dónde llega un "flick" antes del ajuste |

Tokens (`--cn-*`, en `src/styles/tokens.css`): `--cn-ink` = color/text/ink `#2b2904`, `--cn-ink-soft` = gris medio `#8a8a80`, `--cn-line` = color/text/muted `#bfbfbf`, `--cn-font-ui` = Work Sans, `--cn-font-num` = JetBrains Mono con cero tachado. En Figma, el dial de la pantalla About / 03 es una imagen de ejemplo, así que de ahí no se puede leer una fuente numérica.

## Interacción

- Arrastre o swipe vertical con inercia; luego se ajusta al ítem más cercano con un resorte. `touch-action: none` aplica solo sobre el dial; el panel de detalle hace scroll normal.
- Tocar un ítem gira el dial hacia él por el camino más corto. Teclado: flechas, Home/End y Enter.
- La rueda del mouse no se captura por defecto (`captureWheel=false`).
- Con `prefers-reduced-motion`: sin animación del arco y un ajuste de 150 ms.
- Vibración corta (`navigator.vibrate(8)`) al cambiar de índice, solo si el navegador la soporta.

## Formato del .txt

El lector acepta las etiquetas Role/Company/Period/Description/Tags (en inglés o español), los separadores `---` y además el formato del portafolio:

```
MY JOURNEY | STORYLINE          ← primera línea sola = eyebrow

2022 • The Motion Beginning     ← periodo • título
Started my journey with…        ← descripción

• FASHION & SILHOUETTES         ← (passions) • título
Drawing clothing textures…
```

Un archivo vacío o mal formado no rompe la página: la rueda simplemente no se muestra.
