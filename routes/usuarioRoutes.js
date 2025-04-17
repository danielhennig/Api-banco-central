const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const validarCPF = require('../middlewares/validarCPF');
const validarUsuario = require('../middlewares/validarUsuario');

// Criar usuário
router.post('/', validarUsuario, UsuarioController.criarUsuario);

// Listar usuários com contas
router.get('/com-contas', UsuarioController.listarUsuariosComContas);

// Deletar usuário
router.delete('/', validarCPF, UsuarioController.deletarUsuario);


module.exports = router;
