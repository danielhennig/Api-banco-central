const express = require('express');
const router = express.Router();
const { Usuario, Conta, Transacao } = require('../models');

// POST /usuarios/transacoes
router.post('/usuarios/transacoes', async (req, res) => {
  try {
    const { cpf, contaId, tipo, valor } = req.body;

    if (!['deposito', 'saque'].includes(tipo)) {
      return res.status(400).json({ mensagem: "Tipo deve ser 'deposito' ou 'saque'" });
    }

    if (valor <= 0) {
      return res.status(400).json({ mensagem: "O valor da transação deve ser maior que zero" });
    }

    const usuario = await Usuario.findByPk(cpf);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });

    const conta = await Conta.findOne({ where: { numConta: contaId, usuarioCpf: cpf } });
    if (!conta) return res.status(404).json({ mensagem: "Conta não encontrada para este usuário" });

    // Define o valor ajustado da transação
    const valorFinal = tipo === 'saque' ? -valor : valor;

    // Verifica se o saque excede o saldo
    if (conta.saldo + valorFinal < 0) {
      return res.status(400).json({ mensagem: "Saldo insuficiente para saque" });
    }

    // Atualiza o saldo
    const novoSaldo = conta.saldo + valorFinal;
    await conta.update({ saldo: novoSaldo });

    // Cria a transação
    const transacao = await Transacao.create({
      tipo,
      valor: valorFinal, // valor positivo ou negativo já ajustado
      contaId
    });

    res.status(201).json({ mensagem: "Transação registrada", transacao });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
