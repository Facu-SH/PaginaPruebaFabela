// Arma rutas internas respetando el `base` de astro.config.mjs.
// url('/productos/') -> '/productos/' (o '/PaginaPruebaFabela/productos/' en una vista previa).
export function url(ruta = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpia = ruta.startsWith('/') ? ruta : `/${ruta}`;
  return `${base}${limpia}`;
}

/** URL absoluta de una ruta interna: urlAbsoluta('/productos/', Astro.site) -> 'https://dpi-arg.com.ar/productos/'. */
export function urlAbsoluta(ruta: string, sitio: URL | string) {
  return new URL(url(ruta), sitio).href;
}

/** Ruta sin el base: '/PaginaPruebaFabela/productos/' -> '/productos/' (para buscar una página por su ruta). */
export function rutaSinBase(pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const ruta = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return ruta.startsWith('/') ? ruta : `/${ruta}`;
}
