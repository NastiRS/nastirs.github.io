// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initTypeWriter();
    initScrollAnimations();
    initProjectFilters();
    initMobileMenu();
    initContactForm();
    initScrollAppearance();
    initElectricCursor(); // Añadir inicialización del cursor eléctrico
});

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

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validación básica
            if (!name || !email || !subject || !message) {
                showFormMessage('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Por favor, introduce un email válido', 'error');
                return;
            }
            
            // Simulación de envío exitoso (aquí se conectaría con un backend real)
            showFormMessage('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
            contactForm.reset();
        });
    }
    
    // Mostrar mensaje de éxito o error
    function showFormMessage(message, type) {
        // Eliminar mensaje anterior si existe
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear nuevo mensaje
        const messageElement = document.createElement('div');
        messageElement.classList.add('form-message', type === 'success' ? 'success' : 'error');
        messageElement.textContent = message;
        
        // Insertar mensaje después del botón de envío
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.insertAdjacentElement('afterend', messageElement);
        
        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
    
    // Efecto de línea en los campos del formulario
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formLine = input.nextElementSibling;
            formLine.style.width = '100%';
        });
        
        input.addEventListener('blur', () => {
            const formLine = input.nextElementSibling;
            if (!input.value) {
                formLine.style.width = '0';
            }
        });
    });
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
