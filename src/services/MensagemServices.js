require("dotenv").config();
const Services = require("./Services");
const db = require("../models/index");
const ErroValidacao = require("../errors/ErroValidacao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { raw } = require("mysql2");

const SECRET = process.env.SECRET;

class MensagemServices extends Services {
  constructor() {
    super("Mensagem");
  }
  async cadastrarMensagem(dados) {
    try {
      const novaMensagem = await db[this.model].create(dados);
      const atualizarDataUltimaMensagem = await db["Amizade"].update(
        {
          data_ultima_mensagem: novaMensagem.createdAt,
        },
        {
          where: {
            id: dados.conversa_id,
          },
        }
      );
      return novaMensagem;
    } catch (error) {
      throw error;
    }
  }
  async pegarConversas(conversasIds) {
    try {
      const mensagens = await db[this.model].findAll({
        raw: true,
        where: {
          conversa_id: {
            [Op.in]: conversasIds,
          },
        },
      });

      return mensagens;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MensagemServices();
