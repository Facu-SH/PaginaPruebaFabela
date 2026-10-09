// Mensajes prellenados de WhatsApp y asuntos de mail, según el contexto.
// Se pueden editar libremente: son el texto que le llega a quien atiende.

export const mensajesWhatsApp = {
  general: 'Hola, buen día. Les escribo desde la web.',
  lista: 'Hola, buen día. ¿Me pasan la lista de precios?',
  pedido: 'Hola, buen día. Quiero hacer un pedido:',
  clinica: 'Hola, buen día. Escribo de una clínica / institución y quiero consultar por porciones individuales.',
  comercio: 'Hola, buen día. Tengo un comercio y quiero consultar por porciones individuales.',
  /** {producto} se reemplaza por el nombre del producto. */
  producto: 'Hola, buen día. Quería consultar por {producto}.',
  /** {zona} se reemplaza por la zona elegida. */
  zona: 'Hola, buen día. Estoy en {zona}, ¿qué día me llegaría un pedido?',
  /** Para "Otras zonas": la persona completa su localidad en WhatsApp. */
  otraZona: 'Hola, buen día. Estoy en (escribí acá tu localidad), ¿llegan a mi zona?',
} as const;

/** Mensaje de "Armá tu consulta": la lista de productos que eligió la persona. */
export interface Consulta {
  items: { nombre: string; cantidad?: string }[];
  otro?: string;
  /** "una clínica o institución", "un comercio (bar, kiosco, almacén)"… */
  tipo?: string;
  zona?: string;
}

export function mensajeConsulta({ items, otro, tipo, zona }: Consulta) {
  const lineas = ['Hola, buen día. Armé esta consulta desde la web:'];
  for (const i of items) lineas.push(`• ${i.nombre}${i.cantidad ? ` (${i.cantidad})` : ''}`);
  if (otro) lineas.push(`• ${otro}`);
  const datos = [tipo && `Es para ${tipo}.`, zona && `Estoy en ${zona}.`].filter(Boolean);
  if (datos.length) lineas.push('', datos.join(' '));
  lineas.push('¿Me pasan precios? Gracias.');
  return lineas.join('\n');
}

export const asuntosMail = {
  general: 'Consulta desde la web',
  lista: 'Pedido de lista de precios',
  pedido: 'Pedido',
} as const;

export type ContextoWhatsApp = keyof typeof mensajesWhatsApp;
