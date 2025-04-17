const { Usuario, Conta, Instituicao } = require('../models');

const UsuarioController = {
  async criarUsuario(req, res) {
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
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async listarUsuariosComContas(req, res) {
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
  },

  async deletarUsuario(req, res) {
    try {
      const { cpf } = req.body;

      const usuario = await Usuario.findByPk(cpf);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      await usuario.destroy();
      res.status(200).json({ mensagem: "Usuário e contas vinculadas foram deletados com sucesso" });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = UsuarioController;
