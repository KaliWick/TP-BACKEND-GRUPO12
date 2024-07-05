document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    
    logoutButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
            });
            if (response.ok) {
                window.location.href = '/html/index.html';
            } else {
                alert('Error al cerrar sesión 1 ');
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Error al cerrar sesión 2');
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/usuarios/datos');
        if (response.ok) {
            const userData = await response.json();
            document.getElementById('usuarioInfo').innerHTML = `
                <p><span class="span-datos">Nombre:</span> ${userData.nombre}</p>
                <p><span class="span-datos">Usuario:</span> ${userData.nombreUsuario}<p>
                <p><span class="span-datos">Email:</span> ${userData.email}</p>
            `;
        } else {
            alert('Error al obtener los datos del usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtener datos del usuario al cargar la página
        const response = await fetch('/usuarios/datos');
        if (response.ok) {
            const userData = await response.json();
            // Actualizar el valor del textarea con la biografía del usuario
            document.getElementById('biografia-input').value = userData.biografia || '';
        } else {
            console.error('No autenticado');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    const biografiaForm = document.getElementById('biografia-form');
    const biografiaInput = document.getElementById('biografia-input');

    biografiaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const biografia = biografiaInput.value;
        try {
            const response = await fetch('/usuarios/biografia', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ biografia })
            });

            if (response.ok) {
                alert('Biografía actualizada');
                // Actualizar la biografía en la sesión del usuario
                const userDataResponse = await fetch('/usuarios/datos');
                if (userDataResponse.ok) {
                    const userData = await userDataResponse.json();
                    document.getElementById('biografia-input').value = userData.biografia || '';
                } else {
                    console.error('No se pudo cargar la biografía actualizada');
                }
            } else {
                alert('Error al actualizar la biografía');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar la biografía');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const deleteBiografiaButton = document.getElementById('boton-eliminar-biografia');

    deleteBiografiaButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/usuarios/biografia', {
                method: 'DELETE',
            });
            const result = await response.json();
            if (response.ok && result.success) {
                alert(result.message);
                document.getElementById('biografia-input').value = '';
            } else {
                alert('Error al eliminar la biografía');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar la biografía');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('eliminarUsuario');
    
    deleteButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/usuarios/delete', {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Usuario eliminado con exito");
                window.location.href = '/html/index.html';
            } else {
                alert('Error al eliminar el usuario 1/2');
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Error al eliminar el usuario 2/2');
        }
    });
});