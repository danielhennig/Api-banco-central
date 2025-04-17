const express = require('express');
const router = express.Router();
const InstituicaoController = require('../controllers/instituicaoController');


router.post('/', InstituicaoController.criarInstituicao);


router.get('/', InstituicaoController.listarInstituicoes);


router.delete('/:id', InstituicaoController.deletarInstituicao);

module.exports = router;
