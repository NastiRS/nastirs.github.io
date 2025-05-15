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


