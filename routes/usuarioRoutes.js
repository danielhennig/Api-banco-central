const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const validarCPF = require('../middlewares/validarCPF');
const validarUsuario = require('../middlewares/validarUsuario');


router.post('/', validarUsuario, UsuarioController.criarUsuario);


router.get('/com-contas', UsuarioController.listarUsuariosComContas);


router.delete('/', validarCPF, UsuarioController.deletarUsuario);


module.exports = router;
