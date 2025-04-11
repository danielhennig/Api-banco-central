const express = require('express');
const router = express.Router();
const { Instituicao } = require('../models');

router.post('/', async (req, res) => {
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
    res.status(201).json(novaInstituicao);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
router.get('/', async (req, res) => {
    try {
      const instituicoes = await Instituicao.findAll({
        attributes: ['id', 'nome'],
        order: [['id', 'ASC']]
      });
  
      res.status(200).json(instituicoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

module.exports = router;
