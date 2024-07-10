const express = require ('express');
const router = express.Router();
const usuariosController = require('../Controllers/usuariosController');

router.put('/biografia', usuariosController.actualizarBiografia);
router.delete('/biografia', usuariosController.eliminarBiografia);
router.delete('/delete', usuariosController.eliminarUsuario);
router.get('/comentarios', usuariosController.obtenerComentariosUsuario);
module.exports = router;