document.addEventListener('DOMContentLoaded', () => {

    const crearUsuarioForm = document.getElementById("crearUsuarioForm");

    crearUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validateForm(e)) {
            const formData = new FormData(crearUsuarioForm);
            const data =
            {
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                email: formData.get('email'),
                nombreUsuario: formData.get('nombreUsuario'),
                contrasenia: formData.get('contrasenia')
            };
            try {
                const response = await fetch('/registro/crear_usuario', {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud')
                }
                const result = await response.json();

                alert("¡Usuario registrado con exito!");
                crearUsuarioForm.reset();
                window.location.href = '/';
            } catch (error) {
                console.log('Error:', error);
                alert('Hubo un error al crear el usuario');
            }
        }
    });
});

function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(event) {

    //inputs
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let contrasenia = document.getElementById("contrasenia").value;
    let anios = document.getElementById("mayorEdad").checked;
    let terminos = document.getElementById("terminos").checked;

    if (nombre.trim() === "") {
        alert("Por favor ingrese un nombre");
        return false;
    }

    if (apellido.trim() === "") {
        alert("Por favor ingrese un apellido");
        return false;
    }

    if (email.trim() === "") {
        alert("Por favor ingrese un mail");
        return false;
    }

    if (nombreUsuario.trim() === "") {
        alert("Por favor ingrese un mail");
        return false;
    }

    if (contrasenia.trim() === "") {
        alert("Por favor ingrese una contraseña")
        return false;
    }

    if (!anios) {
        alert("Por favor confirme que es mayor de edad");
        return false;
    }

    if (!terminos) {
        alert("Por favor acepte los términos y condiciones");
        return false;
    }

    if (!isValidEmail(email)) {
        alert("Por favor ingrese un MAIL VALIDO");
        return false;
    }
    return true;
}

