const db = require('../db/db');

const iniciarSesion = (req, res) => {
    const { email, password } = req.body;
    console.log('Intento de inicio de sesión para:', email);
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }

        if (results.length > 0) {
            const user = results[0];
            if (user.contrasenia === password) {
                req.session.user = {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                    nombreUsuario: user.nombreUsuario,
                    biografia: user.biografia 
                };
                console.log('Inicio de sesión exitoso para:', email);
                res.json({ success: true, message: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    });
};

module.exports = {
    iniciarSesion
};
