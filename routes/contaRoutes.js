const express = require('express');
const router = express.Router();
const { Conta, Usuario, Instituicao } = require('../models');

// ROTA ALTERNATIVA para facilitar testes: CPF no body
router.post('/contas', async (req, res) => {
    try {
        const { cpf, instituicaoId, saldo } = req.body;

        if (!cpf || !instituicaoId) {
            return res.status(400).json({ mensagem: "CPF e ID da instituição são obrigatórios" });
        }

        const usuario = await Usuario.findByPk(cpf);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const instituicao = await Instituicao.findByPk(instituicaoId);
        if (!instituicao) {
            return res.status(404).json({ mensagem: "Instituição não encontrada" });
        }

        const contaExistente = await Conta.findOne({
            where: {
                usuarioCpf: cpf,
                instituicaoId
            }
        });

        if (contaExistente) {
            return res.status(409).json({
                mensagem: "Usuário já possui uma conta nessa instituição."
            });
        }




        const conta = await Conta.create({
            usuarioCpf: cpf,
            instituicaoId,
            saldo: saldo || 0
        });

        res.status(201).json(conta);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});



module.exports = router;
