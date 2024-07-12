document.addEventListener('DOMContentLoaded', () => {
    const inicioSesionForm = document.getElementById("inicioSesionForm");

    inicioSesionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validateForm(e)) {
            const formData = new FormData(inicioSesionForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('contrasenia')
            };

            alert('Datos del formulario: ' + JSON.stringify(data)); // Muestra los datos del formulario

            try {
                const response = await fetch('/inicioSesion/iniciar_sesion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const result = await response.json();
                alert('Resultado del inicio de sesión: ' + JSON.stringify(result)); // Muestra el resultado del inicio de sesión

                if (result.success) {
                    alert('Inicio de sesión exitoso, redirigiendo...'); // Muestra mensaje de éxito
                    window.location.href = '/';
                } else {
                    alert('Inicio de sesión fallido: ' + result.error); // Muestra mensaje de error
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al iniciar sesión');
            }
        }
    });
});

function validateForm(event) {
    let email = document.getElementById("email").value;
    let contrasenia = document.getElementById("contrasenia").value;

    if (email.trim() === "") {
        alert("Por favor ingrese un correo");
        return false;
    }
    if (contrasenia.trim() === "") {
        alert("Por favor ingrese una contraseña");
        return false;
    }
    return true;
}
