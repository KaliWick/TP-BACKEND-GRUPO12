CREATE DATABASE IF NOT EXISTS grupo12_db;

CREATE TABLE usuarios(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre varchar(40) NOT NULL,
email varchar(40) NOT NULL UNIQUE,
contrasenia varchar(40) NOT NULL
);

CREATE TABLE peliculas(
id INT AUTO_INCREMENT PRIMARY KEY,
titulo varchar(40) NOT NULL,
descripcion TEXT,
categoria_id INT,
FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT,
    usuario_id INT,
    pelicula_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id)
);
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);