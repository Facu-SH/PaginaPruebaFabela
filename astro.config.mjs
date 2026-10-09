// @ts-check
import { defineConfig } from 'astro/config';

// El sitio se publica en la raíz del dominio (https://dpi-arg.com.ar/).
// Para una vista previa en una subcarpeta (por ejemplo GitHub Pages en
// /PaginaPruebaFabela/) se puede compilar con BASE_PATH=/PaginaPruebaFabela/.
// Todos los links internos usan el helper `url()` de src/lib/url.ts, que respeta este valor.
const base = process.env.BASE_PATH ?? '/';
const site = process.env.SITE_URL ?? 'https://dpi-arg.com.ar';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
