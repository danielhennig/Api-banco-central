# 🧾 Explicação Completa do Funcionamento da API Agregadora de Contas Bancárias

Este documento tem o objetivo de explicar **como o código da API funciona**, de forma clara e didática, detalhando as funcionalidades e a arquitetura do sistema.

---

## 📁 Estrutura do Projeto

```
Api-banco-central22/
├── app.js                   # Ponto de entrada da aplicação
├── config/                  # Configuração do Sequelize
├── controllers/             # Lógica de negócio separada por entidade
├── middlewares/             # Validações e interceptações de requisições
├── migrations/              # Scripts de criação de tabelas no banco
├── models/                  # Definições das entidades do Sequelize
├── routes/                  # Rotas da aplicação
├── seeders/                 # Dados iniciais do banco (seed)
├── docker-compose.yml       # Orquestração da API e banco via Docker
├── Dockerfile               # Instruções para montar a imagem da API
└── package.json             # Dependências e scripts do projeto
```

---

## 🔹 `app.js`

Arquivo principal da API. Ele:
- Importa o `express`
- Define `app.use(express.json())` para aceitar JSON
- Carrega as rotas (`usuarios`, `instituicoes`, `contas`, etc)
- Define a porta do servidor (3000)

```js
const express = require('express');
const app = express();
app.use(express.json());

// Carrega rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);

// Outras rotas omitidas para simplificação
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```

---

## 🔹 `models/`

Define os modelos (entidades) da aplicação usando Sequelize:
- `Usuario` (cpf, nome, email)
- `Instituicao` (nome)
- `Conta` (usuarioCpf, instituicaoId, saldo)
- `Transacao` (tipo, valor, contaId)

Cada modelo possui:
- Tipos de dados
- Associações com outras tabelas (`hasMany`, `belongsTo`)

Exemplo do `Conta.js`:
```js
Conta.associate = (models) => {
  Conta.belongsTo(models.Usuario, { foreignKey: 'usuarioCpf', as: 'Usuario' });
  Conta.belongsTo(models.Instituicao, { foreignKey: 'instituicaoId', as: 'Instituicao' });
  Conta.hasMany(models.Transacao, { foreignKey: 'contaId', as: 'Transacoes' });
};
```

---

## 🔹 `routes/`

Define os caminhos (endpoints) da aplicação. Cada rota chama o respectivo controller.

Exemplo:
```js
router.post('/', validarUsuario, UsuarioController.criarUsuario);
router.get('/com-contas', UsuarioController.listarUsuariosComContas);
```

---

## 🔹 `controllers/`

Contêm a lógica de negócio. Exemplo do `UsuarioController`:

```js
async criarUsuario(req, res) {
  const { cpf, nome, email } = req.body;
  if (!cpf || !nome || !email) return res.status(400).json({ mensagem: "Campos obrigatórios" });
  const existente = await Usuario.findByPk(cpf);
  if (existente) return res.status(409).json({ mensagem: "Já existe" });
  const novo = await Usuario.create({ cpf, nome, email });
  res.status(201).json(novo);
}
```

Outros controllers:
- `ContaController`: cria conta para usuário em uma instituição
- `TransacaoController`: faz depósito ou saque e atualiza saldo
- `ExtratoController`: mostra extrato completo ou filtrado por banco
- `SaldoController`: mostra saldo total ou por banco

---

## 🔹 `middlewares/`

Interceptam requisições para validar dados.

Exemplo `validarCPF.js`:
```js
module.exports = (req, res, next) => {
  const cpf = req.body.cpf || req.query.cpf || req.params.cpf;
  if (!cpf || !/^[0-9]{5,11}$/.test(cpf)) return res.status(400).json({ mensagem: 'CPF inválido' });
  next();
};
```

---

## 🔹 `migrations/` e `seeders/`

Geram automaticamente as tabelas e dados iniciais no banco:
- Migrations: criam estrutura
- Seeders: inserem dados de exemplo (usuários, bancos, contas)

Executados via:
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

## 🔹 `docker-compose.yml` e `Dockerfile`

- `docker-compose.yml` junta o PostgreSQL + API
- `Dockerfile` monta o ambiente da API com Node.js

```yaml
services:
  db:
    image: postgres
  api:
    build: .
    depends_on:
      - db
```

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
```

---

## ✅ Como tudo funciona junto

1. O `app.js` inicia o servidor e carrega rotas
2. Cada rota chama um controller
3. O controller acessa os modelos do Sequelize
4. Os dados vão para o banco (PostgreSQL)
5. Os middlewares garantem que os dados sejam válidos
6. O resultado é devolvido via `res.json()`

---

## 🧠 Conclusão

Este projeto está modularizado em:
- **Rotas** (definem os caminhos)
- **Controllers** (fazem a lógica)
- **Models** (representam tabelas)
- **Middlewares** (validam)

E usa Docker para facilitar a execução. Qualquer pessoa pode clonar, rodar `docker-compose up` e começar a testar.

---

> Criado por Daniel Hennig — Documentação para fins de explicação técnica e avaliação.

