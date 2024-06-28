const apiKey = '27a1abbc';

let getMovies = async () => {
  const popularMoviesTitles = [
    'Avengers Endgame',
    'Whiplash',
    'Joker',
    'The Dark Knight',
    'Flash',
    'The Revenant',
    'Mad Max: Fury Road',
    'Gladiator',
    'Pulp Fiction',
    'Fight Club',
    'Guardians of the Galaxy Vol. 3',
    'Interstellar',
    'Avatar',
    'The Godfather',
    'Minions',
    'Back to the Future',
    '¡Shazam!',
    'Justice League',
    'Drive',
    'Barbie',
    'Harry Potter',
    'Frozen',
    'Shutter island',
    'Suicide squad',
    'The Terminator',
    'Rocky',
    'Toy Story',
    'Rambo',
    'Madagascar',
    'Alien',
    'Blade Runner 2049',
    'Pirates of the Caribbean',
    'The Fast and the Furious',
    '2 fast 2 furious',
    'The Fast and the Furious: Tokyo Drift',
    'Mad Max',
    'Ghostbusters',
    'The Green Mile',
    'Godzilla Minus One',
    'Haikyu'
  ];

  const allMovies = [];

  try {
    for (const title of popularMoviesTitles) {
      let apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;
      let response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`ERROR EN EL CONSUMO DE LA API: ${response.status}`);
      }

      let data = await response.json();
      
      if (data.Response === 'True') {
        // Agregar solo el primer resultado de data.Search
        if (data.Search.length > 0) {
          allMovies.push(data.Search[0]);
        } else {
          console.error(`No se encontraron películas para "${title}"`);
        }
      } else {
        console.error(`No se encontraron películas para "${title}"`);
      }
    }

    mostrarPeliculas(allMovies); // Llamar a mostrarPeliculas después de completar el bucle

  } catch (error) {
    console.error('ERROR:', error);
  }
};

const mostrarPeliculas = (peliculas) => {
  const contenedorPeliculas = document.querySelector('.contenedorPeliculas');
  contenedorPeliculas.innerHTML = '';

  peliculas.forEach(pelicula => {
    const peliculaElement = document.createElement('div');
    peliculaElement.className = 'pelicula';
    peliculaElement.innerHTML = `
    <h3>${pelicula.Title}</h3>
      <img src="${pelicula.Poster}" alt="${pelicula.Title}">
    `;
    contenedorPeliculas.appendChild(peliculaElement);
  });
};

getMovies();
