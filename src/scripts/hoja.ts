// Hoja de ruta: marca la columna del día de hoy (hora de Buenos Aires).
// Si la tabla trae data-fecha (pruebas), ya viene marcada desde el servidor.
import { ahoraEnBA } from '../lib/horario';

const { dia } = ahoraEnBA();
document.querySelectorAll<HTMLElement>('[data-hoja]:not([data-fecha])').forEach((tabla) => {
  tabla.querySelectorAll<HTMLElement>('[data-dia]').forEach((c) => c.toggleAttribute('data-hoy', c.dataset.dia === dia));
});
