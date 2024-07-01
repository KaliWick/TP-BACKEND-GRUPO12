//CODIGO NUEVO
const apiKey = '27a1abbc';

let getMovies = async () => {
  const popularMoviesTitles = [
    'Avengers Endgame',
    'Inside out 2',
    'Joker',
    'The Dark Knight',
    'Flash',
    'VENOM',
    'Bad boys: ride or die',
    'Kung fu panda 4',
    'Dune',
    'Fight Club',
    'Guardians of the Galaxy Vol. 3',
    'Interstellar',
    'Avatar',
    'when evil lurks',
    'Minions',
    'Back to the Future',
    '¡Shazam!',
    'Justice League',
    'Drive',
    'Barbie',
    'megamind',
    'Frozen',
    'logan',
    'Suicide squad',
    'the super mario bros movie',
    'fast X',
    'Toy Story',
    'Madame web',
    'Madagascar',
    'Deadpool',
    'Blade Runner 2049',
    'The Fast and the Furious',
    'Iron man 2',
    'Mad Max',
    'Bad boys for life',
    'captain marvel',
    'Godzilla Minus One',
    'Haikyu',
    'coco'
  ];
  
  const allMovies = [];
  const moviesByGenre = {};

  try {
    // Crea un vector de promesas
    const searchPromises = popularMoviesTitles.map(title => {
      let apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;
      return fetch(apiUrl).then(response => response.json());
    });


    const searchResults = await Promise.all(searchPromises);

    // Crea un vector de promesas para obtener los detalles de las peliculas
    const detailsPromises = searchResults.map(data => {
      if (data.Response === 'True' && data.Search.length > 0) {
        let movie = data.Search[0]; //selecciona el primer elemento del vector (la primer pelicula que aparece con ese titulo)
        let detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;
        return fetch(detailsUrl).then(response => response.json());
      } else {
        return Promise.resolve(null);
      }
    });

    // Esperar a que todas las solicitudes de detalles se completen
    const detailsResults = await Promise.all(detailsPromises);

    // Procesar los resultados de los detalles
    detailsResults.forEach(detailsData => {
      if (detailsData && detailsData.Response === 'True') {
        let genres = detailsData.Genre.split(', ');
        genres.forEach(genre => {
          if (!moviesByGenre[genre]) {
            moviesByGenre[genre] = [];
          }
          moviesByGenre[genre].push(detailsData);
        });
      }
    });

    mostrarPeliculas(moviesByGenre); // Llamar a mostrarPeliculas después de completar el procesamiento

  } catch (error) {
    console.error('ERROR:', error);
  }
};

const mostrarPeliculas = (moviesByGenre) => {
    const contenedorPeliculas = document.querySelector('.contenedorPeliculas');
    contenedorPeliculas.innerHTML = '';
  
    for (const genre in moviesByGenre) {
      const genreSection = document.createElement('div');
      genreSection.className = 'genre-section';
      genreSection.innerHTML = `<h3 id="genreTitle">${genre}</h3>`

      const genreContainer = document.createElement('div');
      genreContainer.className = 'genre-container';
  
      moviesByGenre[genre].forEach(pelicula => {
        const peliculaElement = document.createElement('div');
        peliculaElement.className = 'pelicula';
        peliculaElement.innerHTML = `
          <h3 class="pelicula-title">${pelicula.Title}</h3>
          <img src="${pelicula.Poster}" alt="${pelicula.Title}">
        `;
        genreContainer.appendChild(peliculaElement);
      });
  
      genreSection.appendChild(genreContainer);
      contenedorPeliculas.appendChild(genreSection);
    }
  };
  
  getMovies();


