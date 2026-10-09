// Horario de atención (WhatsApp, teléfono y retiro en depósito).
import type { Horario } from './types';

export const horario: Horario = {
  zonaHoraria: 'America/Argentina/Buenos_Aires',
  dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
  abre: '05:00',
  cierra: '16:00',
  feriados: [], // (S) opcional: fechas 'AAAA-MM-DD' en las que no se atiende
  retiroEnDeposito: true, // mismo horario, en la dirección de la empresa
};
