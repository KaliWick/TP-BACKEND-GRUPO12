const express = require ('express');
const router = express.Router();
const inicioSesionController = require('../Controllers/inicioSesionController');

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.post('/iniciar_sesion',inicioSesionController.iniciarSesion);

module.exports = router;