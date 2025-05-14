/**
 * ANIMATIONS.JS
 * Contiene funciones relacionadas con animaciones y efectos visuales
 */

// Efecto de escritura para el texto dinámico
function initTypeWriter() {
    const dynamicTextElement = document.querySelector('.dynamic-text');
    const phrases = [
        'Back-end Dev',
        'AI Engineer',
        'Python Fan-Boy',
        'Diseñador de Bases de Datos',
        'Desarrollador de APIs'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Borrando caracteres
            dynamicTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Más rápido al borrar
        } else {
            // Escribiendo caracteres
            dynamicTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Más lento al escribir
        }
        
        // Si terminamos de escribir la frase completa
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pausa al final de la escritura
            isDeleting = true;
            typingSpeed = 1500; // Pausa antes de empezar a borrar
        } 
        // Si terminamos de borrar la frase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Siguiente frase
            typingSpeed = 500; // Pausa antes de escribir nueva frase
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Iniciar el efecto de escritura
    setTimeout(typeEffect, 1000);
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const navbar = document.querySelector('.navbar');
    
    // Cambiar estilo de la barra de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo en la navegación según la sección visible
        updateActiveNavLink();
    });
    
    // Actualizar enlace activo en la navegación
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Cursor eléctrico que sigue al mouse
function initElectricCursor() {
    const cursor = document.querySelector('.electric-cursor');
    
    if (cursor) {
        // Mostrar cursor eléctrico solo en dispositivos de escritorio
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
                
                // Mostrar cursor con retraso para efecto suave
                if (cursor.style.opacity === '0') {
                    setTimeout(() => {
                        cursor.style.opacity = '1';
                    }, 300);
                }
            });
            
            // Efecto de pulsación al hacer clic
            document.addEventListener('mousedown', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
            });
            
            document.addEventListener('mouseup', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
            
            // Ocultar cursor cuando sale de la ventana
            document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
            });
            
            // Mostrar cursor cuando entra a la ventana
            document.addEventListener('mouseenter', () => {
                cursor.style.opacity = '1';
            });
        }
    }
}

// Animación de aparición de elementos al hacer scroll
function initScrollAppearance() {
    // Elementos que aparecerán con animación
    const animatedElements = [
        ...document.querySelectorAll('.skill-item'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.stat'),
        ...document.querySelectorAll('.about-text p'),
        ...document.querySelectorAll('.section-title')
    ];
    
    // Añadir clase inicial a todos los elementos
    animatedElements.forEach(element => {
        element.classList.add('to-animate');
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Función para animar elementos visibles
    function animateOnScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && element.classList.contains('to-animate')) {
                element.classList.remove('to-animate');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Ejecutar al cargar la página y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Ejecutar una vez al cargar para elementos ya visibles
    setTimeout(animateOnScroll, 300);
}

// Animación para las barras de progreso de habilidades
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Establecer el ancho de cada barra según el valor en el estilo inline
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});

// Inicializar el carrusel de marcas
function initBrandCarousel() {
    const partnersTrack = document.querySelector('.partners-track');
    
    if (!partnersTrack) return;
    
    // Pausar la animación al pasar el mouse sobre el carrusel
    partnersTrack.addEventListener('mouseenter', () => {
        partnersTrack.style.animationPlayState = 'paused';
    });
    
    partnersTrack.addEventListener('mouseleave', () => {
        partnersTrack.style.animationPlayState = 'running';
    });
    
    // Hacer que el carrusel sea responsive
    window.addEventListener('resize', () => {
        // Reiniciar animación
        partnersTrack.style.animation = 'none';
        setTimeout(() => {
            partnersTrack.style.animation = 'scrollPartners 30s linear infinite';
        }, 10);
    });
}
