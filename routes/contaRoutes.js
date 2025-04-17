const express = require('express');
const router = express.Router();
const ContaController = require('../controllers/contaController');

// POST /usuarios/:cpf/contas
router.post('/contas', ContaController.criarContaParaUsuario);

module.exports = router;
