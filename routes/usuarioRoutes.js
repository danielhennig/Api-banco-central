const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');

// POST /usuarios
router.post('/', async (req, res) => {
  try {
    const { cpf, nome, email } = req.body;

    if (!cpf || !nome || !email) {
      return res.status(400).json({ mensagem: "CPF, nome e email são obrigatórios" });
    }

    const jaExiste = await Usuario.findOne({ where: { cpf } });

    if (jaExiste) {
      return res.status(409).json({ mensagem: "Usuário já cadastrado com este CPF" });
    }

    const usuario = await Usuario.create({ cpf, nome, email });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
