const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// POST /usuarios
router.post('/', UsuarioController.criarUsuario);

// GET /usuarios/com-contas
router.get('/com-contas', UsuarioController.listarUsuariosComContas);

// DELETE /usuarios
router.delete('/', UsuarioController.deletarUsuario);

module.exports = router;
