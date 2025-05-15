/**
 * MAIN.JS
 * Archivo principal que inicializa todos los módulos
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initTypeWriter();
    initScrollAnimations();
    initProjectFilters();
    initMobileMenu();
    initContactForm();
    initScrollAppearance();
    initElectricCursor();

    initBrandCarousel();
    initExpandableCards();
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Ajuste para la barra de navegación
                behavior: 'smooth'
            });
        }
    });
});
