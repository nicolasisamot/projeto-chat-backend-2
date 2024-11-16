require("dotenv").config();
const Services = require("./Services");
const db = require("../models/index");
const ErroValidacao = require("../errors/ErroValidacao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

class UsuarioServices extends Services {
  constructor() {
    super("Usuario");
  }
  async cadastrarUsuario(novoUsuario) {
    try {
      const { usuario, senha, email } = novoUsuario;

      if (!usuario || !email || !senha) {
        throw new ErroValidacao("Todos os campos devem ser preenchidos.");
      }
      let erros = {};

      const usuarioExistente = await db[this.model].findOne({
        where: {
          usuario,
        },
      });
      if (usuarioExistente) {
        erros.usuarioJaExisteErro = true;
      }
      const emailExistente = await db[this.model].findOne({
        where: {
          email,
        },
      });
      if (emailExistente) {
        erros.emailJaExisteErro = true;
      }

      if (Object.keys(erros).length > 0) {
        throw new ErroValidacao("Dados ja existentes.", 409, erros);
      }
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(senha, salt);
      novoUsuario.senha = senhaHash;

      return await db[this.model].create(novoUsuario);
    } catch (error) {
      throw error;
    }
  }

  async fazerLogin(dadosLogin) {
    try {
      const { usuario, senha } = dadosLogin;
      if (!usuario || !senha) {
        throw new ErroValidacao("Todos os campos devem ser preenchidos.");
      }
      const usuarioEncontrado = await db[this.model].findOne({
        where: {
          usuario,
        },
      });
      if (!usuarioEncontrado) {
        throw new ErroValidacao("Usário ou senha inválidos.", 401);
      }
      const comparaSenhas = await bcrypt.compare(
        senha,
        usuarioEncontrado.senha
      );
      if (!comparaSenhas) {
        throw new ErroValidacao("Usário ou senha inválidos.", 401);
      }

      const token = jwt.sign(
        {
          usuario: {
            id: usuarioEncontrado.id,
            usuario: usuarioEncontrado.usuario,
          },
        },
        SECRET,
        {
          expiresIn: "7d",
          algorithm: "HS256",
        }
      );
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsuarioServices();
