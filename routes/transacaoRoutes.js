const express = require('express');
const router = express.Router();
const TransacaoController = require('../controllers/transacaoController');


router.post('/usuarios/transacoes', TransacaoController.realizarTransacao);

module.exports = router;
