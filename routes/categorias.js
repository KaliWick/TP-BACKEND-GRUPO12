const express = require ('express');
const router = express.Router();
const categoriaController = require('../Controllers/categoriaController');

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.get('/', categoriaController.obtenerCategorias);

module.exports = router;