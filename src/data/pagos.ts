// Facturación y formas de pago.
import type { Pagos } from './types';

export const pagos: Pagos = {
  facturacion: ['Factura A', 'Consumidor final'],
  medios: ['efectivo', 'transferencia', 'cheque'],
  instituciones: 'cheques a 30 o 60 días',
};

/** Los precios no se publican: la lista se pide por WhatsApp o mail. */
export const precios = {
  publicos: false,
  comoPedir: 'por WhatsApp o mail',
} as const;
