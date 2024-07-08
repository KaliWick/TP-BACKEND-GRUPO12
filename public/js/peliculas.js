document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('imdbID');
  
    if (!imdbID) {
      console.error('No se proporcionó un ID de película.');
      return;
    }
  
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
  });