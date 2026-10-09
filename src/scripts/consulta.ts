// "Armá tu consulta": los productos marcados arman un mensaje de WhatsApp (mensajeConsulta).
// No guarda nada: solo reescribe el link del botón y muestra cómo queda el mensaje.
import { mensajeConsulta } from '../data/mensajes';
import { waLink } from '../lib/whatsapp';

document.querySelectorAll<HTMLFormElement>('[data-consulta]').forEach((form) => {
  const enviar = form.querySelector<HTMLAnchorElement>('[data-consulta-enviar]');
  const vista = form.querySelector<HTMLElement>('[data-vista]');
  if (!enviar || !vista) return;
  const textoVacio = vista.textContent ?? '';
  const hrefInicial = enviar.href;

  const armar = () => {
    const items = Array.from(form.querySelectorAll<HTMLInputElement>('[data-producto]'))
      .filter((c) => c.checked)
      .map((c) => {
        const cant = form.querySelector<HTMLInputElement>(`[data-cantidad="${c.dataset.producto}"]`)?.value.trim();
        return { nombre: c.value, cantidad: cant || undefined };
      });
    const otro = form.querySelector<HTMLInputElement>('[data-otro]')?.value.trim() || undefined;
    const tipo = form.querySelector<HTMLInputElement>('[data-tipo]:checked')?.value;
    const zona = form.querySelector<HTMLSelectElement>('[data-zona-consulta]')?.value || undefined;

    if (items.length === 0 && !otro) {
      vista.textContent = textoVacio;
      enviar.href = hrefInicial;
      return;
    }
    const texto = mensajeConsulta({ items, otro, tipo, zona });
    vista.textContent = texto;
    enviar.href = waLink({ texto });
  };

  // Escribir una cantidad marca el renglón.
  form.addEventListener('input', (ev) => {
    const el = ev.target as HTMLInputElement;
    if (el.dataset.cantidad && el.value.trim()) {
      const caja = form.querySelector<HTMLInputElement>(`[data-producto="${el.dataset.cantidad}"]`);
      if (caja) caja.checked = true;
    }
    armar();
  });
  form.addEventListener('change', armar);
  form.addEventListener('submit', (ev) => ev.preventDefault());
  armar();
});
