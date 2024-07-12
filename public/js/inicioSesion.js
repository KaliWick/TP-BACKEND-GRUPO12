/*document.addEventListener('DOMContentLoaded', () => {
    const inicioSesionForm = document.getElementById("inicioSesionForm");

    inicioSesionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validateForm(e)) {
        const formData = new FormData(inicioSesionForm);
        const data = {
            email: formData.get('email'),
            password: formData.get('contrasenia')
        };
        //ya esta comprobado que trae los datos de forma correcta
        try {
            const response = await fetch('/inicioSesion/iniciarSesion', {
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
            console.log('Resultado del inicio de sesión:', result);

            if (result.success) {
                
                console.log('Inicio de sesión exitoso, redirigiendo...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 800); 
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
}*/

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

            try {
                const response = await fetch('/inicioSesion/iniciarSesion', {
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
                console.log('Resultado del inicio de sesión:', result);

                if (result.success) {
                    // Guardar sesión en sessionStorage
                    sessionStorage.setItem('userSession', JSON.stringify(result.user));

                    // Redirigir a la página principal u otra página
                    window.location.href = '/';
                } else {
                    alert('Inicio de sesión fallido');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al iniciar sesión');
            }
        }
    });
});

function validateForm(event) {
    // Validación de formulario
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

