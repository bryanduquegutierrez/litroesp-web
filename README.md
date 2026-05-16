# Litro Web

Landing page de [litroesp.com](https://litroesp.com).

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animaciones)
- next-intl (ES / EN)
- Lucide React (iconos)

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Idiomas
- `/` o `/es` → Español (por defecto)
- `/en` → Inglés

Las traducciones están en `messages/es.json` y `messages/en.json`.

## Recursos visuales

Coloca las imágenes en `public/assets/`:
- `feat-parking.png` — captura de la pestaña de parkings
- `feat-prices.png` — captura de gasolineras / precios
- `feat-alerts.png` — captura de alertas
- `feat-map.png` — captura del mapa
- `feat-routes.png` — captura de planificación de ruta
- `feat-favorites.png` — captura de favoritos
- `feat-savings.png` — captura del contador de ahorro
- `hero.png` — captura principal

El icono va en `public/icons/icon.png`.

Mientras no haya imagen, se muestra el nombre del archivo como placeholder.

## Despliegue (Vercel)

1. Sube este proyecto a un repo nuevo de GitHub (`litroesp-web`).
2. Importa el repo en Vercel — detecta Next.js solo, sin configuración.
3. Añade el dominio `litroesp.com` desde Vercel → Settings → Domains.
4. Cada `git push` a `main` redespliega automáticamente.
