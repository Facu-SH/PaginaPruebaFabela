// Lógica de "atendiendo ahora". Siempre calcula con la hora de Buenos Aires,
// sin importar la zona horaria de quien visita el sitio.
// Se usa en el servidor (texto de respaldo) y en el navegador (estado en vivo).
import { horario } from '../data/horario';
import type { Dia } from '../data/types';

export const DIAS_JS: Dia[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const NOMBRE_DIA: Record<Dia, string> = {
  lunes: 'lunes',
  martes: 'martes',
  miercoles: 'miércoles',
  jueves: 'jueves',
  viernes: 'viernes',
  sabado: 'sábado',
  domingo: 'domingo',
};

const aMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** "05:00" -> "5:00"; "16:00" -> "16" (para textos tipo "de 5 a 16 h"). */
export const horaCorta = (hhmm: string, conMinutos = false) => {
  const [h, m] = hhmm.split(':').map(Number);
  return conMinutos || m !== 0 ? `${h}:${String(m).padStart(2, '0')}` : `${h}`;
};

export const nombreDia = (d: Dia) => NOMBRE_DIA[d];

/** Día, minutos desde medianoche y fecha (AAAA-MM-DD) en Buenos Aires. */
export function ahoraEnBA(fecha = new Date()) {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: horario.zonaHoraria,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    weekday: 'short',
  }).formatToParts(fecha);
  const p = Object.fromEntries(partes.map((x) => [x.type, x.value]));
  const indice = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  return {
    dia: DIAS_JS[indice],
    indiceDia: indice,
    minutos: Number(p.hour) * 60 + Number(p.minute),
    fecha: `${p.year}-${p.month}-${p.day}`,
  };
}

const esDiaDeAtencion = (dia: Dia, fecha: string) =>
  horario.dias.includes(dia) && !horario.feriados.includes(fecha);

/** Suma días a una fecha AAAA-MM-DD (sin depender de la zona horaria local). */
export const sumarDias = (fecha: string, n: number) => {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export interface EstadoAtencion {
  abierto: boolean;
  /** Texto principal, listo para mostrar. */
  titulo: string;
  /** Texto secundario. */
  detalle: string;
  /** Cuándo vuelve a abrir (si está cerrado): "hoy", "mañana" o el nombre del día. */
  proximaApertura?: string;
  /** Minutos que faltan para cerrar (si está abierto). */
  minutosParaCerrar?: number;
  /** Hora de apertura y cierre, para mostrar ("5:00", "16:00"). */
  horaApertura: string;
  horaCierre: string;
}

export function estadoAtencion(fecha = new Date()): EstadoAtencion {
  const { dia, indiceDia, minutos, fecha: hoy } = ahoraEnBA(fecha);
  const abre = aMinutos(horario.abre);
  const cierra = aMinutos(horario.cierra);
  const horaApertura = horaCorta(horario.abre, true);
  const horaCierre = horaCorta(horario.cierra, true);

  if (esDiaDeAtencion(dia, hoy) && minutos >= abre && minutos < cierra) {
    return {
      abierto: true,
      titulo: 'Estamos atendiendo',
      detalle: 'contestamos en minutos',
      minutosParaCerrar: cierra - minutos,
      horaApertura,
      horaCierre,
    };
  }

  // Buscar la próxima apertura.
  let proxima = '';
  if (esDiaDeAtencion(dia, hoy) && minutos < abre) {
    proxima = 'hoy';
  } else {
    for (let n = 1; n <= 14; n++) {
      const d = DIAS_JS[(indiceDia + n) % 7];
      if (esDiaDeAtencion(d, sumarDias(hoy, n))) {
        proxima = n === 1 ? 'mañana' : `el ${nombreDia(d)}`;
        break;
      }
    }
  }

  return {
    abierto: false,
    titulo: `Arrancamos ${proxima} a las ${horaApertura}`,
    detalle: 'dejanos tu mensaje y te contestamos a primera hora',
    proximaApertura: proxima,
    horaApertura,
    horaCierre,
  };
}

/** "Lunes a viernes, de 5 a 16 h" (texto de respaldo sin JS). Usa espacio duro antes de "h". */
export function textoHorario() {
  const dias = horario.dias;
  const rango =
    dias.length === 5 && dias[0] === 'lunes' && dias[4] === 'viernes'
      ? 'Lunes a viernes'
      : dias.map(nombreDia).join(', ');
  return `${rango}, de ${horaCorta(horario.abre)} a ${horaCorta(horario.cierra)}\u00a0h`;
}
