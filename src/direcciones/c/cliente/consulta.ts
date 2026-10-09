// "Armá tu consulta": los renglones marcados del remito arman un mensaje de WhatsApp.
// No guarda nada: solo reescribe el link del botón y muestra cómo queda el mensaje.
import { waLink } from '../../../lib/whatsapp';
import { mensajeConsulta } from '../mensajes';

const form = document.querySelector<HTMLFormElement>('[data-dc-consulta]');

if (form) {
  const enviar = form.querySelector<HTMLAnchorElement>('[data-dc-enviar]')!;
  const vista = form.querySelector<HTMLElement>('[data-dc-vista]')!;
  const textoVacio = vista.textContent ?? '';
  const hrefInicial = enviar.href;

  const armar = () => {
    const items = Array.from(form.querySelectorAll<HTMLInputElement>('[data-dc-producto]'))
      .filter((c) => c.checked)
      .map((c) => {
        const cant = form.querySelector<HTMLInputElement>(`[data-dc-cantidad="${c.dataset.dcProducto}"]`)?.value.trim();
        return { nombre: c.value, cantidad: cant || undefined };
      });
    const otro = form.querySelector<HTMLInputElement>('[data-dc-otro]')?.value.trim() || undefined;
    const tipo = form.querySelector<HTMLInputElement>('[data-dc-tipo]:checked')?.value;
    const zona = form.querySelector<HTMLSelectElement>('[data-dc-zona-consulta]')?.value || undefined;

    if (items.length === 0 && !otro) {
      vista.textContent = textoVacio;
      enviar.href = hrefInicial;
      form.classList.remove('tiene-renglones');
      return;
    }
    const texto = mensajeConsulta({ items, otro, tipo, zona });
    vista.textContent = texto;
    enviar.href = waLink({ texto });
    form.classList.add('tiene-renglones');
  };

  // Escribir una cantidad marca el renglón.
  form.addEventListener('input', (ev) => {
    const el = ev.target as HTMLInputElement;
    if (el.dataset.dcCantidad && el.value.trim()) {
      const caja = form.querySelector<HTMLInputElement>(`[data-dc-producto="${el.dataset.dcCantidad}"]`);
      if (caja) caja.checked = true;
    }
    armar();
  });
  form.addEventListener('change', armar);
  form.addEventListener('submit', (ev) => ev.preventDefault());
  armar();
}
