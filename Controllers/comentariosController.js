const db = require('../db/db');

const obtenerComentarios = async (req, res) => {
    const { imdbID } = req.params;
    if (!imdbID) {
        return res.status(400).json({ error: 'ID de película no proporcionado' });
    }

    try {
        const sql = `
            SELECT c.contenido AS comentario, c.fecha, u.nombre AS nombreUsuario 
            FROM comentarios c 
            JOIN usuarios u ON c.usuario_id = u.id 
            WHERE c.imdbID = ? 
            ORDER BY c.fecha DESC
        `;
        db.query(sql, [imdbID], (err, results) => {
            if (err) {
                console.error('Error al obtener comentarios:', err);
                return res.status(500).json({ error: 'Error al obtener comentarios' });
            }

            res.json({ comentarios: results });
        });
    } catch (error) {
        console.error('Error en el controlador de obtener comentarios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const agregarComentarios = async (req, res) => {
    const { imdbID } = req.params;
    const { contenido } = req.body;
    const usuarioId = req.session.user.id;

    if (!imdbID || !contenido || !usuarioId) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    try {
        const sql = `
            INSERT INTO comentarios (contenido, usuario_id, imdbID, fecha) 
            VALUES (?, ?, ?, NOW())
        `;
        db.query(sql, [contenido, usuarioId, imdbID], (err, result) => {
            if (err) {
                console.error('Error al agregar comentario:', err);
                return res.status(500).json({ error: 'Error al agregar comentario' });
            }

            res.json({ success: true, message: 'Comentario agregado correctamente' });
        });
    } catch (error) {
        console.error('Error en el controlador de agregar comentario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    obtenerComentarios,
    agregarComentarios
};
