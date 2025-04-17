module.exports = function validarCPF(req, res, next) {
    const cpf = req.body.cpf || req.query.cpf || req.params.cpf;
  
    if (!cpf || typeof cpf !== 'string' || !/^\d{5,11}$/.test(cpf)) {
      return res.status(400).json({ mensagem: "CPF inválido. Deve conter apenas números e entre 5 e 11 dígitos." });
    }
  
    next();
  };
  