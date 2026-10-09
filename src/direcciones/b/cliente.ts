// Dirección B · comportamiento en el navegador (todo es mejora progresiva).
import { horario } from '../../data';
import { estadoAtencion, horaCorta } from '../../lib/horario';

/** "Atendiendo ahora" en vivo, en hora de Buenos Aires. Sin JS queda el horario impreso. */
export function iniciarEstado() {
  const pintar = () => {
    const e = estadoAtencion();
    document.querySelectorAll<HTMLElement>('[data-b-estado]').forEach((el) => {
      el.dataset.abierto = String(e.abierto);
      const texto = el.querySelector('[data-b-estado-texto]');
      if (!texto) return;
      // En el encabezado va la versión corta, para que entre en una línea a 390 px.
      const corto = e.abierto ? 'Atendiendo ahora' : `Abrimos ${e.proximaApertura} ${horaCorta(horario.abre, true)}`;
      texto.textContent = el.dataset.bEstado === 'corto' ? corto : `${e.titulo} · ${e.detalle}`;
    });
  };
  pintar();
  window.setInterval(pintar, 60_000);
}

/**
 * "¿Qué día llegamos a tu zona?": sin JS se ve la lista completa de zonas;
 * con JS aparece el selector y se muestra solo la ficha de la zona elegida.
 */
export function iniciarZonas() {
  document.querySelectorAll<HTMLElement>('[data-b-zonas]').forEach((raiz) => {
    const selector = raiz.querySelector<HTMLElement>('[data-b-zonas-selector]');
    const fichas = [...raiz.querySelectorAll<HTMLElement>('[data-b-zona]')];
    const opciones = [...raiz.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
    if (!selector || fichas.length === 0 || opciones.length === 0) return;

    const mostrar = (id: string) => {
      for (const f of fichas) f.hidden = f.dataset.bZona !== id;
    };
    for (const o of opciones) o.addEventListener('change', () => mostrar(o.value));

    selector.hidden = false;
    raiz.dataset.js = 'si';
    mostrar((opciones.find((o) => o.checked) ?? opciones[0]).value);
  });
}
