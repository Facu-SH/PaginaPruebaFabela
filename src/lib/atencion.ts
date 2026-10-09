// Textos del tablero de atención ("atendiendo ahora"), en hora de Buenos Aires.
// Los usa TableroAtencion.astro en el servidor (con una fecha de prueba) y src/scripts/atencion.ts
// en el navegador (con la hora real), así los dos dicen exactamente lo mismo.
import { empresa } from '../data/empresa';
import { horario } from '../data/horario';
import { aMinutos, duracion, minutosParaAbrir, posicionEnDia } from './calendario';
import { ahoraEnBA, estadoAtencion, horaCorta, textoHorario } from './horario';

export interface TextosAtencion {
  /** null = sin JS (no se sabe la hora): se muestra el horario. */
  abierto: boolean | null;
  rotuloHora: string;
  hora: string;
  titulo: string;
  detalle: string;
  cuenta: string;
  boton: string;
  compacto: string;
  /** Posición de la marca "ahora" en la franja de 24 h (0 a 100). */
  posicion: number | null;
}

const atiende = empresa.whatsapp.atiende;
const abre = horaCorta(horario.abre, true);
const cierra = horaCorta(horario.cierra, true);
const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Lo que se ve sin JS: el horario impreso, como en el dorso del sobre. */
export const textosSinHora = (): TextosAtencion => ({
  abierto: null,
  rotuloHora: 'Arrancamos a las',
  hora: abre,
  titulo: textoHorario(),
  detalle: `Te contesta ${atiende} por WhatsApp, en minutos.`,
  cuenta: '',
  boton: `Escribile a ${atiende} por WhatsApp`,
  compacto: `${textoHorario()} · te contesta ${atiende}`,
  posicion: null,
});

export function textosAtencion(fecha = new Date()): TextosAtencion {
  const e = estadoAtencion(fecha);
  const { minutos } = ahoraEnBA(fecha);
  const hora = `${Math.floor(minutos / 60)}:${String(minutos % 60).padStart(2, '0')}`;
  const base = { rotuloHora: 'En Buenos Aires son las', hora, posicion: posicionEnDia(minutos) };

  if (e.abierto) {
    return {
      ...base,
      abierto: true,
      titulo: e.titulo,
      detalle: `${mayuscula(e.detalle)}. Del otro lado está ${atiende}.`,
      cuenta: `Cerramos a las ${cierra} · faltan ${duracion(e.minutosParaCerrar ?? 0)}`,
      boton: `Escribile a ${atiende} ahora`,
      compacto: `Atendiendo ahora · hasta las ${cierra}`,
    };
  }

  const falta = minutosParaAbrir(fecha);
  return {
    ...base,
    abierto: false,
    titulo: e.titulo,
    detalle: `${mayuscula(e.detalle)}. Te contesta ${atiende}.`,
    cuenta: falta !== null && falta < 24 * 60 ? `Faltan ${duracion(falta)} para las ${abre}` : `Atendemos de ${horaCorta(horario.abre)} a ${horaCorta(horario.cierra)} h`,
    boton: `Dejale tu mensaje a ${atiende}`,
    compacto: `Cerrado ahora · arrancamos ${e.proximaApertura} a las ${abre}`,
  };
}

/** Ventana de atención en la franja de 24 h (porcentajes). */
export const ventanaAtencion = () => {
  const izq = posicionEnDia(aMinutos(horario.abre));
  return { izq, ancho: posicionEnDia(aMinutos(horario.cierra)) - izq };
};
