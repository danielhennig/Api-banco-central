# 📘 API Agregadora de Contas Bancárias (Mini Banco Central)

Esta API simula um sistema de Open Finance, permitindo que usuários visualizem informações financeiras consolidadas, como saldo total, extratos por instituição, realização de transações bancárias e gerenciamento de contas em diferentes bancos.

Desenvolvido com foco em aprendizado prático de APIs REST, utilizando Node.js, Express, Sequelize e PostgreSQL.

---

## ✅ Como rodar a API localmente (sem Docker)

### Requisitos:
- Node.js
- PostgreSQL

### Passos:

```bash
# 1. Clone o repositório
git clone https://github.com/danielhennig/Api-banco-central22
cd Api-banco-central22

# 2. Instale as dependências
npm install

# 3. Configure o banco de dados em config/config.json
# Altere para os dados do seu PostgreSQL local

# 4. Execute o setup completo (migração + seed + iniciar servidor)
npm run setup
```

---

## 🔄 Scripts rápidos (via package.json)

| Comando         | Ação                                        |
|----------------|-----------------------------------------------|
| `npm run setup`| Migra banco, adiciona dados e inicia servidor |
| `npm start`    | Inicia servidor normalmente                   |
| `npm run dev`  | Inicia com nodemon (modo dev)                 |

---

## 📩 Principais Endpoints

### 👤 Usuários

| Método | Rota                    | Ação                            |
|--------|-------------------------|-------------------------------------|
| POST   | /usuarios               | Cadastrar novo usuário             |
| GET    | /usuarios/com-contas    | Listar usuários e contas           |
| DELETE | /usuarios               | Deletar usuário (enviar CPF no body) |


### 🏦 Instituições Financeiras

| Método | Rota             | Ação                       |
|--------|------------------|------------------------------|
| POST   | /instituicoes     | Cadastrar nova instituição     |
| GET    | /instituicoes     | Listar todas as instituições  |
| DELETE | /instituicoes/:id | Deletar instituição e contas |


### 🌐 Contas

| Método | Rota                          | Ação                            |
|--------|-------------------------------|-----------------------------------|
| POST   | /usuarios/:cpf/contas         | Criar conta para usuário          |


### 💵 Transações

| Método | Rota                     | Ação                          |
|--------|-----------------------------|-----------------------------------|
| POST   | /usuarios/transacoes        | Realizar saque ou depósito       |


### 📊 Saldos

| Método | Rota                                      | Ação                              |
|--------|--------------------------------------------|-------------------------------------------|
| GET    | /saldos/:cpf                               | Retorna saldo total do usuário           |
| GET    | /saldos/instituicao/filtro?cpf=...&instituicao=... | Retorna saldo por banco         |


### 📄 Extratos

| Método | Rota                                            | Ação                                 |
|--------|--------------------------------------------------|------------------------------------------|
| GET    | /extratos/:cpf                                   | Extrato completo do usuário             |
| GET    | /extratos/:cpf/instituicao?instituicao=...       | Extrato filtrado por instituição         |


---

## 📆 Exemplo de requisição (Insomnia ou Postman)

```http
POST /usuarios
Content-Type: application/json

{
  "cpf": "12345678900",
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

---


## 🔹 Melhorias futuras

- Autenticação com JWT
- Testes automatizados com Jest
- Upload de coleção do Insomnia para importar e testar
- Filtros por data, tipo de transação e valores
- Exportação de extratos em PDF/CSV

---

> Desenvolvido por Daniel Hennig - Projeto de Estágio

