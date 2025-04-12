const express = require('express');
const router = express.Router();
const { Usuario, Conta, Transacao } = require('../models');

// POST /usuarios/:cpf/transacoes
router.post('/usuarios/transacoes', async (req, res) => {
  try {
    const { cpf, contaId, tipo, valor } = req.body;

    if (!['deposito', 'saque'].includes(tipo)) {
      return res.status(400).json({ mensagem: "Tipo deve ser 'deposito' ou 'saque'" });
    }

    const usuario = await Usuario.findByPk(cpf);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });

    const conta = await Conta.findOne({ where: { numConta: contaId, usuarioCpf: cpf } });
    if (!conta) return res.status(404).json({ mensagem: "Conta não encontrada para este usuário" });

    // Atualiza o saldo
    let novoSaldo = conta.saldo;
    if (tipo === 'deposito') novoSaldo += valor;
    if (tipo === 'saque') {
      if (valor > conta.saldo) return res.status(400).json({ mensagem: "Saldo insuficiente" });
      novoSaldo -= valor;
    }

    await conta.update({ saldo: novoSaldo });

    const transacao = await Transacao.create({
      tipo,
      valor,
      contaId
    });

    res.status(201).json({ mensagem: "Transação registrada", transacao });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
