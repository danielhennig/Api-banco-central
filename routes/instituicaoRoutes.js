const express = require('express');
const router = express.Router();
const InstituicaoController = require('../controllers/instituicaoController');

// POST /instituicoes
router.post('/', InstituicaoController.criarInstituicao);

// GET /instituicoes
router.get('/', InstituicaoController.listarInstituicoes);

// DELETE /instituicoes/:id
router.delete('/:id', InstituicaoController.deletarInstituicao);

module.exports = router;
