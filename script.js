/* DPI — Productos Individuales SRL
   JS sin dependencias: menú mobile, estado del header, resaltado de sección
   activa, animaciones de aparición, formulario por mailto y año del footer. */

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

  /* ---------- FORMULARIO ----------
     Sin backend: arma un mailto: con los datos cargados y abre la aplicación
     de correo del visitante. La casilla destino se lee del atributo
     data-email del <form> (PENDIENTE: confirmar la dirección real).
     Si se conecta Formspree u otro servicio (ver comentario en index.html),
     eliminar este bloque para que el formulario haga POST normalmente. */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    var setInvalid = function (field, invalid) {
      field.setAttribute("aria-invalid", invalid ? "true" : "false");
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nameField = form.elements.nombre;
      var emailField = form.elements.email;
      var phoneField = form.elements.telefono;
      var messageField = form.elements.mensaje;

      var name = nameField.value.trim();
      var email = emailField.value.trim();
      var phone = phoneField.value.trim();
      var message = messageField.value.trim();

      // Validación con mensajes propios (el form usa novalidate)
      var firstInvalid = null;

      setInvalid(nameField, !name);
      if (!name) firstInvalid = firstInvalid || nameField;

      var emailOk = email !== "" && emailField.checkValidity();
      setInvalid(emailField, !emailOk);
      if (!emailOk) firstInvalid = firstInvalid || emailField;

      setInvalid(messageField, !message);
      if (!message) firstInvalid = firstInvalid || messageField;

      if (firstInvalid) {
        status.textContent =
          email && !emailOk
            ? "Revise el email ingresado: no parece válido."
            : "Por favor, complete los campos obligatorios.";
        status.className = "form-status is-error";
        firstInvalid.focus();
        return;
      }

      var recipient = form.dataset.email;
      var subject = "Consulta desde la web — " + name;
      var body =
        "Nombre / Empresa: " + name + "\n" +
        "Email: " + email + "\n" +
        (phone ? "Teléfono: " + phone + "\n" : "") +
        "\nMensaje:\n" + message;

      window.location.href =
        "mailto:" + recipient +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.textContent =
        "Se abrirá su aplicación de correo con el mensaje listo. " +
        "Si no se abre, escríbanos a " + recipient + ".";
      status.className = "form-status is-success";
    });
  }

  /* ---------- AÑO DEL FOOTER ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
