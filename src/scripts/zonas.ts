// "¿Qué día llegamos a tu zona?": muestra la ficha de la zona elegida y completa la fecha estimada
// del próximo reparto (hora de Buenos Aires). Sin JS se ven todas las fichas, sin fecha.
import { entregas } from '../data/entregas';
import { fechaEstimada } from '../lib/calendario';

document.querySelectorAll<HTMLElement>('[data-zonas]').forEach((raiz) => {
  const fecha = raiz.dataset.fecha ? new Date(raiz.dataset.fecha) : new Date();
  const fichas = Array.from(raiz.querySelectorAll<HTMLElement>('[data-zona]'));
  const radios = Array.from(raiz.querySelectorAll<HTMLInputElement>('input[type="radio"]'));

  for (const ficha of fichas) {
    const zona = entregas.find((z) => z.id === ficha.dataset.zona);
    const fila = ficha.querySelector<HTMLElement>('[data-estimada]');
    const est = zona ? fechaEstimada(zona, fecha) : null;
    if (!fila || !est) continue;
    fila.querySelector('[data-estimada-rotulo]')!.textContent = est.rotulo;
    fila.querySelector('[data-estimada-texto]')!.textContent = est.texto;
    fila.hidden = false;
  }

  const mostrar = () => {
    const elegida = (radios.find((r) => r.checked) ?? radios[0])?.value;
    for (const f of fichas) f.toggleAttribute('data-elegida', f.dataset.zona === elegida);
  };
  radios.forEach((r) => r.addEventListener('change', mostrar));
  mostrar();
});
