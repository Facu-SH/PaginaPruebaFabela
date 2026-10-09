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
} as const;

export const asuntosMail = {
  general: 'Consulta desde la web',
  lista: 'Pedido de lista de precios',
  pedido: 'Pedido',
} as const;

export type ContextoWhatsApp = keyof typeof mensajesWhatsApp;
