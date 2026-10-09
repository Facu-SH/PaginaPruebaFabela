// Zonas de entrega. El orden es el que se muestra en el sitio.
import type { ZonaEntrega } from './types';

export const entregas: ZonaEntrega[] = [
  {
    id: 'capital',
    zona: 'Capital Federal',
    detalle: 'incluye microcentro',
    dias: 'habiles',
    plazo: 'en general, al día siguiente del pedido',
    pedidoMinimo: 'sin mínimo',
  },
  {
    id: 'moron',
    zona: 'Morón',
    dias: ['jueves'], // (S)
    pedidoMinimo: 'sin mínimo si pedís para el día de reparto',
  },
  {
    id: 'zona-norte',
    zona: 'Zona Norte (GBA)',
    dias: ['martes'], // (S)
    pedidoMinimo: 'sin mínimo si pedís para el día de reparto',
  },
  {
    id: 'otras',
    zona: 'Otras zonas',
    dias: 'consultar',
    pedidoMinimo: 'a consultar',
  },
];
