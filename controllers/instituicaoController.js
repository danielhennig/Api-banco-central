const { Instituicao } = require('../models');

const InstituicaoController = {
  async criarInstituicao(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ mensagem: "Nome da instituição é obrigatório" });
      }

      const existente = await Instituicao.findOne({ where: { nome } });
      if (existente) {
        return res.status(409).json({ mensagem: "Instituição já cadastrada com esse nome" });
      }

      const novaInstituicao = await Instituicao.create({ nome });
      return res.status(201).json(novaInstituicao);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async listarInstituicoes(req, res) {
    try {
      const instituicoes = await Instituicao.findAll({
        attributes: ['id', 'nome'],
        order: [['id', 'ASC']]
      });

      return res.status(200).json(instituicoes);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async deletarInstituicao(req, res) {
    try {
      const { id } = req.params;

      const instituicao = await Instituicao.findByPk(id);
      if (!instituicao) {
        return res.status(404).json({ mensagem: "Instituição não encontrada" });
      }

      await instituicao.destroy();
      return res.status(200).json({ mensagem: "Instituição e contas associadas foram deletadas com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = InstituicaoController;
