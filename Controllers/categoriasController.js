const db = require ('../db/db');

const guardarCategoriasDB = async (req, res) => {
    const { genres } = req.body;
    
    if (!genres || !Array.isArray(genres)) {
        return res.status(400).json({ error: 'Datos de categorías no válidos' });
    }

    try {
        for (const genre of genres) {
            const sql = 'INSERT INTO categorias (nombre) VALUES (?) ON DUPLICATE KEY UPDATE nombre=nombre';
            await new Promise((resolve, reject) => {
                db.query(sql, [genre], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        }
        res.json({ success: true, message: 'Categorías guardadas correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar las categorías' });
    }
};

module.exports = {
    guardarCategoriasDB
};
