class ErroPadrao extends Error {
  constructor(mensagem = "Ocorreu um erro inesperado.", status = 500) {
    super();
    this.mensagem = mensagem;
    this.status = status;
  }

  obterRespostaErro() {
    return {
      mensagem: this.mensagem,
      status: this.status,
    };
  }
}

module.exports = ErroPadrao;
