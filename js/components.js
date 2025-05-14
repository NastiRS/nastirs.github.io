/**
 * COMPONENTS.JS
 * Contiene funciones relacionadas con componentes interactivos
 */

// Inicializar las tarjetas expandibles
function initExpandableCards() {
    const expandableCards = document.querySelectorAll('.skill-item.expandable');
    
    expandableCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Prevenir que el evento se propague a otros elementos
            event.stopPropagation();
            
            // Cerrar todas las demás tarjetas expandidas
            expandableCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle la clase expanded para mostrar/ocultar la lista
            card.classList.toggle('expanded');
            
            // Si la tarjeta está expandida, hacer scroll para mostrar todo el contenido
            if (card.classList.contains('expanded')) {
                setTimeout(() => {
                    const cardRect = card.getBoundingClientRect();
                    // Si la tarjeta está parcialmente fuera de la vista, hacer scroll
                    if (cardRect.bottom > window.innerHeight) {
                        window.scrollBy({
                            top: Math.min(cardRect.bottom - window.innerHeight + 50, 200),
                            behavior: 'smooth'
                        });
                    }
                }, 300); // Esperar a que la animación de expansión comience
            }
        });
    });
    
    // Cerrar tarjetas expandidas al hacer clic en cualquier otro lugar
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.skill-item.expandable')) {
            expandableCards.forEach(card => {
                card.classList.remove('expanded');
            });
        }
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
            
            // Buscar descripción completa si existe, de lo contrario usar la descripción corta
            let projectDescription = '';
            const fullDescriptionDiv = card.querySelector('.project-description-full');
            if (fullDescriptionDiv) {
                projectDescription = fullDescriptionDiv.innerHTML;
            } else {
                projectDescription = card.querySelector('p').textContent;
            }
            
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
            document.querySelector('.popover-description').innerHTML = projectDescription;
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
