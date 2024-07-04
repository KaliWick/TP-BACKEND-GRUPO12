const express = require ('express');
const router = express.Router();
const usuariosController = require('../Controllers/usuariosController');

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.get('/', usuariosController.obtenerCategorias);

module.exports = router;