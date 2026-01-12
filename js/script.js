const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");

// Menú Móvil
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Cerrar menú al hacer click en un enlace (y hacer scroll suave)
document.querySelectorAll(".nav-menu li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Cierra el menú móvil
    navMenu.classList.remove("active");
    const icon = hamburger.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");

    // --- SMOOTH SCROLL CON OFFSET (NUEVO) ---
    // Prevenir el comportamiento por defecto del enlace
    e.preventDefault();

    // Obtener el ID de la sección destino (ej: "#servicios")
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Calcular la posición restando la altura del navbar (aprox 70-80px)
      // Ajusta el valor 80 según la altura real de tu navbar
      const headerOffset = 80;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Efecto Navbar al hacer Scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// --- ANIMACIONES SCROLL REVEAL ---
const revealElements = document.querySelectorAll(".reveal");

const revealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach((el) => revealObserver.observe(el));

// --- WHATSAPP DUAL MÓVIL ---
const waMain = document.querySelector(".whatsapp-main");
const waContainer = document.querySelector(".whatsapp-container");

if (waMain) {
  waMain.addEventListener("click", (e) => {
    // Quitamos la restricción de ancho de pantalla.
    // Ahora el click funciona en PC y en Celular.

    e.preventDefault();
    e.stopPropagation(); // Evita que el click pase al documento y se cierre inmediatamente

    // INTERRUPTOR:
    // En PC: Si hacés click, se fija el menú. Si volvés a hacer click, se "desfija".
    // En Móvil: Abre/Cierra.
    waContainer.classList.toggle("active-mobile");
  });
}

// Cerrar menú al tocar en cualquier otro lado de la pantalla
document.addEventListener("click", (e) => {
  // Si el menú está abierto Y el click NO fue dentro del contenedor...
  if (
    waContainer &&
    waContainer.classList.contains("active-mobile") &&
    !waContainer.contains(e.target)
  ) {
    waContainer.classList.remove("active-mobile");
  }
});

// --- VALIDACIÓN DE FORMULARIO ---
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Prevenir el envío automático
    e.preventDefault();

    let isValid = true;

    // Obtener campos
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    // Funciones de ayuda
    const setError = (element, messageText) => {
      const errorDisplay = element.nextElementSibling; // El span .error-message
      errorDisplay.innerText = messageText;
      errorDisplay.classList.add("active");
      element.classList.add("input-error");
      isValid = false;
    };

    const clearError = (element) => {
      const errorDisplay = element.nextElementSibling;
      errorDisplay.innerText = "";
      errorDisplay.classList.remove("active");
      element.classList.remove("input-error");
    };

    // 1. Validar Nombre
    if (name.value.trim() === "") {
      setError(name, "Por favor, ingrese su nombre completo.");
    } else {
      clearError(name);
    }

    // 2. Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setError(email, "Ingrese un email válido (ej: nombre@gmail.com).");
    } else {
      clearError(email);
    }

    // 3. Validar Teléfono (Mínimo 8 números)
    const phoneRegex = /^[0-9\-\+\s]{8,}$/;
    if (!phoneRegex.test(phone.value.trim())) {
      setError(phone, "Ingrese un teléfono válido (mínimo 8 números).");
    } else {
      clearError(phone);
    }

    // 4. Validar Mensaje
    if (message.value.trim().length < 10) {
      setError(message, "El mensaje es muy corto. Cuéntenos más detalles.");
    } else {
      clearError(message);
    }

    // SI TODO ESTÁ BIEN -> ENVIAR
    if (isValid) {
      // Aquí enviamos el formulario a Formspree
      contactForm.submit();
      // Opcional: Mostrar un alert o spinner mientras se envía
    }
  });
}

// --- LIGHTBOX CON NAVEGACIÓN Y SWIPE ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const galleryImages = document.querySelectorAll(".gallery-item img");

let currentIndex = 0; // Para saber qué foto se está viendo

if (lightbox && galleryImages.length > 0) {
  // Función para mostrar imagen según el índice
  const showImage = (index) => {
    if (index >= galleryImages.length) {
      currentIndex = 0; // Vuelve al principio
    } else if (index < 0) {
      currentIndex = galleryImages.length - 1; // Va al final
    } else {
      currentIndex = index;
    }

    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  };

  // Abrir Lightbox al hacer click
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index; // Guardamos cuál se clickeó
      showImage(currentIndex);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Botones de Navegación
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que se cierre el lightbox al clickear la flecha
    showImage(currentIndex + 1);
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  // Cerrar Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      lightboxImg.src = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeLightbox);

  // Cerrar al clickear fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // 4. Navegación por Teclado
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  });

  // 5. SOPORTE TÁCTIL (SWIPE)
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  const handleSwipe = () => {
    const threshold = 50;
    // Deslizar a la izquierda (Siguiente)
    if (touchStartX - touchEndX > threshold) {
      showImage(currentIndex + 1);
    }
    // Deslizar a la derecha (Anterior)
    if (touchEndX - touchStartX > threshold) {
      showImage(currentIndex - 1);
    }
  };
}
