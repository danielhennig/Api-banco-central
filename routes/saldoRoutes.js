const express = require('express');
const router = express.Router();
const SaldoController = require('../controllers/saldoController');

// GET /saldos/:cpf → saldo total
router.get('/:cpf', SaldoController.saldoTotal);

// GET /saldos/instituicao?cpf=...&instituicao=... → saldo por banco
router.get('/instituicao/filtro', SaldoController.saldoPorInstituicao);

module.exports = router;
