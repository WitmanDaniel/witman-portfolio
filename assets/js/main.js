// Inicializar EmailJS
(function() {
    emailjs.init("4kFHjh-lfAR372FYt"); // Reemplaza con tu Public Key de EmailJS
})();

// Función para descargar el CV
document.getElementById('downloadCV').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Ruta a tu archivo CV
    const cvPath = 'pdf/Witman_CV.pdf';
    
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Witman_CV.pdf'; // Nombre del archivo al descargar
    
    // Añadir el enlace al documento
    document.body.appendChild(link);
    
    // Simular clic en el enlace
    link.click();
    
    // Limpiar
    document.body.removeChild(link);
});

// Función para crear y mostrar el modal de email
function showEmailModal() {
    const modal = document.createElement('div');
    modal.className = 'email-modal';
    modal.innerHTML = `
        <div class="email-modal-content">
            <span class="close-modal">&times;</span>
            <h3>Enviar Email</h3>
            <form id="quickEmailForm">
                <div class="form-group">
                    <label for="quickName">Nombre</label>
                    <input type="text" id="quickName" required>
                </div>
                <div class="form-group">
                    <label for="quickEmail">Tu Email</label>
                    <input type="email" id="quickEmail" required>
                </div>
                <div class="form-group">
                    <label for="quickMessage">Mensaje</label>
                    <textarea id="quickMessage" rows="4" required></textarea>
                </div>
                <button type="submit" class="submit-btn">
                    <i class="fa-solid fa-paper-plane"></i>
                    Enviar
                </button>
            </form>
        </div>
    `;

    // Añadir el modal al documento
    document.body.appendChild(modal);

    // Mostrar el modal
    setTimeout(() => modal.classList.add('show'), 10);

    // Manejar el cierre del modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });

    // Manejar el envío del formulario rápido
    modal.querySelector('#quickEmailForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        const templateParams = {
            from_name: document.getElementById('quickName').value,
            from_email: document.getElementById('quickEmail').value,
            subject: 'Contacto desde Portfolio',
            message: document.getElementById('quickMessage').value
        };

        emailjs.send('service_0qld9vy', 'template_ga28kp5', templateParams)
            .then(function(response) {
                alert('¡Mensaje enviado con éxito!');
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            })
            .catch(function(error) {
                alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
                console.error('Error:', error);
            })
            .finally(function() {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Manejo del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Mostrar indicador de carga
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    // Obtener los valores del formulario
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Enviar el email
    emailjs.send('service_0qld9vy', 'template_ga28kp5', templateParams)
        .then(function(response) {
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado con éxito!');
            // Limpiar el formulario
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            // Mostrar mensaje de error
            alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
            console.error('Error:', error);
        })
        .finally(function() {
            // Restaurar el botón
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Manejo del botón de email en la navbar
document.getElementById('navEmail').addEventListener('click', function(e) {
    e.preventDefault();
    showEmailModal();
}); 