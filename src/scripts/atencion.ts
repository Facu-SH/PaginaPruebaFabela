// "Atendiendo ahora" en vivo, siempre con la hora de Buenos Aires (aunque el visitante esté en otro país).
// Completa los tableros ([data-tablero]) y los puntos de estado ([data-estado-punto], el del flotante).
// Un tablero con data-fecha queda fijo en ese momento (pruebas y /sistema/).
import { textosAtencion } from '../lib/atencion';

const poner = (raiz: Element, sel: string, texto: string) => {
  const el = raiz.querySelector<HTMLElement>(sel);
  if (el && el.textContent !== texto) el.textContent = texto;
};

function pintar() {
  const ahora = new Date();
  document.querySelectorAll<HTMLElement>('[data-tablero]').forEach((el) => {
    const t = textosAtencion(el.dataset.fecha ? new Date(el.dataset.fecha) : ahora);
    el.dataset.abierto = String(t.abierto);
    poner(el, '[data-t-compacto]', t.compacto);
    poner(el, '[data-t-rotulo-hora]', t.rotuloHora);
    poner(el, '[data-t-hora]', t.hora);
    poner(el, '[data-t-titulo]', t.titulo);
    poner(el, '[data-t-detalle]', t.detalle);
    poner(el, '[data-t-boton]', t.boton);
    const cuenta = el.querySelector<HTMLElement>('[data-t-cuenta]');
    if (cuenta) {
      cuenta.textContent = t.cuenta;
      cuenta.hidden = !t.cuenta;
    }
    const marca = el.querySelector<HTMLElement>('[data-t-ahora]');
    if (marca && t.posicion !== null) {
      marca.hidden = false;
      marca.style.left = `${t.posicion}%`;
    }
  });
  const general = textosAtencion(ahora);
  document.querySelectorAll<HTMLElement>('[data-estado-punto]').forEach((el) => {
    el.dataset.abierto = String(general.abierto);
  });
}

pintar();
window.setInterval(pintar, 20_000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') pintar();
});
