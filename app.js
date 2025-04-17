const express = require('express');
const app = express();

const instituicaoRoutes = require('./routes/instituicaoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const contaRoutes = require('./routes/contaRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const extratoRoutes = require('./routes/extratoRoutes');
const saldoRoutes = require('./routes/saldoRoutes');

app.use(express.json());

app.use('/', transacaoRoutes);
app.use('/', contaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/instituicoes', instituicaoRoutes);
app.use('/extratos', extratoRoutes);
app.use('/saldos', saldoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
