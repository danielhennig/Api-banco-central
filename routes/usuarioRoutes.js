const express = require('express');
const router = express.Router();

const { Usuario, Conta, Instituicao } = require('../models');

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

// GET /usuarios/com-contas
router.get('/com-contas', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [{
                model: Conta,
                as: 'Contas',
                include: {
                    model: Instituicao,
                    as: 'Instituicao',
                    attributes: ['id', 'nome']
                }
            }]
        });

        const resultado = usuarios.map(usuario => {
            const instituicoes = usuario.Contas?.map(conta => conta.Instituicao) || [];

            return {
                cpf: usuario.cpf,
                nome: usuario.nome,
                instituicoes
            };
        });

        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});



module.exports = router;
