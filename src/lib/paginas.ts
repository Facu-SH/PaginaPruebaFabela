// Las páginas públicas del sitio (las que van a buscadores): ruta, nombre, una línea de resumen
// y la imagen para compartir (Open Graph). Es la fuente de:
// - sitemap.xml y llms.txt (src/pages/sitemap.xml.ts, src/pages/llms.txt.ts);
// - la imagen OG de cada página, que el layout busca por la ruta (Sitio.astro);
// - las plantillas de esas imágenes (plantillas/pages/[pieza].astro, `npm run og`).
// Las páginas noindex (/sistema/, 404) no van acá. Si se agrega una página nueva, sumala a la lista.
// Nada de datos del negocio escritos a mano: todo sale de src/data/.
import { categorias, empresa, entregas, faq, horario, marcas, masVendidos, pagos, productosPorCategoria, type CategoriaSlug } from '../data';
import type { TokenColor } from './color';
import { colorCategoria } from './color';
import { horaCorta } from './horario';
import { enumerar, mayuscula, telefonoCorto, zonaCorta, zonasConReparto } from './textos';
import { listaConMarca } from '../components/productos/textos';

/** Lo que se dibuja a la derecha de la imagen para compartir. */
export type Escena =
  /** El sobre de edulcorante DPI, grande y con sus datos impresos. */
  | { tipo: 'sobre-dpi' }
  /** Envases dibujados. `forma` decide cómo se acomodan. */
  | { tipo: 'envases'; forma: 'almohadillas' | 'sobres' | 'potes' | 'paquetes' | 'mezcla'; envases: { producto: string; sabor?: string }[] }
  /** La caja con un compartimento por categoría, cada uno en su color. */
  | { tipo: 'caja' }
  /** La hoja de ruta: cada zona con su día de reparto. */
  | { tipo: 'ruta' }
  /** La hora de apertura, gigante. */
  | { tipo: 'hora' }
  /** Tres preguntas frecuentes con su respuesta corta. */
  | { tipo: 'preguntas'; preguntas: string[] };

export interface PiezaOG {
  /** Nombre del archivo: public/og/<slug>.png */
  slug: string;
  /** Antetítulo chico. */
  rotulo: string;
  /** Titular corto (la imagen se ve chica: pocas palabras). */
  titular: string;
  /** El dato clave, debajo del titular. */
  dato: string;
  /** Fondo de la imagen (token de color). */
  fondo: TokenColor | 'papel-hondo';
  escena: Escena;
}

export interface PaginaPublica {
  ruta: string;
  /** Nombre corto, para la lista de páginas de llms.txt. */
  nombre: string;
  /** Una línea: qué hay en la página. */
  resumen: string;
  og: PiezaOG;
}

const DPI = empresa.nombreComercial;
const atiende = empresa.whatsapp.atiende;
const { localidad, partido } = empresa.direccion;
const abre = horaCorta(horario.abre, true);
const capital = entregas.find((z) => z.dias === 'habiles') ?? entregas[0];
const zonas = enumerar(zonasConReparto().map(zonaCorta));
const ajenas = marcas.filter((m) => !m.propia).map((m) => m.nombre);
const propia = marcas.find((m) => m.propia)?.nombre ?? DPI;
const [facturaA] = pagos.facturacion;
const respuestaCorta = (pregunta: string) => {
  const p = faq.find((x) => x.pregunta === pregunta);
  return p ? `${p.pregunta} ${p.respuesta.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? p.respuesta}` : undefined;
};

const FORMA: Record<string, 'almohadillas' | 'sobres' | 'potes' | 'paquetes'> = {
  sobre: 'almohadillas',
  'sobre-papel': 'sobres',
  pote: 'potes',
  paquete: 'paquetes',
};

/** Titular corto de cada categoría para la imagen (el h1 de la página es más largo). */
const TITULAR: Record<CategoriaSlug, string> = {
  aderezos: 'Sobres de mayonesa, ketchup y mostaza',
  endulzantes: 'Azúcar y edulcorante en sobre',
  mermeladas: 'Mermeladas en potecitos individuales',
  lacteos: 'Manteca y queso crema individuales',
  'galletitas-y-tostadas': 'Galletitas, vainillas y tostadas',
};

const paginasCategoria: PaginaPublica[] = categorias.map((c) => {
  const prods = productosPorCategoria(c.slug);
  const conSabores = c.envase === 'pote' && prods.find((p) => p.variantes);
  // Los sabores (mermeladas) o un envase por producto; el surtido no se dibuja (es mezcla de los otros).
  const envases = conSabores
    ? (conSabores.variantes ?? []).map((sabor) => ({ producto: conSabores.slug, sabor }))
    : prods.map((p) => ({ producto: p.slug }));
  const dato = conSabores
    ? `${conSabores.nombre}${conSabores.marca ? ` ${conSabores.marca}` : ''}: ${enumerar(conSabores.variantes ?? [])}`
    : mayuscula(listaConMarca(prods));
  return {
    ruta: `/productos/${c.slug}/`,
    nombre: c.nombre,
    resumen: c.bajada,
    og: {
      slug: c.slug,
      rotulo: `${c.nombre}${c.frio ? ' · viajan en frío' : ''}`,
      titular: TITULAR[c.slug],
      dato,
      fondo: colorCategoria[c.slug].fondo,
      escena: { tipo: 'envases', forma: FORMA[c.envase], envases },
    },
  };
});

export const paginas: PaginaPublica[] = [
  {
    ruta: '/',
    nombre: 'Inicio',
    resumen: `Qué es ${DPI}, lo que más se vende, el horario de atención por WhatsApp y las zonas de reparto.`,
    og: {
      slug: 'inicio',
      rotulo: `${localidad} · ${partido} · desde ${empresa.desde}`,
      titular: 'Porciones individuales para clínicas, bares y kioscos',
      dato: `Te contesta ${atiende} desde las ${abre}`,
      fondo: 'verde',
      escena: { tipo: 'sobre-dpi' },
    },
  },
  {
    ruta: '/productos/',
    nombre: 'Productos',
    resumen: `Todas las categorías con sus marcas (${ajenas.join(', ')} y la línea propia ${propia}) y un armador de consulta para WhatsApp.`,
    og: {
      slug: 'productos',
      rotulo: 'Productos en porción individual',
      titular: 'Sobres, potecitos y paquetitos',
      dato: `${ajenas.join(' · ')} · línea propia ${propia}`,
      fondo: 'papel',
      escena: { tipo: 'caja' },
    },
  },
  ...paginasCategoria,
  {
    ruta: '/clinicas/',
    nombre: 'Clínicas e instituciones',
    resumen: `Porciones para el desayuno, el almuerzo, la merienda y la cena de clínicas, geriátricos e instituciones; ${facturaA} y ${pagos.instituciones}.`,
    og: {
      slug: 'clinicas',
      rotulo: 'Clínicas · geriátricos · instituciones',
      titular: 'Una porción para cada comida',
      dato: `${facturaA} · ${pagos.instituciones}`,
      fondo: 'papel-hondo',
      escena: {
        tipo: 'envases',
        forma: 'mezcla',
        envases: [{ producto: 'mermeladas', sabor: 'frutilla' }, { producto: 'edulcorante' }, { producto: 'manteca' }, { producto: 'tostadas' }, { producto: 'mayonesa' }],
      },
    },
  },
  {
    ruta: '/comercios/',
    nombre: 'Comercios',
    resumen: `Edulcorante, mayonesa, azúcar y mermelada en sobre para kioscos, bares, almacenes y confiterías; ${capital.pedidoMinimo} en ${capital.zona}.`,
    og: {
      slug: 'comercios',
      rotulo: 'Kioscos · bares · almacenes',
      titular: 'Edulcorante y mayonesa en sobre',
      dato: `${mayuscula(capital.pedidoMinimo)} en ${capital.zona}`,
      fondo: 'tinta',
      escena: { tipo: 'envases', forma: 'mezcla', envases: [{ producto: 'mayonesa' }, { producto: 'edulcorante' }, { producto: 'azucar' }, { producto: 'mostaza' }] },
    },
  },
  {
    ruta: '/entregas/',
    nombre: 'Entregas',
    resumen: `Días de reparto en ${zonas}, pedido mínimo por zona, retiro en el depósito de ${localidad} y formas de pago.`,
    og: {
      slug: 'entregas',
      rotulo: `Repartimos desde ${localidad}`,
      titular: '¿Qué día llegamos a tu zona?',
      dato: `${capital.zona}: ${capital.plazo ?? 'todos los días hábiles'}`,
      fondo: 'verde',
      escena: { tipo: 'ruta' },
    },
  },
  {
    ruta: '/preguntas-frecuentes/',
    nombre: 'Preguntas frecuentes',
    resumen: `${faq.length} preguntas con respuesta corta: pedido mínimo, días de entrega, lista de precios, ${facturaA}, retiro y marcas.`,
    og: {
      slug: 'preguntas-frecuentes',
      rotulo: `${faq.length} preguntas, con respuesta corta`,
      titular: 'Preguntas frecuentes',
      dato: `Pedido mínimo, entregas, ${facturaA} y marcas`,
      fondo: 'papel',
      escena: {
        tipo: 'preguntas',
        preguntas: ['¿Hay pedido mínimo?', `¿Hacen ${facturaA}?`, '¿A qué hora atienden?']
          .map(respuestaCorta)
          .filter((x): x is string => !!x),
      },
    },
  },
  {
    ruta: '/contacto/',
    nombre: 'Contacto',
    resumen: `WhatsApp (te contesta ${atiende}), teléfono, mail y dirección del depósito en ${localidad}, con el horario de atención.`,
    og: {
      slug: 'contacto',
      rotulo: `Contacto · ${localidad}`,
      titular: `Escribile a ${atiende}`,
      dato: `Tel.\u00a0${telefonoCorto()} · ${empresa.direccion.calle}, ${localidad}`,
      fondo: 'tinta',
      escena: { tipo: 'hora' },
    },
  },
  {
    ruta: '/lista/',
    nombre: 'Lista de precios',
    resumen: 'La página del QR de la lista de precios impresa: hacer un pedido o pedir la lista vigente por WhatsApp.',
    og: {
      slug: 'lista',
      rotulo: `Lista de precios · ${DPI}`,
      titular: 'Pedí por WhatsApp',
      dato: `Te contesta ${atiende} desde las ${abre}`,
      fondo: 'verde',
      escena: {
        tipo: 'envases',
        forma: 'mezcla',
        envases: masVendidos().map((p) => ({ producto: p.slug, sabor: p.variantes?.[0] })),
      },
    },
  },
];

export const paginaPorRuta = (ruta: string) => paginas.find((p) => p.ruta === ruta);

/** Medidas de las imágenes para compartir. */
export const OG = { ancho: 1200, alto: 630 } as const;

/** Ruta de la imagen OG y su texto alternativo (lo que dice la imagen). */
export function imagenCompartir(pieza: PiezaOG) {
  return {
    ruta: `/og/${pieza.slug}.png`,
    alt: `${DPI} · ${pieza.titular}${/[.?!]$/.test(pieza.titular) ? '' : '.'} ${pieza.dato}.`,
  };
}
