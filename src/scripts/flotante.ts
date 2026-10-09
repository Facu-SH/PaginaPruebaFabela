// Botón flotante de WhatsApp (celular): aparece solo cuando NINGÚN botón principal
// ([data-wa-principal]) está a la vista, así no tapa la portada ni duplica el botón grande.
// Sin JS (o sin IntersectionObserver) queda siempre visible: es un link común.
const flotante = document.querySelector<HTMLElement>('[data-flotante]');
const principales = Array.from(document.querySelectorAll('[data-wa-principal]'));

if (flotante) {
  if (!('IntersectionObserver' in window) || principales.length === 0) {
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
    principales.forEach((el) => io.observe(el));
  }
}
