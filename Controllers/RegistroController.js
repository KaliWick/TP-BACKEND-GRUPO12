const db = require('../db/db');

const crearUsuario = (req, res) => {
    const { nombre, apellido, email, nombreUsuario, contrasenia } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, apellido, email, nombreUsuario, contrasenia) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [nombre, apellido, email, nombreUsuario, contrasenia], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al crear el usuario' });
            return;
        }

        res.json({
            mensaje: 'Usuario creado con éxito',
            idUsuario: result.insertId
        });
    });
}
module.exports = {
    crearUsuario
};