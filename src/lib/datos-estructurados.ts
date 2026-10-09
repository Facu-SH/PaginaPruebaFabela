// Datos estructurados (JSON-LD, schema.org) generados desde src/data/. Los usan:
// - Sitio.astro: la empresa (Organization + WholesaleStore) en todas las páginas, y WebSite en el inicio;
// - Migas.astro: BreadcrumbList, con los mismos ítems que las migas visibles;
// - /preguntas-frecuentes/: FAQPage, con el mismo texto que se ve en la página.
// No hay precios: la lista se pide por WhatsApp o mail.
import { categorias, empresa, entregas, horario, pagos, productosPorCategoria, type Dia, type PreguntaFrecuente } from '../data';
import { imagenCompartir, OG, paginas } from './paginas';
import { urlAbsoluta } from './url';
import { waLink } from './whatsapp';

type Nodo = Record<string, unknown>;

const DIA_SCHEMA: Record<Dia, string> = {
  lunes: 'Monday',
  martes: 'Tuesday',
  miercoles: 'Wednesday',
  jueves: 'Thursday',
  viernes: 'Friday',
  sabado: 'Saturday',
  domingo: 'Sunday',
};

const PAISES: Record<string, string> = { AR: 'Argentina' };

/** "@id" de la empresa: el mismo en todas las páginas, para que los buscadores la reconozcan como una sola. */
export const idEmpresa = (sitio: URL) => `${urlAbsoluta('/', sitio)}#empresa`;
export const idSitioWeb = (sitio: URL) => `${urlAbsoluta('/', sitio)}#sitio`;

const horarioAtencion = (): Nodo => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: horario.dias.map((d) => `https://schema.org/${DIA_SCHEMA[d]}`),
  opens: horario.abre,
  closes: horario.cierra,
});

/** Organization + WholesaleStore: nombre, dirección, horario, zonas, contacto y catálogo (sin precios). */
export function empresaJsonLd(sitio: URL): Nodo {
  const { direccion } = empresa;
  const inicio = paginas.find((p) => p.ruta === '/');
  const nombreSinSRL = empresa.razonSocial.replace(/\s+S\.?R\.?L\.?$/i, '');
  const sameAs = [empresa.instagram, empresa.googleMaps].filter((x): x is string => !!x);
  const medios = pagos.medios.map((m, i) => (i === 0 ? m.charAt(0).toUpperCase() + m.slice(1) : m));
  const zonas = entregas.filter((z) => z.dias !== 'consultar');

  return {
    '@type': ['Organization', 'WholesaleStore'],
    '@id': idEmpresa(sitio),
    name: empresa.nombreComercial,
    legalName: empresa.razonSocial,
    alternateName: [`${empresa.nombreComercial} ${nombreSinSRL}`, nombreSinSRL],
    description:
      `Distribuidora de alimentos en porciones individuales de ${direccion.localidad}, ${direccion.partido}, desde ${empresa.desde}: ` +
      `${categorias.map((c) => c.nombre.toLowerCase()).join(', ')}, para clínicas, bares, kioscos y comercios.`,
    url: urlAbsoluta('/', sitio),
    logo: { '@type': 'ImageObject', url: urlAbsoluta('/logo-dpi.png', sitio), width: 600, height: 600 },
    image: inicio ? { '@type': 'ImageObject', url: urlAbsoluta(imagenCompartir(inicio.og).ruta, sitio), width: OG.ancho, height: OG.alto } : undefined,
    telephone: empresa.telefono,
    email: empresa.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: direccion.calle,
      addressLocality: direccion.localidad,
      addressRegion: direccion.provincia,
      ...(direccion.codigoPostal ? { postalCode: direccion.codigoPostal } : {}),
      addressCountry: direccion.pais,
    },
    ...(direccion.geo ? { geo: { '@type': 'GeoCoordinates', latitude: direccion.geo.lat, longitude: direccion.geo.lng } } : {}),
    ...(empresa.googleMaps ? { hasMap: empresa.googleMaps } : {}),
    openingHoursSpecification: [horarioAtencion()],
    areaServed: zonas.map((z) => ({ '@type': 'AdministrativeArea', name: z.zona })),
    foundingDate: String(empresa.desde),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: 'Teléfono y mail',
        telephone: empresa.telefono,
        email: empresa.email,
        availableLanguage: 'es',
        areaServed: PAISES[direccion.pais] ? { '@type': 'Country', name: PAISES[direccion.pais] } : direccion.pais,
        hoursAvailable: horarioAtencion(),
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: `WhatsApp (te contesta ${empresa.whatsapp.atiende})`,
        telephone: `+${empresa.whatsapp.numero}`,
        url: waLink('general'),
        availableLanguage: 'es',
        hoursAvailable: horarioAtencion(),
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Alimentos en porción individual',
      itemListElement: categorias.map((c) => ({
        '@type': 'OfferCatalog',
        name: c.nombre,
        description: c.bajada,
        url: urlAbsoluta(`/productos/${c.slug}/`, sitio),
        itemListElement: productosPorCategoria(c.slug).map((p) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: `${p.nombre} en porción individual`,
            category: c.nombre,
            ...(p.marca ? { brand: { '@type': 'Brand', name: p.marca } } : {}),
            ...(p.variantes ? { description: `Variantes: ${p.variantes.join(', ')}.` } : {}),
          },
        })),
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
    paymentAccepted: medios.join(', '),
  };
}

/** WebSite (solo en el inicio): el nombre del sitio para los buscadores. */
export function sitioWebJsonLd(sitio: URL): Nodo {
  return {
    '@type': 'WebSite',
    '@id': idSitioWeb(sitio),
    name: empresa.nombreComercial,
    alternateName: empresa.razonSocial,
    url: urlAbsoluta('/', sitio),
    inLanguage: 'es-AR',
    publisher: { '@id': idEmpresa(sitio) },
  };
}

/** BreadcrumbList desde los ítems de <Migas> (con "Inicio" ya agregado). El último es la página actual. */
export function migasJsonLd(items: { nombre: string; href?: string }[], actual: string, sitio: URL): Nodo {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nombre,
      item: i === items.length - 1 ? actual : urlAbsoluta(m.href ?? '/', sitio),
    })),
  };
}

/** FAQPage: el mismo texto que se ve en /preguntas-frecuentes/. */
export function preguntasJsonLd(preguntas: PreguntaFrecuente[], pagina: string): Nodo {
  return {
    '@type': 'FAQPage',
    '@id': `${pagina}#preguntas`,
    url: pagina,
    inLanguage: 'es-AR',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}

/** JSON listo para un <script type="application/ld+json">: con @context y sin "<" que pueda cerrar el script. */
export function aJsonLd(nodos: Nodo | Nodo[]) {
  const datos = Array.isArray(nodos)
    ? { '@context': 'https://schema.org', '@graph': nodos }
    : { '@context': 'https://schema.org', ...nodos };
  return JSON.stringify(datos).replace(/</g, '\\u003c');
}
