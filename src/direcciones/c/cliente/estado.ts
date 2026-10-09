// Estado "atendiendo ahora" en vivo, siempre con la hora de Buenos Aires.
// Actualiza: el tablero (casilleros, fechador, franja, textos), el sol del wordmark
// (data-estado en .dc), el botón flotante y la columna "hoy" de la hoja de ruta.
import { empresa } from '../../../data';
import { ahoraEnBA, estadoAtencion, horaCorta, nombreDia } from '../../../lib/horario';
import { horario } from '../../../data';
import { duracion, minutosParaAbrir, partesFecha, posicionEnDia } from '../lib';

const raiz = document.querySelector<HTMLElement>('.dc');
const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

let tituloAnterior = '';

function actualizar() {
  if (!raiz) return;
  const ahora = new Date();
  const e = estadoAtencion(ahora);
  const { minutos, fecha, dia } = ahoraEnBA(ahora);
  const hh = String(Math.floor(minutos / 60)).padStart(2, '0');
  const mm = String(minutos % 60).padStart(2, '0');
  const atiende = empresa.whatsapp.atiende;

  raiz.dataset.estado = e.abierto ? 'abierto' : 'cerrado';

  // Casilleros con la hora actual
  const digitos = (hh + mm).split('');
  $$('[data-dc-reloj] [data-d]').forEach((el) => {
    el.textContent = digitos[Number(el.dataset.d)];
  });
  const textoReloj = $('[data-dc-reloj-texto]');
  if (textoReloj) textoReloj.textContent = `Son las ${horaCorta(`${hh}:${mm}`, true)} en Buenos Aires.`;
  const rotulo = $('[data-dc-rotulo]');
  if (rotulo) rotulo.textContent = `Ahora en ${empresa.direccion.localidad}`;

  // Fechador (sello de fecha)
  const f = partesFecha(fecha);
  const fechador = $('[data-dc-fechador]');
  if (fechador) {
    fechador.hidden = false;
    $('[data-dc-sello-arriba]')!.textContent = e.abierto ? 'Atendiendo' : 'Cerrado';
    $('[data-dc-sello-fecha]')!.textContent = `${nombreDia(dia).slice(0, 3)} ${f.dia} ${f.mes} ${f.anio}`;
    $('[data-dc-sello-abajo]')!.textContent = e.abierto ? `Contesta ${atiende}` : `Abre ${horaCorta(horario.abre, true)}`;
  }

  // Textos de estado (solo se reescriben si cambian, para no repetir el aviso del lector de pantalla)
  const titulo = $('[data-dc-titulo]');
  const nuevoTitulo = e.abierto ? `${e.titulo}: ${e.detalle}.` : `${e.titulo}.`;
  if (titulo && nuevoTitulo !== tituloAnterior) {
    titulo.textContent = nuevoTitulo;
    tituloAnterior = nuevoTitulo;
    const detalle = $('[data-dc-detalle]');
    if (detalle) {
      detalle.textContent = e.abierto
        ? `Del otro lado está ${atiende}.`
        : `Dejanos tu mensaje: ${atiende} te contesta a primera hora.`;
    }
  }
  const cuenta = $('[data-dc-cuenta]');
  if (cuenta) {
    if (e.abierto && e.minutosParaCerrar !== undefined) {
      cuenta.textContent = `Cerramos a las ${horaCorta(horario.cierra)} · faltan ${duracion(e.minutosParaCerrar)}`;
    } else {
      const falta = minutosParaAbrir(ahora);
      cuenta.textContent = falta !== null && falta < 24 * 60 ? `Faltan ${duracion(falta)} para las ${horaCorta(horario.abre, true)}` : '';
    }
  }

  // Marca "ahora" en la franja de 24 h
  const marca = $('[data-dc-ahora]');
  if (marca) {
    marca.hidden = false;
    marca.style.left = `${posicionEnDia(minutos)}%`;
  }

  // Botones
  const ctaTexto = e.abierto ? `Escribile a ${atiende} por WhatsApp` : `Dejale tu mensaje a ${atiende}`;
  $$('[data-dc-cta-texto]').forEach((el) => (el.textContent = ctaTexto));
  $$('[data-dc-flotante-detalle]').forEach(
    (el) =>
      (el.textContent = e.abierto ? `${atiende} contesta en minutos` : `${atiende} contesta desde las ${horaCorta(horario.abre, true)}`),
  );

  // Columna de hoy en la hoja de ruta
  $$('[data-dc-dia]').forEach((el) => el.classList.toggle('es-hoy', el.dataset.dcDia === dia));
}

actualizar();
setInterval(actualizar, 20_000);

// En el celular, el botón flotante aparece solo cuando no se ve otro botón de WhatsApp
// (el de la cabecera o el grande del tablero): así nunca tapa el reloj al entrar.
const flotante = $('.dc-flotante');
const otros = $$('[data-dc-wa-cabecera], [data-dc-cta]');
if (flotante && otros.length && 'IntersectionObserver' in window) {
  const visibles = new Set<Element>();
  flotante.classList.add('esta-oculto');
  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      flotante.classList.toggle('esta-oculto', visibles.size > 0);
    },
    { threshold: 0.5 },
  );
  otros.forEach((el) => io.observe(el));
}
document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && actualizar());
