# 🧾 API Agregadora de Contas Bancárias (Mini Banco Central)

Esta API simula um sistema de Open Finance, permitindo que usuários visualizem informações financeiras consolidadas (como saldo total, extratos por instituição), realizem transações bancárias e gerenciem contas em diferentes instituições financeiras.

Desenvolvido como projeto de estágio com foco em aprendizado de APIs REST, arquitetura limpa e facilidade de testes.

---

## 🧰 Tecnologias Utilizadas

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Sequelize CLI (Migrations e Seeds)
- Nodemon
- Insomnia (coleção de endpoints incluída)

---

## 🚀 Como Rodar o Projeto Localmente (Sem Docker)

### ✅ Pré-requisitos:
- Node.js (v18+)
- PostgreSQL ativo e configurado localmente

### 📥 Passo a passo:

```bash
# 1. Clone o repositório
git clone https://github.com/danielhennig/Api-banco-central22
cd Api-banco-central22

# 2. Instale as dependências
npm install

# 3. Configure o banco no arquivo config/config.json
# Altere os dados de acesso conforme seu PostgreSQL local

  "development": 
    "username": "seu_usuario",
    "password": "sua_senha",
    "database": "api_banco",
    "host": "127.0.0.1",
    "dialect": "postgres"
  


# 4. Execute o script completo (migrations, seed e servidor)
npm run setup
```

---

## 📦 Scripts disponíveis (`package.json`)

| Comando         | Descrição                                               |
|----------------|-----------------------------------------------------------|
| `npm run setup`| Executa migrations, seeds e inicia servidor com nodemon |
| `npm start`    | Inicia o servidor normalmente                            |
| `npm run dev`  | Inicia o servidor com nodemon                            |

---

## 🧪 Testes com Insomnia (Importação Direta)

Uma coleção com todos os endpoints organizados foi criada no Insomnia e está disponível no repositório.

📁 Arquivo: `TestesEndPoints.yaml`

### ✅ Como importar:
1. Abra o Insomnia
2. Clique em `Application > Preferences > Data > Import`
3. Selecione o arquivo `TestesEndPoints.yaml`

Você terá acesso direto a todos os endpoints da API já organizados por pastas (Usuários, Contas, Transações, Extratos, Saldos, Instituições).

---

## 🧭 Endpoints da API (organizados por domínio)

### 👤 Usuários

| Método | Rota                    | Descrição                            |
|--------|-------------------------|--------------------------------------|
| POST   | /usuarios               | Cadastrar novo usuário               |
| GET    | /usuarios/com-contas    | Listar usuários com suas contas      |
| DELETE | /usuarios               | Deletar usuário (CPF via body)       |

---

### 🏦 Instituições Financeiras

| Método | Rota             | Descrição                            |
|--------|------------------|---------------------------------------|
| POST   | /instituicoes     | Criar nova instituição financeira     |
| GET    | /instituicoes     | Listar todas as instituições          |
| DELETE | /instituicoes/:id | Deletar uma instituição e suas contas |

---

### 🏦 Contas Bancárias

| Método | Rota                          | Descrição                               |
|--------|-------------------------------|------------------------------------------|
| POST   | /usuarios/:cpf/contas         | Criar conta para um usuário específico   |

---

### 💸 Transações

| Método | Rota                  | Descrição                          |
|--------|-----------------------|-------------------------------------|
| POST   | /usuarios/transacoes  | Realizar depósito ou saque          |

---

### 💰 Saldos

| Método | Rota                                             | Descrição                                   |
|--------|--------------------------------------------------|----------------------------------------------|
| GET    | /saldos/:cpf                                     | Retorna o saldo total do usuário             |
| GET    | /saldos/instituicao/filtro?cpf=...&instituicao=... | Retorna o saldo do usuário por instituição |

---

### 📄 Extratos

| Método | Rota                                                        | Descrição                                   |
|--------|-------------------------------------------------------------|----------------------------------------------|
| GET    | /extratos/:cpf                                              | Extrato completo do usuário                 |
| GET    | /extratos/:cpf/instituicao?instituicao=...                  | Extrato filtrado por instituição            |

---

## 🧪 Exemplo de Requisição

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

## 📌 Observações Técnicas

- Cada usuário pode ter **uma única conta por banco**
- CPF é usado como **chave primária**
- As **transações** atualizam automaticamente o campo `saldo` na tabela `Contas`
- Rotas separadas por domínio (`/usuarios`, `/contas`, `/transacoes`, `/extratos`, `/saldos`, `/instituicoes`)

---

## 🧠 Melhorias futuras (sugestões)

- ✅ Autenticação com JWT
- ✅ Upload automático da coleção do Insomnia
- ✅ Testes automatizados com Jest
- ✅ Filtros por data, tipo de transação e intervalo de valores
- ✅ Exportar extratos em PDF/CSV
- ✅ Dockerização completa para execução com `docker-compose`

---

> Desenvolvido por Daniel Hennig | Projeto de Estágio com foco em Open Finance

