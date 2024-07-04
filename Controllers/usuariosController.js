const db = require ('../db/db');

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

    const sql = 'UPDATE usuarios SET biografia = NULL WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;

        // Eliminar la biografía de la sesión del usuario
        req.session.user.biografia = null;
        res.json({ success: true, message: 'Biografía eliminada' });
    });
};

module.exports = {
    actualizarBiografia,
    eliminarBiografia
};
