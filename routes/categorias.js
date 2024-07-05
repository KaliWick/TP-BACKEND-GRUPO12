const express = require ('express');
const router = express.Router();
const categoriasController = require('../Controllers/categoriasController')

///aca van todas las acciones de esta seccion GET POST PUT DELETE
router.post('/', categoriasController.guardarCategoriasDB);

module.exports = router;