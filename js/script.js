const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Menú Móvil: Abrir/Cerrar
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Cambiar icono de hamburguesa a X (opcional)
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Efecto Navbar al hacer Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- ANIMACIONES AL SCROLLEAR (Scroll Reveal) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se activa cuando el 15% del elemento es visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Agrega la clase que lo hace aparecer
            observer.unobserve(entry.target); // Deja de observar (se anima una sola vez)
        }
    });
}, observerOptions);

// Seleccionamos todos los elementos con la clase 'reveal'
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});