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