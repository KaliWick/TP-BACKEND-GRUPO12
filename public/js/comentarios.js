document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/usuarios/datos');
        if (response.ok) {
            const userData = await response.json();
            if (userData) {
                document.querySelectorAll(".form-oculto").forEach(form => {
                    form.classList.remove("form-oculto");
                });
            } 

        } else {
            const dejarComentario = document.getElementById('dejar-comentario');
                const loginMessage = document.createElement('p');
                loginMessage.innerHTML = 'Debes <a href="/inicioSesion">iniciar sesión</a> para dejar un comentario.';
                dejarComentario.appendChild(loginMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});