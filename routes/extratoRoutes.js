const express = require('express');
const router = express.Router();
const ExtratoController = require('../controllers/extratoController');


router.get('/:cpf', ExtratoController.extratoCompleto);


router.get('/:cpf/instituicao', ExtratoController.extratoPorInstituicao);

module.exports = router;
