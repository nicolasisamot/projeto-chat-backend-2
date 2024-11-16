const ErroPadrao = require("./ErroPadrao");

class ErroValidacao extends ErroPadrao {
  constructor(mensagem = "Erro de validacão.", status = 400, erros) {
    super(mensagem, status);
    this.erros = erros;
  }
  obterRespostaErro() {
    return {
      mensagem: this.mensagem,
      erros: this.erros,
      status: this.status,
    };
  }
}

module.exports = ErroValidacao;
