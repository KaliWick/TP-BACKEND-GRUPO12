const express = require ('express');
const router = express.Router();
const registroController = require('../Controllers/RegistroController');

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.post('/crear_usuario',registroController.crearUsuario);

module.exports = router;