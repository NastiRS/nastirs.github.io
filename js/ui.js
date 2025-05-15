/**
 * UI.JS
 * Contiene funciones relacionadas con la interfaz de usuario
 */

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Cambiar ícono del menú
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic en un enlace (en móvil)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Filtrado de proyectos
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase activa al botón clickeado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Inicializa el toast para el botón de light mode
function initLightModeToast() {
    const btn = document.getElementById('light-mode-btn');
    const toast = document.getElementById('lightmode-toast');
    if (!btn || !toast) return;

    btn.addEventListener('click', () => {
        // Mostrar el mensaje
        toast.style.display = 'block';
        toast.classList.add('show');
        btn.classList.add('pressed'); // Marcar el botón como pulsado

        // Ocultar después de 2.5 segundos
        const hideToast = () => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            // Esperar la duración de la animación de salida antes de ocultar el div
            setTimeout(() => {
                toast.style.display = 'none';
                toast.classList.remove('hide');
            }, 320);
            btn.classList.remove('pressed'); // Quitar el estado pulsado
            btn.blur(); // Quitar el foco para resetear el color
        };
        setTimeout(hideToast, 2500);

        // Si el usuario hace clic fuera del botón o toast, quitar el estado pulsado
        const handleClickOutside = (e) => {
            if (!btn.contains(e.target) && !toast.contains(e.target)) {
                hideToast();
                document.removeEventListener('mousedown', handleClickOutside);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
    });
}

// Inicialización global de UI
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initProjectFilters();
    initLightModeToast();
});
