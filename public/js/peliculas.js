document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('imdbID');

    if (imdbID) {
        // Lógica para obtener detalles de la película
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
            } else {
                console.error('Error al obtener los detalles de la película:', movie.Error);
            }
        } catch (error) {
            console.error('Error al recuperar los detalles de la película:', error);
        }

        // Lógica para manejar comentarios
        const formComentario = document.getElementById('formComentario');
        formComentario.addEventListener('submit', async (event) => {
            event.preventDefault();
            const comentario = document.getElementById('comentarioTexto').value;

            try {
                const agregarComentarioResponse = await fetch(`/comentarios/${imdbID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comentario })
                });

                const agregarComentarioData = await agregarComentarioResponse.json();

                if (agregarComentarioData.success) {
                    alert('Comentario agregado correctamente');
                    // Puedes realizar alguna acción adicional después de agregar el comentario
                    window.location.reload(); // Por ejemplo, recargar la página para actualizar los comentarios
                } else {
                    console.error('Error al agregar comentario:', agregarComentarioData.error);
                }
            } catch (error) {
                console.error('Error al agregar comentario:', error);
            }
        });

    } else {
        console.error('No se proporcionó un ID de película válido.');
    }
});
