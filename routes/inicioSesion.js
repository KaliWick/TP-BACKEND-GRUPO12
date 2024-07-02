const express = require ('express');
const router = express.Router();
const inicioSesionController = require('../Controllers/inicioSesionController');

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.get('/', inicioSesionController.obtenerCategorias);

module.exports = router;