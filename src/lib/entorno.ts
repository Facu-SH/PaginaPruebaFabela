// Variables de entorno de la compilación.
//
// VISTA_PREVIA=1: la compilación es una vista previa (por ejemplo, GitHub Pages en una subcarpeta).
// Todas las páginas salen con <meta name="robots" content="noindex"> y robots.txt no deja indexar nada,
// para que la vista previa no compita en Google con el dominio real. Ver .github/workflows/vista-previa.yml.
export const vistaPrevia = ['1', 'true', 'si'].includes((process.env.VISTA_PREVIA ?? '').toLowerCase());
