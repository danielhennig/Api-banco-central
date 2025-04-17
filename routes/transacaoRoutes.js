const express = require('express');
const router = express.Router();
const TransacaoController = require('../controllers/transacaoController');

// POST /usuarios/transacoes
router.post('/usuarios/transacoes', TransacaoController.realizarTransacao);

module.exports = router;
