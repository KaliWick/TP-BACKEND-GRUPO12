const express = require ('express');
const router = express.Router();
const comentariosController = require('../Controllers/comentariosController')

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.get('/', comentariosController.obtenerCategorias);
module.exports = router;