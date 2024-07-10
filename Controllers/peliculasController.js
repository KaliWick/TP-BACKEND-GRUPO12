const db= require("../db/db");
const guardarPeliculasDB = async (req, res) => {
    const { peliculas } = req.body;

    if (!peliculas || !Array.isArray(peliculas)) {
        return res.status(400).json({ error: 'Datos de películas no válidos' });
    }

    try {
        for (const pelicula of peliculas) {
            const { titulo, descripcion, genre, imdbID } = pelicula;

            // Verificar si la película ya existe en la base de datos por su imdbID
            const sqlVerificar = 'SELECT imdbID FROM peliculas WHERE imdbID = ?';
            const [peliculaExistente] = await new Promise((resolve, reject) => {
                db.query(sqlVerificar, [imdbID], (err, result) => {
                    if (err) {
                        console.error('Error al verificar película:', err);
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            if (peliculaExistente) {
                //console.log(`Película ${titulo} ya existe en la base de datos, actualizando...`);
                // Actualizar película existente
                const sqlActualizar = `
                    UPDATE peliculas 
                    SET titulo = ?, descripcion = ?, categoria_id = (SELECT id FROM categorias WHERE nombre = ?)
                    WHERE imdbID = ?
                `;
                await new Promise((resolve, reject) => {
                    db.query(sqlActualizar, [titulo, descripcion, genre, imdbID], (err, result) => {
                        if (err) {
                            console.error('Error al actualizar película:', err);
                            return reject(err);
                        }
                        //console.log(`Película ${titulo} actualizada correctamente`);
                        resolve(result);
                    });
                });
            } else {
                console.log(`Guardando nueva película ${titulo}...`);
                // Obtener el id de la categoría correspondiente
                const sqlCategoria = 'SELECT id FROM categorias WHERE nombre = ?';
                const [categoriaRow] = await new Promise((resolve, reject) => {
                    db.query(sqlCategoria, [genre], (err, result) => {
                        if (err) {
                            console.error('Error al obtener categoría:', err);
                            return reject(err);
                        }
                        resolve(result);
                    });
                });

                if (!categoriaRow) {
                    console.error(`No se encontró la categoría ${genre}`);
                    continue; // O manejar el error de otra manera según tu lógica de negocio
                }

                const categoriaId = categoriaRow.id;

                // Insertar nueva película
                const sqlInsertar = `
                    INSERT INTO peliculas (titulo, descripcion, categoria_id, imdbID)
                    VALUES (?, ?, ?, ?)
                `;
                await new Promise((resolve, reject) => {
                    db.query(sqlInsertar, [titulo, descripcion, categoriaId, imdbID], (err, result) => {
                        if (err) {
                            console.error('Error al insertar película:', err);
                            return reject(err);
                        }
                        console.log(`Película ${titulo} guardada correctamente`);
                        resolve(result);
                    });
                });
            }
        }

        res.json({ success: true, message: 'Películas guardadas correctamente' });

    } catch (error) {
        console.error('Error al guardar películas:', error);
        res.status(500).json({ error: 'Error al guardar las películas' });
    }
};
module.exports = {
    guardarPeliculasDB
};
