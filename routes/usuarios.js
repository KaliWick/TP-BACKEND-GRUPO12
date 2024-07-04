const express = require ('express');
const router = express.Router();
const usuariosController = require('../Controllers/usuariosController');

router.post('/biografia', usuariosController.actualizarBiografia);
router.delete('/biografia', usuariosController.eliminarBiografia);

module.exports = router;