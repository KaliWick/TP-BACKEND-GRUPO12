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

module.exports = {
    actualizarBiografia,
    eliminarBiografia,
    eliminarUsuario
};
