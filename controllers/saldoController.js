const { Usuario, Conta, Instituicao } = require('../models');

const SaldoController = {
  async saldoTotal(req, res) {
    try {
      const { cpf } = req.params;

      const usuario = await Usuario.findOne({
        where: { cpf },
        include: {
          model: Conta,
          as: 'Contas'
        }
      });

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const saldoTotal = usuario.Contas.reduce((acc, conta) => acc + conta.saldo, 0);

      res.status(200).json({
        cpf: usuario.cpf,
        nome: usuario.nome,
        saldoTotal
      });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async saldoPorInstituicao(req, res) {
    try {
      const { cpf } = req.query;
      const { instituicao } = req.query;

      if (!cpf || !instituicao) {
        return res.status(400).json({ mensagem: "CPF e nome da instituição são obrigatórios" });
      }

      const usuario = await Usuario.findOne({
        where: { cpf },
        include: {
          model: Conta,
          as: 'Contas',
          include: {
            model: Instituicao,
            as: 'Instituicao',
            attributes: ['id', 'nome']
          }
        }
      });

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const contas = usuario.Contas.filter(c =>
        c.Instituicao?.nome?.toLowerCase() === instituicao.toLowerCase()
      );

      if (contas.length === 0) {
        return res.status(404).json({ mensagem: "Nenhuma conta nessa instituição" });
      }

      const saldo = contas.reduce((acc, conta) => acc + conta.saldo, 0);

      res.status(200).json({
        cpf: usuario.cpf,
        nome: usuario.nome,
        instituicao,
        saldo
      });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = SaldoController;
