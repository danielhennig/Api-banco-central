const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.js');
const Conta = require('../models/conta');
const Instituicao = require('../models/instituicao.js');
const Transacao = require('../models/transacao.js');
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
  const usuario = await Usuario.create(req.body);
  res.json(usuario);
});

router.get('/:id/saldo', async (req, res) => {
  const { instituicao } = req.query;
  let where = { UsuarioId: req.params.id };
  if (instituicao) {
    const inst = await Instituicao.findOne({ where: { nome: instituicao } });
    where.InstituicaoId = inst?.id;
  }
  const contas = await Conta.findAll({ where });
  const total = contas.reduce((acc, c) => acc + c.saldo, 0);
  res.json({ saldo: total });
});

router.get('/:id/extrato', async (req, res) => {
  const { instituicao } = req.query;
  const contas = await Conta.findAll({
    where: { UsuarioId: req.params.id },
    include: instituicao ? {
      model: Instituicao,
      where: { nome: instituicao },
    } : Instituicao,
  });

  const transacoes = [];
  for (const conta of contas) {
    const t = await Transacao.findAll({ where: { ContaId: conta.id } });
    transacoes.push(...t);
  }

  res.json(transacoes);
});

module.exports = router;