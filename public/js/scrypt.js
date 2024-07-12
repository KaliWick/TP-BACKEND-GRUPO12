
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const navbarHeight = document.querySelector('.contenedorNav').offsetHeight;
    const offsetTop = target.offsetTop - navbarHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  });
});

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
    'coco',
    'iron man 2',
    'heat'
  ];

  const allMovies = [];
  const moviesByGenre = {};
  const genres = new Set();

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
        let genresArray = detailsData.Genre.split(', ');
        genresArray.forEach(genre => {
          genres.add(genre);
          if (!moviesByGenre[genre]) {
            moviesByGenre[genre] = [];
          }
          moviesByGenre[genre].push(detailsData);
        });

        allMovies.push({
          titulo: detailsData.Title,
          descripcion: detailsData.Plot,
          genre: genresArray[0], // Solo la primera categoría para simplificar, ajusta según tu necesidad
          imdbID: detailsData.imdbID
        });

      }
    });

    const response = await fetch('https://tp-backend-grupo-12.vercel.app/categorias/guardar_categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ genres: Array.from(genres) })
    });

    const result = await response.json();
    if (result.success) {
      console.log('Categorías guardadas correctamente');
    } else {
      console.error('Error al guardar categorías:', result.message);
    }

    // Guardar películas en la base de datos
    const peliculasResponse = await fetch('https://tp-backend-grupo-12.vercel.app/peliculas/guardar_peliculas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ peliculas: allMovies })
    });

    const peliculasResult = await peliculasResponse.json();
    if (peliculasResult.success) {
      console.log('Películas guardadas correctamente');
    } else {
      console.error('Error al guardar películas:', peliculasResult.message);
    }

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
        <div class="contenedorIndividualPeliculas">  
           <a href="/html/peliculas.html?imdbID=${pelicula.imdbID}">
            <img src="${pelicula.Poster}" alt="${pelicula.Title}">
            <div class="detalles">
            <h3 class="pelicula-title">${pelicula.Title}</h3>
            </div>  
            </a>
        </div>  
        `;
      genreContainer.appendChild(peliculaElement);
    });

    genreSection.appendChild(genreContainer);
    contenedorPeliculas.appendChild(genreSection);
  }
};

getMovies();

document.addEventListener('DOMContentLoaded', () => {
  const perfilButton = document.getElementById('perfilButton');

  perfilButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/usuarios/datos');
      if (response.ok) {
        window.location.href = '/usuarios';
      } else {
        throw new Error('No autenticado');
      }
    } catch (error) {
      console.error('Error:', error);
      window.location.href = '/inicioSesion';
    }
  });

});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/usuarios/datos');
    if (response.ok) {
    } else {
      document.querySelectorAll(".link-oculto").forEach(link => {
        link.classList.remove("link-oculto");
      })
    }
  } catch (error) {
    console.error('Error:', error);
  }

});


