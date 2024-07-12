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
        alert('Datos del formulario: ' + JSON.stringify(data));
        try {
            const response = await fetch('https://tp-backend-grupo-12.vercel.app/inicioSesion/iniciar_sesion', {
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
            alert('Resultado del inicio de sesión: ' + JSON.stringify(result));

            if (result.success) {
                alert('Inicio de sesión exitoso, redirigiendo...');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al iniciar sesión');
        }
    }
    });
});

function validateForm(event) {
    //inputs
    let email = document.getElementById("email").value;
    let contrasenia = document.getElementById("contrasenia").value;

    if (email.trim() === "") {
        alert("Por favor ingrese un mail");
        return false;
    }
    if (contrasenia.trim() === "") {
        alert("Por favor ingrese una contraseña")
        return false;
    }
    return true;
}

