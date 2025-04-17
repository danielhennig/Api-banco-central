const { Usuario, Conta, Transacao } = require('../models');

const TransacaoController = {
  async realizarTransacao(req, res) {
    try {
      const { cpf, contaId, tipo, valor } = req.body;

      if (!['deposito', 'saque'].includes(tipo)) {
        return res.status(400).json({ mensagem: "Tipo deve ser 'deposito' ou 'saque'" });
      }

      if (!valor || valor <= 0) {
        return res.status(400).json({ mensagem: "O valor da transação deve ser maior que zero" });
      }

      const usuario = await Usuario.findByPk(cpf);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const conta = await Conta.findOne({
        where: { numConta: contaId, usuarioCpf: cpf }
      });

      if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada para este usuário" });
      }

      const valorFinal = tipo === 'saque' ? -valor : valor;

      if (conta.saldo + valorFinal < 0) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para saque" });
      }

      await conta.update({ saldo: conta.saldo + valorFinal });

      const transacao = await Transacao.create({
        tipo,
        valor: valorFinal,
        contaId
      });

      return res.status(201).json({
        mensagem: "Transação registrada com sucesso",
        transacao
      });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = TransacaoController;
