/* DPI — Productos Individuales SRL
   JS sin dependencias: menú mobile, estado del header, resaltado de sección
   activa, animaciones de aparición, CTA de lista de precios, WhatsApp,
   aviso del formulario (Formspree) y año del footer.

   ============================================================
   CONFIGURACIÓN EDITABLE — editar solo este bloque
   ============================================================ */

/* LISTA DE PRECIOS
   Pegar acá la URL pública del PDF mensual o de la carpeta de Google Drive
   (ej.: "https://drive.google.com/drive/folders/XXXX").
   - Con URL cargada: los botones pasan a decir "Ver lista de precios
     actualizada" y abren el link en una pestaña nueva.
   - Sin URL (valor ""): los botones dicen "Solicitar lista de precios"
     y llevan al formulario de contacto. */
var PRICE_LIST_URL = "";

/* WHATSAPP
   Reemplazar por el número real en formato internacional, sin "+",
   espacios ni guiones (ej.: "5491155555555").
   Mientras el número contenga "X", los botones de WhatsApp quedan ocultos. */
var WHATSAPP_NUMBER = "54911XXXXXXXX";

/* Mensaje prearmado que se abre en WhatsApp (editable). */
var WHATSAPP_MESSAGE =
  "Hola, quiero consultar por productos en porciones individuales para mi empresa.";

/* ============================================================
   FIN DE LA CONFIGURACIÓN — no hace falta editar debajo
   ============================================================ */

(function () {
  "use strict";

  /* La clase "js" habilita los estilos que dependen de JavaScript
     (p. ej. ocultar elementos antes de animarlos). Sin JS, todo es visible. */
  document.documentElement.classList.add("js");

  var prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- MENÚ MOBILE ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!navMenu.classList.contains("is-open")) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
      );
    });

    // Cierra el menú al elegir una sección
    navMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    // Cierra con Escape (y devuelve el foco al botón) o al tocar fuera
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (
        navMenu.classList.contains("is-open") &&
        !event.target.closest(".main-nav")
      ) {
        closeMenu();
      }
    });
  }

  /* ---------- SOMBRA DEL HEADER AL HACER SCROLL ---------- */
  var header = document.querySelector(".site-header");

  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  /* ---------- SECCIÓN ACTIVA EN LA NAVEGACIÓN ---------- */
  var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]:not(.nav-cta)');

  if ("IntersectionObserver" in window && navLinks.length) {
    var linkById = {};
    navLinks.forEach(function (link) {
      linkById[link.getAttribute("href").slice(1)] = link;
    });

    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.remove("is-active");
          });
          var active = linkById[entry.target.id];
          if (active) active.classList.add("is-active");
        });
      },
      // Banda central de la pantalla: la sección que la cruza es la activa
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    document.querySelectorAll("main section[id]").forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ---------- APARICIÓN DE ELEMENTOS AL HACER SCROLL ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- CTA DE LISTA DE PRECIOS ----------
     Los botones con [data-price-list] cambian según PRICE_LIST_URL
     (ver CONFIGURACIÓN EDITABLE al inicio del archivo). */
  var priceLinks = document.querySelectorAll("[data-price-list]");

  priceLinks.forEach(function (link) {
    var label = link.querySelector("[data-price-list-label]");

    if (PRICE_LIST_URL) {
      link.href = PRICE_LIST_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      if (label) label.textContent = "Ver lista de precios actualizada";
    } else {
      // Sin URL: el botón lleva al formulario y deja preseleccionado
      // "Lista de precios" en el campo de productos de interés.
      link.addEventListener("click", function () {
        var interes = document.getElementById("field-interes");
        if (interes) interes.value = "Lista de precios";
      });
    }
  });

  /* ---------- WHATSAPP ----------
     Los botones con [data-whatsapp] permanecen ocultos hasta que
     WHATSAPP_NUMBER tenga un número válido (solo dígitos). */
  var whatsappReady = /^[0-9]{10,15}$/.test(WHATSAPP_NUMBER);

  if (whatsappReady) {
    var whatsappHref =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(WHATSAPP_MESSAGE);

    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      link.href = whatsappHref;
      link.hidden = false;
    });
  }

  /* ---------- FORMULARIO (Formspree) ----------
     El formulario hace POST directo a Formspree con validación HTML nativa;
     no necesita JavaScript. Este bloque solo evita envíos mientras el
     action siga con el placeholder REEMPLAZAR_ENDPOINT y, en ese caso,
     muestra los datos de contacto alternativos. Una vez configurado el
     endpoint real, deja de intervenir automáticamente. */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      if (form.action.indexOf("REEMPLAZAR_ENDPOINT") === -1) return;

      event.preventDefault();
      status.textContent =
        "El formulario todavía no está habilitado. " +
        "Mientras tanto, llamanos al (011) 4730-4423 o escribinos a ventas@dpi-arg.com.ar.";
      status.className = "form-status is-error";
    });
  }

  /* ---------- AÑO DEL FOOTER ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
