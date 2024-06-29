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
  
  const moviesByGenre = {};

  try {
    for (const title of popularMoviesTitles) {
      let apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;
      let response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`ERROR EN EL CONSUMO DE LA API: ${response.status}`);
      }

      let data = await response.json();

      if (data.Response === 'True') {
        let movie = data.Search[0];
        let detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;
        let detailsResponse = await fetch(detailsUrl);
        let detailsData = await detailsResponse.json();

        if (detailsData.Response === 'True') {
          let genres = detailsData.Genre.split(', ');
          genres.forEach(genre => {
            if (!moviesByGenre[genre]) {
              moviesByGenre[genre] = [];
            }
            moviesByGenre[genre].push(detailsData);
          });
        }
      } else {
        console.error(`No se encontraron películas para "${title}"`);
      }
    }

    mostrarPeliculas(moviesByGenre); // Llamar a mostrarPeliculas después de completar el bucle

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
          <h3>${pelicula.Title}</h3>
          <img src="${pelicula.Poster}" alt="${pelicula.Title}">
        `;
        genreContainer.appendChild(peliculaElement);
      });
  
      genreSection.appendChild(genreContainer);
      contenedorPeliculas.appendChild(genreSection);
    }
  };
  
  getMovies();


