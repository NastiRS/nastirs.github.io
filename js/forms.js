/**
 * FORMS.JS
 * Contiene funciones relacionadas con el manejo de formularios
 */

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
