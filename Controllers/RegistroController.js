const db = require('../db/db');

const crearUsuario = (req, res) => {
    const { nombre, apellido, email, nombreUsuario, contrasenia } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, apellido, email, nombreUsuario, contrasenia) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [nombre, apellido, email, nombreUsuario, contrasenia], (error, result) => {
        if (error) {
            console.error('Error al insertar usuario:', error);
            res.status(500).json({ message: 'Error al crear usuario' });
        } else {
            res.status(200).json({ message: 'Usuario creado exitosamente', usuarioId: result.insertId });
        }
    });
};

module.exports = {
    crearUsuario
};