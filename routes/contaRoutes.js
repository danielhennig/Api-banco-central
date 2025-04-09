const express = require('express');
const router = express.Router();
const Conta = require('../models/conta.js');
const Usuario = require('../models/usuario.js');
const Instituicao = require('../models/instituicao.js');

router.post('/usuarios/:id/contas', async (req, res) => {
  const conta = await Conta.create({
    UsuarioId: req.params.id,
    InstituicaoId: req.body.instituicao_id,
    saldo: req.body.saldo || 0,
  });
  res.json(conta);
});

module.exports = router;