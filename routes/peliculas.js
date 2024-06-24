const express = require ('express');
const router = express.Router();
const peliculasController = require('../Controllers/peliculasController');

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.get('/', peliculasController.obtenerCategorias);
module.exports = router;