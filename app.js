const express = require('express');
const app = express();
const db = require('./database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const instituicaoRoutes = require('./routes/instituicaoRoutes');
const contaRoutes = require('./routes/contaRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/instituicoes', instituicaoRoutes);
app.use('/contas', contaRoutes);
app.use('/transacoes', transacaoRoutes);

const PORT = process.env.PORT || 3000;
db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});