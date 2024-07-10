const db = require('../db/db');

const actualizarBiografia = (req, res) => {
    const { biografia } = req.body;
    const userId = req.session.user.id;

    const sql = 'UPDATE usuarios SET biografia = ? WHERE id = ?';
    db.query(sql, [biografia, userId], (err, result) => {
        if (err) throw err;

        // Actualizar la biografía en la sesión del usuario
        req.session.user.biografia = biografia;
        res.json({ success: true, message: 'Biografía actualizada' });
    });
};

const eliminarBiografia = (req, res) => {
    const userId = req.session.user.id;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    const sql = 'UPDATE usuarios SET biografia = NULL WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting biography:', err);
            return res.status(500).json({ success: false, message: 'Error deleting biography' });
        }

        req.session.user.biografia = null;
        res.json({ success: true, message: 'Biografía eliminada' });
    });
};

const eliminarUsuario = (req, res) => {
    const userId = req.session.user.id;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ success: false, message: 'Error deleting user' });
        }

        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ success: false, message: 'Error destroying session' });
            }

            res.json({ success: true, message: 'Usuario eliminado y sesión destruida' });
        });
    });
};

const obtenerComentariosUsuario = async (req, res) => {
    const usuarioId = req.session.user.id;// Obtén el ID del usuario desde la sesión (suponiendo que estás usando sesiones)
    if (!usuarioId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const sql = `
            SELECT c.id AS comentario_id, c.contenido AS comentario, DATE_FORMAT(c.fecha, '%e %M %Y') AS fecha_formateada, p.titulo AS titulo_pelicula
            FROM comentarios c
            JOIN peliculas p ON c.imdbID = p.imdbID
            WHERE c.usuario_id = ?
            ORDER BY c.fecha DESC;
        `;

        db.query(sql, [usuarioId], (err, results) => {
            if (err) {
                console.error('Error al obtener comentarios del usuario:', err);
                return res.status(500).json({ error: 'Error en el servidor' });
            }

            res.json({ comentarios: results });
        });
    } catch (error) {
        console.error('Error en el controlador de comentarios de usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    actualizarBiografia,
    eliminarBiografia,
    eliminarUsuario,
    obtenerComentariosUsuario
};
