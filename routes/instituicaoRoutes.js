const express = require('express');
const router = express.Router();
const Instituicao = require('../models/instituicao.js');

router.post('/', async (req, res) => {
    const inst = await Instituicao.create(req.body);
    res.json(inst);
});

module.exports = router;