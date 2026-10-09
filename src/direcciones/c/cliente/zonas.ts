// "¿Qué día llegamos a tu zona?": muestra el rótulo de la zona elegida y calcula la próxima fecha.
// Sin JS no corre y se ven todos los rótulos.
import { entregas, horario } from '../../../data';
import { ahoraEnBA, nombreDia } from '../../../lib/horario';
import { waLink } from '../../../lib/whatsapp';
import { fechaLarga, proximoReparto } from '../lib';
import type { Dia } from '../../../data';

const selector = document.querySelector<HTMLElement>('[data-dc-selector]');

const DIAS_JS: Dia[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const sumarDias = (fecha: string, n: number) => {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const esHabil = (fecha: string) => {
  const dia = DIAS_JS[new Date(`${fecha}T12:00:00Z`).getUTCDay()];
  return horario.dias.includes(dia) && !horario.feriados.includes(fecha);
};
const siguienteHabil = (fecha: string) => {
  for (let n = 1; n <= 14; n++) {
    const f = sumarDias(fecha, n);
    if (esHabil(f)) return f;
  }
  return fecha;
};
const conDia = (fecha: string) => `${nombreDia(DIAS_JS[new Date(`${fecha}T12:00:00Z`).getUTCDay()])} ${fechaLarga(fecha)}`;

/** Capital: "al día siguiente del pedido". Si escribís ahora, ¿qué día sería, en general? */
function llegadaHabiles(ahora: Date) {
  const { fecha, minutos } = ahoraEnBA(ahora);
  const [h, m] = horario.cierra.split(':').map(Number);
  const pedidoHoy = esHabil(fecha) && minutos < h * 60 + m;
  const diaPedido = pedidoHoy ? fecha : siguienteHabil(fecha);
  return siguienteHabil(diaPedido);
}

if (selector) {
  const rotulos = Array.from(selector.querySelectorAll<HTMLElement>('[data-dc-zona-rotulo]'));
  const radios = Array.from(selector.querySelectorAll<HTMLInputElement>('[data-dc-zona-radio]'));

  // Fechas calculadas una vez (hora de Buenos Aires)
  const ahora = new Date();
  for (const r of rotulos) {
    const zona = entregas.find((z) => z.id === r.dataset.dcZonaRotulo);
    if (!zona) continue;
    const fila = r.querySelector<HTMLElement>('[data-dc-proximo-fila]');
    const dd = r.querySelector<HTMLElement>('[data-dc-proximo]');
    const dt = r.querySelector<HTMLElement>('[data-dc-proximo-titulo]');
    if (!fila || !dd || !dt) continue;
    if (zona.dias === 'habiles') {
      dt.textContent = 'Si escribís ahora';
      dd.textContent = `en general, llega el ${conDia(llegadaHabiles(ahora))}`;
      fila.hidden = false;
    } else if (zona.dias !== 'consultar') {
      const prox = proximoReparto(zona, ahora);
      if (prox) {
        dd.textContent = `${nombreDia(prox.dia)} ${fechaLarga(prox.fecha)}`;
        fila.hidden = false;
      }
    }
  }

  // Zona "otras": la localidad que escribís va en el mensaje
  const localidad = selector.querySelector<HTMLInputElement>('[data-dc-localidad]');
  const linkOtras = selector.querySelector<HTMLAnchorElement>('[data-dc-zona-link]');
  if (localidad && linkOtras) {
    const base = linkOtras.href;
    localidad.addEventListener('input', () => {
      const v = localidad.value.trim();
      linkOtras.href = v ? waLink('zona', { zona: v }) : base;
    });
  }

  const mostrar = () => {
    const elegida = radios.find((r) => r.checked)?.value ?? radios[0]?.value;
    rotulos.forEach((r) => (r.hidden = r.dataset.dcZonaRotulo !== elegida));
  };
  radios.forEach((r) => r.addEventListener('change', mostrar));
  selector.classList.add('con-selector');
  mostrar();
}
