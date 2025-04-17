const express = require('express');
const router = express.Router();
const ExtratoController = require('../controllers/extratoController');

// GET /extratos/:cpf → extrato completo
router.get('/:cpf', ExtratoController.extratoCompleto);

// GET /extratos/:cpf/instituicao?instituicao=nome → extrato filtrado
router.get('/:cpf/instituicao', ExtratoController.extratoPorInstituicao);

module.exports = router;
