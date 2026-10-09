// Cálculos de calendario en hora de Buenos Aires: cuenta regresiva del horario de atención
// y fechas de reparto. Se usan en el servidor (fecha de prueba) y en el navegador.
// Son datos de calendario, no promesas de entrega: los textos dicen "en general".
import { horario } from '../data/horario';
import type { Dia, ZonaEntrega } from '../data/types';
import { DIAS_JS, ahoraEnBA, nombreDia, sumarDias } from './horario';

const aMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** Día de la semana de una fecha AAAA-MM-DD. */
export const diaDeFecha = (fecha: string): Dia => DIAS_JS[new Date(`${fecha}T12:00:00Z`).getUTCDay()];

/** "2026-10-08" -> "8 de octubre" */
export const fechaLarga = (fecha: string) => {
  const [, mes, dia] = fecha.split('-');
  return `${Number(dia)} de ${MESES[Number(mes) - 1]}`;
};

/** "2026-10-08" -> "jueves 8 de octubre" */
export const fechaConDia = (fecha: string) => `${nombreDia(diaDeFecha(fecha))} ${fechaLarga(fecha)}`;

/** ¿Se atiende (y se reparte) ese día? */
export const esHabil = (fecha: string) => horario.dias.includes(diaDeFecha(fecha)) && !horario.feriados.includes(fecha);

export const siguienteHabil = (fecha: string) => {
  for (let n = 1; n <= 14; n++) {
    const f = sumarDias(fecha, n);
    if (esHabil(f)) return f;
  }
  return sumarDias(fecha, 1);
};

/** 390 -> "6 h 30 min"; 45 -> "45 min"; 600 -> "10 h". */
export const duracion = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
};

/** Minutos que faltan para la próxima apertura (null si no hay en las próximas dos semanas). */
export function minutosParaAbrir(ahora = new Date()) {
  const { fecha, minutos } = ahoraEnBA(ahora);
  const abre = aMinutos(horario.abre);
  if (esHabil(fecha) && minutos < abre) return abre - minutos;
  for (let n = 1; n <= 14; n++) {
    if (esHabil(sumarDias(fecha, n))) return 1440 - minutos + (n - 1) * 1440 + abre;
  }
  return null;
}

/**
 * Capital ("al día siguiente del pedido"): si escribís ahora, qué día llegaría, en general.
 * Un pedido hecho después del cierre o en un día sin atención cuenta desde el próximo día hábil.
 */
export function llegadaHabiles(ahora = new Date()) {
  const { fecha, minutos } = ahoraEnBA(ahora);
  const pedidoHoy = esHabil(fecha) && minutos < aMinutos(horario.cierra);
  return siguienteHabil(pedidoHoy ? fecha : siguienteHabil(fecha));
}

/** Próxima fecha de reparto de una zona con días fijos, a partir de mañana. */
export function proximoReparto(z: ZonaEntrega, ahora = new Date()) {
  if (!Array.isArray(z.dias)) return null;
  const { fecha } = ahoraEnBA(ahora);
  for (let n = 1; n <= 21; n++) {
    const f = sumarDias(fecha, n);
    if (z.dias.includes(diaDeFecha(f)) && !horario.feriados.includes(f)) return f;
  }
  return null;
}

/** Texto de la fecha estimada para una zona, o null si es a coordinar. */
export function fechaEstimada(z: ZonaEntrega, ahora = new Date()) {
  if (z.dias === 'habiles') return { rotulo: 'Si pedís ahora', texto: `en general, llega el ${fechaConDia(llegadaHabiles(ahora))}` };
  const prox = proximoReparto(z, ahora);
  return prox ? { rotulo: 'Próximo reparto', texto: fechaConDia(prox) } : null;
}

/** Posición (0 a 100) de un horario dentro de la franja de 24 h. */
export const posicionEnDia = (minutos: number) => (minutos / 1440) * 100;
export { aMinutos };
