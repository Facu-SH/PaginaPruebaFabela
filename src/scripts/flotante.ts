// Botón flotante de WhatsApp (celular): aparece solo cuando NINGÚN botón de WhatsApp a mano está
// a la vista: los principales de la página ([data-wa-principal]) y el del encabezado
// ([data-wa-encabezado]). Así no tapa la primera pantalla (arriba ya está el del encabezado)
// ni duplica el botón grande.
// Sin JS (o sin IntersectionObserver) queda siempre visible: es un link común.
const flotante = document.querySelector<HTMLElement>('[data-flotante]');
const aMano = Array.from(document.querySelectorAll('[data-wa-principal], [data-wa-encabezado]'));

if (flotante) {
  if (!('IntersectionObserver' in window) || aMano.length === 0) {
    flotante.dataset.visible = 'si';
  } else {
    const visibles = new Set<Element>();
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visibles.add(e.target);
          else visibles.delete(e.target);
        }
        flotante.dataset.visible = visibles.size > 0 ? 'no' : 'si';
      },
      { threshold: 0.4 },
    );
    aMano.forEach((el) => io.observe(el));
  }
}
