const db = require ('../db/db');

const guardarPeliculasDB = async (req, res) => {
    const { peliculas } = req.body;

    if (!peliculas || !Array.isArray(peliculas)) {
        return res.status(400).json({ error: 'Datos de películas no válidos' });
    }

    try {
        for (const pelicula of peliculas) {
            const { titulo, descripcion, genre } = pelicula;

            // Obtener el id de la categoría correspondiente
            const sqlCategoria = 'SELECT id FROM categorias WHERE nombre = ?';
            const [categoriaRow] = await new Promise((resolve, reject) => {
                db.query(sqlCategoria, [genre], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (!categoriaRow) {
                console.error(`No se encontró la categoría ${categoria}`);
                continue; // O manejar el error de otra manera según tu lógica de negocio
            }

            const categoriaId = categoriaRow.id;

            // Insertar o actualizar la película en la tabla peliculas
            const sql = `
                INSERT INTO peliculas (titulo, descripcion, categoria_id)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE titulo = VALUES(titulo), descripcion = VALUES(descripcion), categoria_id = VALUES(categoria_id)
            `;
            await new Promise((resolve, reject) => {
                db.query(sql, [titulo, descripcion, categoriaId], (err, result) => {
                    if (err) {
                        console.error('Error al ejecutar consulta SQL:', err);
                        return reject(err);
                    }
                    console.log(`Película ${titulo} guardada correctamente`);
                    resolve(result);
                });
            });
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