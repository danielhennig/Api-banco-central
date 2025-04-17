const express = require('express');
const router = express.Router();
const ContaController = require('../controllers/contaController');


router.post('/contas', ContaController.criarContaParaUsuario);

module.exports = router;
