// /robots.txt: deja entrar a todos los buscadores y a los de IA (nombrados uno por uno, para que quede
// explícito), salvo a /sistema/ (la página interna del sistema de diseño). Apunta al sitemap.
// En una vista previa (VISTA_PREVIA=1) no deja indexar nada.
import type { APIRoute } from 'astro';
import { empresa } from '../data';
import { vistaPrevia } from '../lib/entorno';
import { url, urlAbsoluta } from '../lib/url';

/** Buscadores de IA: los de OpenAI (ChatGPT), Anthropic (Claude), Perplexity y Google (Gemini). */
const BOTS_IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended'];

/** Rutas que no se indexan (también tienen <meta name="robots" content="noindex">). */
const PRIVADAS = ['/sistema/'];

export const GET: APIRoute = ({ site }) => {
  const sitio = site ?? new URL(empresa.dominio);
  const reglas = vistaPrevia ? [`Disallow: ${url('/')}`] : [`Allow: ${url('/')}`, ...PRIVADAS.map((r) => `Disallow: ${url(r)}`)];
  const texto = [
    '# robots.txt · DPI (Productos Individuales SRL)',
    vistaPrevia ? '# Vista previa: no se indexa (el sitio real está en el dominio de la empresa).' : '# Todos los buscadores, también los de IA, pueden leer el sitio.',
    '',
    'User-agent: *',
    ...reglas,
    '',
    ...BOTS_IA.map((b) => `User-agent: ${b}`),
    ...reglas,
    '',
    `Sitemap: ${urlAbsoluta('/sitemap.xml', sitio)}`,
    '',
  ].join('\n');
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
