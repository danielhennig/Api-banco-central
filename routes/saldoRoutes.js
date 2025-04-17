const express = require('express');
const router = express.Router();
const SaldoController = require('../controllers/saldoController');


router.get('/:cpf', SaldoController.saldoTotal);


router.get('/instituicao/filtro', SaldoController.saldoPorInstituicao);

module.exports = router;
