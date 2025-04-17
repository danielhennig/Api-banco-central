module.exports = function validarUsuario(req, res, next) {
    const { cpf, nome, email } = req.body;
  
    if (!cpf || !nome || !email) {
      return res.status(400).json({ mensagem: "CPF, nome e email são obrigatórios." });
    }
  
    if (typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ mensagem: "E-mail inválido." });
    }
  
    next();
  };
  