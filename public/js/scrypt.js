document.addEventListener('DOMContentLoaded', () => {
  const categoria1 = [
      { title: "Intensamente", image: "../img/intensamente.png" },
      { title: "Un lugar en silencio", image: "../img/un_lugar_en_silencio.png" },
      { title: "Siniestro", image: "../img/siniestro.png" }
  ];

  const categoria2 = [
      { title: "Los mundos de coraline", image: "../img/los_mundos_de_coraline.png" },
      { title: "Elementos", image: "../img/elementos.png" },
      { title: "Mi amigo Dahmer", image: "../img/mi_amigo_dahmer.png" }
  ];

  function renderMovies(movieList, containerId) {
      const container = document.getElementById(containerId);
      movieList.forEach(movie => {
          const movieItem = document.createElement('div');
          movieItem.classList.add('movie-item');
          
          const movieImage = document.createElement('img');
          movieImage.src = movie.image;
          movieImage.alt = movie.title;

          const movieInfo = document.createElement('div');
          movieInfo.textContent = movie.title;

          movieItem.appendChild(movieImage);
          movieItem.appendChild(movieInfo);
          container.appendChild(movieItem);
      });
  }

  renderMovies(categoria1, 'categoria-1');
  renderMovies(categoria2, 'categoria-2');

  const searchInput = document.getElementById('search-input');
  const searchButton = document.querySelector('.search-bar button');

  searchButton.addEventListener('click', () => {
      const query = searchInput.value.toLowerCase();
      const allMovies = [...categoria1, ...categoria2];
      const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(query));

      document.getElementById('categoria-1').innerHTML = '';
      document.getElementById('categoria-2').innerHTML = '';

      renderMovies(filteredMovies, 'categoria-1');
  });
});