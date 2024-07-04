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
                <p>Nombre: ${userData.nombre}</p>
                <p>Usuario: ${userData.nombreUsuario}<p>
                <p>Email: ${userData.email}</p>
            `;
        } else {
            alert('Error al obtener los datos del usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    document.getElementById('edit-button').addEventListener('click', () => {
        document.getElementById('user-profile').style.display = 'none';
        document.getElementById('edit-profile').style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/usuarios/datos');
        if (response.ok) {
            const userData = await response.json();
            document.getElementById('biografia-input').value = userData.biografia || '';
        } else {
            console.error('No autenticado');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    const biografiaForm = document.getElementById('biografia-form');
    const biografiaInput = document.getElementById('biografia-input');
    const eliminarBiografiaButton = document.getElementById('eliminar-biografia');

    biografiaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const biografia = biografiaInput.value;
        try {
            const response = await fetch('/usuarios/biografia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ biografia })
            });

            if (response.ok) {
                alert('Biografía actualizada');
            } else {
                alert('Error al actualizar la biografía');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    eliminarBiografiaButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/usuarios/biografia', {
                method: 'DELETE'
            });

            if (response.ok) {
                biografiaInput.value = '';
                alert('Biografía eliminada');
            } else {
                alert('Error al eliminar la biografía');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
