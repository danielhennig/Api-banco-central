const express = require('express');
const app = express();

const instituicaoRoutes = require('./routes/instituicaoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const contaRoutes = require('./routes/contaRoutes');

app.use(express.json());

app.use('/', contaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/instituicoes', instituicaoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
