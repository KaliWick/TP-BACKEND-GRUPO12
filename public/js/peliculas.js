document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('imdbID');
  
    if (!imdbID) {
        console.error('No se proporcionó un ID de película.');
        return;
    }

    // Obtener detalles de la película desde la API
    try {
        const apiKey = '27a1abbc';
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
  
        const response = await fetch(apiUrl);
        const movie = await response.json();
  
        if (movie.Response === 'True') {
            document.getElementById('titulo').innerText = movie.Title;
            document.getElementById('poster').src = movie.Poster;
            document.getElementById('descripcion').innerText = `Descripción: ${movie.Plot}`;
            document.getElementById('genero').innerText = `Género: ${movie.Genre}`;
            document.getElementById('año').innerText = `Año: ${movie.Year}`;
            document.getElementById('duracion').innerText = `Duración: ${movie.Runtime}`;
            document.getElementById('director').innerHTML = `Director: ${movie.Director}`;
        } else {
            console.error('Error al obtener los detalles de la película:', movie.Error);
        }
    } catch (error) {
        console.error('Error al recuperar los detalles de la película:', error);
    }
    
    // Obtener comentarios de la película desde tu base de datos
    try {
        const comentariosResponse = await fetch(`/comentarios/${imdbID}`);
        const comentariosData = await comentariosResponse.json();
  
        if (comentariosData.comentarios) {
            const comentariosContainer = document.getElementById('comentarios-container');
            comentariosContainer.innerHTML = '';
  
            comentariosData.comentarios.forEach(comentario => {
                const comentarioElement = document.createElement('div');

                const fecha = new Date(comentario.fecha);
                const fechaFormateada = fecha.toLocaleDateString();

                comentarioElement.innerHTML = `
                    <p><strong>${comentario.nombreUsuario}</strong> (${fechaFormateada}): ${comentario.comentario}</p>
                `;
                comentariosContainer.appendChild(comentarioElement);
            });
        } else {
            console.error('Error al obtener los comentarios:', comentariosData.error);
        }
    } catch (error) {
        console.error('Error al recuperar los comentarios:', error);
    }
});

// Manejar la adición de comentarios
document.getElementById('formComentario').addEventListener('submit', async (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('imdbID');
    const comentario = document.getElementById('comentarioTexto').value;

    try {
        const agregarComentarioResponse = await fetch(`/comentarios/${imdbID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contenido: comentario })
        });

        const agregarComentarioData = await agregarComentarioResponse.json();

        if (agregarComentarioData.success) {
            alert('Comentario agregado correctamente');
            // Actualizar la lista de comentarios
            window.location.reload();
        } else {
            console.error('Error al agregar comentario:', agregarComentarioData.error);
        }
    } catch (error) {
        console.error('Error al agregar comentario:', error);
    }
});