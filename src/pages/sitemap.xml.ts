// /sitemap.xml: las páginas públicas de src/lib/paginas.ts (las noindex, como /sistema/ y la 404, no están).
import type { APIRoute } from 'astro';
import { empresa } from '../data';
import { paginas } from '../lib/paginas';
import { urlAbsoluta } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const sitio = site ?? new URL(empresa.dominio);
  const urls = paginas.map((p) => `  <url><loc>${urlAbsoluta(p.ruta, sitio)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
