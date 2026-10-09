// Mensaje de "Armá tu consulta". Vive acá mientras sea propio de la dirección C;
// si se adopta, conviene pasarlo a src/data/mensajes.ts (ver "Pedidos al orquestador" en docs/direcciones/c.md).

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
