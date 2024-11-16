const { Sequelize } = require("sequelize");
const ErroPadrao = require("../errors/ErroPadrao");
const ErroValidacao = require("../errors/ErroValidacao");
const sequelize = require("sequelize");

function gerenciarErros(erro) {
  if (erro instanceof ErroValidacao) {
    return erro.obterRespostaErro();
  } else if (erro instanceof sequelize.ValidationError) {
    const erros = erro.errors.map((e) => e.message);
    return new ErroValidacao(undefined, undefined, erros).obterRespostaErro();
  } else {
    return new ErroPadrao().obterRespostaErro();
  }
}

module.exports = gerenciarErros;
