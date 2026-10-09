// /llms.txt (formato de llmstxt.org): el resumen del negocio para ChatGPT, Claude, Perplexity, Gemini
// y cualquier IA que lea el sitio. Todo sale de src/data/ y de la lista de páginas (src/lib/paginas.ts).
import type { APIRoute } from 'astro';
import { categorias, comidasClinica, empresa, entregas, horario, marcas, pagos, pedidoTipicoComercio, precios, productosPorCategoria } from '../data';
import { horaCorta, textoHorario } from '../lib/horario';
import { paginas } from '../lib/paginas';
import { diaDeReparto, direccionLinea, enumerar, mayuscula, nombreProducto, zonasConReparto } from '../lib/textos';
import { urlAbsoluta } from '../lib/url';
import { horarioEnFrase } from '../components/info/textos';
import { listaConMarca } from '../components/productos/textos';

const PAISES: Record<string, string> = { AR: 'Argentina' };

export const GET: APIRoute = ({ site }) => {
  const sitio = site ?? new URL(empresa.dominio);
  const DPI = empresa.nombreComercial;
  const atiende = empresa.whatsapp.atiende;
  const { localidad, partido, provincia } = empresa.direccion;
  const zonas = enumerar(zonasConReparto().map((z) => z.zona));
  const pais = PAISES[empresa.direccion.pais] ?? empresa.direccion.pais;
  const propia = marcas.find((m) => m.propia)?.nombre ?? DPI;
  const horarioTexto = textoHorario().replace(/ /g, ' ');
  const pagina = (ruta: string) => urlAbsoluta(ruta, sitio);
  const diaria = entregas.find((z) => z.dias === 'habiles') ?? entregas[0];

  const lineas = [
    `# ${DPI} · ${empresa.razonSocial}`,
    '',
    `> ${DPI} (${empresa.razonSocial}) es una distribuidora de alimentos en porciones individuales de ${localidad}, ${partido} (${provincia}, ${pais}), que desde ${empresa.desde} abastece a clínicas, geriátricos, bares, kioscos y comercios de ${zonas}.`,
    '',
    `El WhatsApp lo atiende una persona, ${atiende}, ${horarioEnFrase().replace(/\u00a0/g, ' ')} (hora de Buenos Aires): arrancan a las ${horaCorta(horario.abre, true)} de la mañana y contestan en minutos. No es una tienda online: no hay carrito ni precios publicados; la lista de precios se pide ${precios.comoPedir}.`,
    '',
    '## Qué vende',
    '',
    ...categorias.map((c) => {
      // "mayonesa, ketchup, mostaza y salsa golf Natura" · "mermelada Abedul (frutilla, durazno…) y mermelada surtida DPI"
      const prods = productosPorCategoria(c.slug).map((p) =>
        p.variantes ? { ...p, nombre: `${p.nombre}${p.marca ? ` ${p.marca}` : ''} (${enumerar(p.variantes)})`, marca: undefined } : p,
      );
      return `- **${c.nombre}**${c.frio ? ' (viajan en frío)' : ''}: ${listaConMarca(prods, { propiaComoMarca: true })}.`;
    }),
    `- Marcas: ${enumerar(marcas.filter((m) => !m.propia).map((m) => m.nombre))}, y la línea propia ${propia} (edulcorante en sobre de diseño propio). Las marcas pueden cambiar.`,
    '- Trabaja más productos en porción individual de los que muestra la web: si no está, se pregunta.',
    '',
    '## A quién le vende',
    '',
    `- **Clínicas, geriátricos e instituciones**: una porción para cada comida. ${comidasClinica
      .map((c) => `${c.comida}: ${enumerar(c.productos.map(nombreProducto))}`)
      .join('. ')}. ${mayuscula(pagos.instituciones)} y ${pagos.facturacion[0]}.`,
    `- **Comercios** (kioscos, bares, almacenes, confiterías y puestos de comida): sobre todo ${enumerar(
      pedidoTipicoComercio.filter((x) => x.uso !== 'a veces').map((x) => `${nombreProducto(x.producto)} para ${x.uso}`),
    )}; a veces, ${enumerar(pedidoTipicoComercio.filter((x) => x.uso === 'a veces').map((x) => nombreProducto(x.producto)))}. ${mayuscula(
      diaria.pedidoMinimo,
    )} en ${diaria.zona}.`,
    '',
    '## Zonas y días de reparto',
    '',
    ...entregas.map((z) =>
      z.dias === 'consultar'
        ? `- **${z.zona}**: días y pedido mínimo a consultar.`
        : `- **${z.zona}**${z.detalle ? ` (${z.detalle})` : ''}: ${diaDeReparto(z).frase}${z.plazo ? ` (${z.plazo})` : ''}; ${z.pedidoMinimo}.`,
    ),
    ...(horario.retiroEnDeposito ? [`- **Retiro en el depósito** de ${localidad}, en el horario de atención. Conviene avisar antes por WhatsApp.`] : []),
    '',
    '## Horario',
    '',
    `${horarioTexto}, hora de Buenos Aires. Fuera de ese horario se puede dejar el mensaje: lo contestan a primera hora.`,
    '',
    '## Cómo pedir',
    '',
    `- WhatsApp, con ${atiende}: https://wa.me/${empresa.whatsapp.numero}`,
    `- Teléfono: ${empresa.telefono}`,
    `- Mail: ${empresa.email}`,
    `- Pedido típico: un “Hola, buen día”, lo que necesitás y en qué zona estás.`,
    '',
    '## Formas de pago y facturación',
    '',
    `- Facturación: ${enumerar(pagos.facturacion.map((f, i) => (i === 0 ? f : f.toLowerCase())))}.`,
    `- Medios de pago: ${enumerar(pagos.medios)}. Clínicas e instituciones: ${pagos.instituciones}.`,
    '',
    '## Dirección',
    '',
    `${direccionLinea()}, ${pais}. Teléfono ${empresa.telefono}.`,
    ...(empresa.googleMaps ? [`Google Maps: ${empresa.googleMaps}`] : []),
    ...(empresa.instagram ? [`Instagram: ${empresa.instagram}`] : []),
    '',
    '## Páginas',
    '',
    ...paginas.map((p) => `- [${p.nombre}](${pagina(p.ruta)}): ${p.resumen}`),
    '',
  ];

  return new Response(lineas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
