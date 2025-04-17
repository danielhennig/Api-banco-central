const { Usuario, Conta, Instituicao, Transacao } = require('../models');

const ExtratoController = {
  async extratoCompleto(req, res) {
    try {
      const { cpf } = req.params;

      const usuario = await Usuario.findByPk(cpf);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const contas = await Conta.findAll({
        where: { usuarioCpf: cpf },
        include: [
          {
            model: Instituicao,
            as: 'Instituicao',
            attributes: ['nome']
          },
          {
            model: Transacao,
            as: 'Transacoes'
          }
        ]
      });

      const transacoes = contas.flatMap(conta =>
        conta.Transacoes.map(transacao => ({
          tipo: transacao.tipo,
          valor: transacao.valor,
          contaId: conta.numConta,
          instituicao: conta.Instituicao?.nome,
          data: transacao.createdAt
        }))
      );

      res.status(200).json({
        cpf: usuario.cpf,
        nome: usuario.nome,
        transacoes
      });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async extratoPorInstituicao(req, res) {
    try {
      const { cpf } = req.params;
      const { instituicao } = req.query;

      if (!instituicao) {
        return res.status(400).json({ mensagem: "Instituição é obrigatória na query" });
      }

      const usuario = await Usuario.findByPk(cpf);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const contas = await Conta.findAll({
        where: { usuarioCpf: cpf },
        include: [
          {
            model: Instituicao,
            as: 'Instituicao',
            attributes: ['nome']
          },
          {
            model: Transacao,
            as: 'Transacoes'
          }
        ]
      });

      const contasFiltradas = contas.filter(c =>
        c.Instituicao?.nome?.toLowerCase() === instituicao.toLowerCase()
      );

      if (contasFiltradas.length === 0) {
        return res.status(404).json({ mensagem: "Nenhuma transação para essa instituição" });
      }

      const transacoes = contasFiltradas.flatMap(conta =>
        conta.Transacoes.map(transacao => ({
          tipo: transacao.tipo,
          valor: transacao.valor,
          contaId: conta.numConta,
          instituicao: conta.Instituicao?.nome,
          data: transacao.createdAt
        }))
      );

      res.status(200).json({
        cpf: usuario.cpf,
        nome: usuario.nome,
        instituicao,
        transacoes
      });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = ExtratoController;
