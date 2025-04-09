const express = require('express');
const router = express.Router();
const Transacao = require('../models/transacao.js');
const Conta = require('../models/conta.js');

router.post('/usuarios/:id/transacoes', async (req, res) => {
    const { conta_id, tipo, valor, descricao } = req.body;
    const conta = await Conta.findByPk(conta_id);

    if (!conta) return res.status(404).json({ erro: 'Conta não encontrada' });

    const novaTransacao = await Transacao.create({
        tipo,
        valor,
        descricao,
        data: new Date(),
        ContaId: conta.id,
    });

    conta.saldo += tipo === 'credito' ? valor : -valor;
    await conta.save();

    res.json(novaTransacao);
});

module.exports = router;