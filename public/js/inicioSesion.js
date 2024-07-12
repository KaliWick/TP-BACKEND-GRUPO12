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

            console.log('Datos del formulario:', data); // Verifica que los datos se estén capturando correctamente

            try {
                const response = await fetch('/inicioSesion/inicioSesion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                console.log('Respuesta del servidor:', response); // Verifica la respuesta del servidor

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const result = await response.json();
                console.log('Resultado del inicio de sesión:', result); // Verifica el resultado del inicio de sesión

                if (result.success) {
                    console.log('Inicio de sesión exitoso, redirigiendo...'); // Verifica que se ejecuta la redirección
                    window.location.href = '/';
                } else {
                    console.log('Inicio de sesión fallido:', result.error); // Verifica si hay errores específicos del inicio de sesión
                    alert('Inicio de sesión fallido. Verifica tus credenciales.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al iniciar sesión');
            }
        }
    });
});

function validateForm(event) {
    // Validación básica del formulario
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
