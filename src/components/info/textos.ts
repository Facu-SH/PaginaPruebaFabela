// Ayudas de redacción y links externos de las páginas de información práctica
// (entregas, preguntas frecuentes, contacto, 404). Nada de datos acá: todo sale de src/data/.
import { empresa } from '../../data';
import { textoHorario } from '../../lib/horario';
import { direccionLinea } from '../../lib/textos';

const PAISES: Record<string, string> = { AR: 'Argentina' };

/**
 * Búsqueda de la dirección del depósito en Google Maps (armada desde empresa.direccion).
 * Sin mapas embebidos ni iframes: no queremos cookies ni trackers.
 */
export function linkMapa() {
  const pais = PAISES[empresa.direccion.pais];
  const consulta = pais ? `${direccionLinea()}, ${pais}` : direccionLinea();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}

/** "Lunes a viernes, de 5 a 16 h" -> "de lunes a viernes de 5 a 16 h" (para usar dentro de una oración). */
export function horarioEnFrase() {
  const h = textoHorario();
  return `de ${h.charAt(0).toLowerCase()}${h.slice(1).replace(/, de /, ' de ')}`;
}
