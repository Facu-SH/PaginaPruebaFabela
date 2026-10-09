// Links de contacto: WhatsApp con mensaje prellenado, mail y teléfono.
import { empresa } from '../data/empresa';
import { asuntosMail, mensajesWhatsApp, type ContextoWhatsApp } from '../data/mensajes';

const completar = (plantilla: string, vars: Record<string, string> = {}) =>
  plantilla.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '');

/**
 * Link a WhatsApp con el mensaje del contexto.
 * waLink('lista') · waLink('producto', { producto: 'mayonesa' }) · waLink({ texto: 'Hola…' })
 */
export function waLink(contexto: ContextoWhatsApp | { texto: string } = 'general', vars?: Record<string, string>) {
  const texto = typeof contexto === 'string' ? completar(mensajesWhatsApp[contexto], vars) : contexto.texto;
  return `https://wa.me/${empresa.whatsapp.numero}?text=${encodeURIComponent(texto)}`;
}

export function mailtoLink(asunto: keyof typeof asuntosMail | string = 'general', cuerpo?: string) {
  const s = asunto in asuntosMail ? asuntosMail[asunto as keyof typeof asuntosMail] : asunto;
  const params = new URLSearchParams({ subject: s, ...(cuerpo ? { body: cuerpo } : {}) });
  // URLSearchParams codifica espacios como "+", que algunos clientes de mail no entienden.
  return `mailto:${empresa.email}?${params.toString().replace(/\+/g, '%20')}`;
}

export const telLink = () => `tel:${empresa.telefono.replace(/[^\d+]/g, '')}`;
