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
    initProjectPopovers(); // Inicializar los popovers de proyectos
    initBrandCarousel(); // Inicializar el carrusel de marcas
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

// Inicializar los popovers de proyectos
function initProjectPopovers() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectPopover = document.getElementById('project-popover');
    const popoverClose = document.querySelector('.popover-close');
    const popoverContent = document.querySelector('.popover-content');
    
    // Cerrar popover al hacer clic en el botón de cierre
    if (popoverClose) {
        popoverClose.addEventListener('click', () => {
            closePopover();
        });
    }
    
    // Cerrar popover al hacer clic fuera del contenido
    if (projectPopover) {
        projectPopover.addEventListener('click', (e) => {
            if (e.target === projectPopover) {
                closePopover();
            }
        });
        
        // Cerrar popover con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectPopover.classList.contains('active')) {
                closePopover();
            }
        });
    }
    
    // Abrir popover al hacer clic en una tarjeta de proyecto
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Obtener datos del proyecto
            const projectTitle = card.querySelector('h3').textContent;
            const projectDescription = card.querySelector('p').textContent;
            
            // Obtener imagen del proyecto (puede ser un placeholder o una imagen real)
            let projectImage;
            if (card.querySelector('.project-image img')) {
                projectImage = card.querySelector('.project-image img').src;
            } else {
                // Si no hay imagen, usar un icono como placeholder
                const iconClass = card.querySelector('.image-placeholder i').className;
                projectImage = null;
                // Podríamos crear una imagen de placeholder basada en el icono si fuera necesario
            }
            
            // Obtener tecnologías
            const techElements = card.querySelectorAll('.project-tech span');
            const techHTML = Array.from(techElements).map(tech => 
                `<span>${tech.textContent}</span>`
            ).join('');
            
            // Obtener enlaces
            const linkElements = card.querySelectorAll('.project-links a');
            const linksHTML = Array.from(linkElements).map(link => 
                `<a href="${link.href}" class="project-link" target="_blank">${link.innerHTML}</a>`
            ).join('');
            
            // Actualizar contenido del popover
            document.querySelector('.popover-title').textContent = projectTitle;
            document.querySelector('.popover-description').textContent = projectDescription;
            document.querySelector('.popover-tech').innerHTML = techHTML;
            document.querySelector('.popover-links').innerHTML = linksHTML;
            
            // Actualizar imagen
            const popoverImg = document.querySelector('.popover-image img');
            if (projectImage) {
                popoverImg.src = projectImage;
                popoverImg.style.display = 'block';
                document.querySelector('.popover-image').style.display = 'block';
            } else {
                // Si no hay imagen, mostrar un placeholder con el icono
                document.querySelector('.popover-image').style.display = 'none';
            }
            
            // Mostrar popover con animación
            openPopover();
        });
    });
    
    // Función para abrir el popover
    function openPopover() {
        if (projectPopover) {
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
            
            // Mostrar popover
            projectPopover.classList.add('active');
            
            // Animar contenido después de un pequeño retraso
            setTimeout(() => {
                popoverContent.style.opacity = '1';
                popoverContent.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }
    }
    
    // Función para cerrar el popover
    function closePopover() {
        if (projectPopover) {
            // Animar salida del contenido
            popoverContent.style.opacity = '0';
            popoverContent.style.transform = 'translateY(30px) scale(0.95)';
            
            // Ocultar popover después de la animación
            setTimeout(() => {
                projectPopover.classList.remove('active');
                // Restaurar scroll del body
                document.body.style.overflow = '';
            }, 300);
        }
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
    const formAlert = document.getElementById('form-alert');
    
    if (contactForm) {
        // Manejar el envío del formulario
        contactForm.addEventListener('submit', (e) => {
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validación básica
            if (!name || !email || !subject || !message) {
                e.preventDefault(); // Prevenir envío solo si hay errores
                showFormMessage('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault(); // Prevenir envío solo si hay errores
                showFormMessage('Por favor, introduce un email válido', 'error');
                return;
            }
            
            // Si pasa todas las validaciones, interceptamos el envío para mostrar la alerta
            e.preventDefault();
            
            // Crear un objeto FormData con los datos del formulario
            const formData = new FormData(contactForm);
            
            // Enviar los datos usando fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Mostrar alerta de éxito
                showAlert();
                
                // Resetear el formulario
                contactForm.reset();
            })
            .catch(error => {
                // Mostrar mensaje de error
                showFormMessage('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            });
        });
    }
    
    // Función para mostrar la alerta temporal
    function showAlert() {
        if (formAlert) {
            // Mostrar la alerta
            formAlert.classList.add('show');
            
            // Ocultar la alerta después de 2 segundos
            setTimeout(() => {
                formAlert.classList.remove('show');
            }, 2000);
        }
    }
    
    // Mostrar mensaje de error
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
