require("dotenv").config();
const Services = require("./Services");
const db = require("../models/index");
const ErroValidacao = require("../errors/ErroValidacao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { raw } = require("mysql2");

const SECRET = process.env.SECRET;

class AmizadeServices extends Services {
  constructor() {
    super("Amizade");
  }
  async cadastrarAmizade(novaAmizade) {
    await db[this.model].create(novaAmizade);
    try {
    } catch (error) {
      throw error;
    }
  }

  async pegarAmigos(id) {
    try {
      const amigos = await db[this.model].findAll({
        raw: true,
        where: {
          status: "aceito",
          [Op.or]: [{ remetente_id: id }, { destinatario_id: id }],
        },
        include: [
          {
            model: db.Usuario,
            as: "Remetente",
            attributes: ["usuario", "id"],
          },
          {
            model: db.Usuario,
            as: "Destinatario",
            attributes: ["usuario", "id"],
          },
        ],
      });

      const amigosFormatados = amigos.map((amigo) => {
        const Amigo = {
          id:
            amigo["Remetente.id"] == id
              ? amigo["Destinatario.id"]
              : amigo["Remetente.id"],
          usuario:
            id == amigo["Remetente.id"]
              ? amigo["Destinatario.usuario"]
              : amigo["Remetente.usuario"],
        };
        return {
          ...Amigo,
          conversa_id: amigo.id,
          data_ultima_mensagem: amigo.data_ultima_mensagem,
          mensagens: [],
        };
      });
      return amigosFormatados;
    } catch (error) {
      throw error;
    }
  }

  async enviarSolicitacaoAmizade(dados) {
    try {
      const usuarioEncontrado = await db["Usuario"].findOne({
        raw: true,
        where: {
          usuario: dados.busca,
        },
      });

      if (!usuarioEncontrado) {
        throw new ErroValidacao("Usuário inexistente.", 409, {
          usuarioNaoEncontradoErro: true,
        });
      }
      const amizade = await db[this.model].findOne({
        raw: true,
        where: {
          [Op.or]: [
            {
              remetente_id: dados.usuarioId,
              destinatario_id: usuarioEncontrado.id,
            },
            {
              remetente_id: usuarioEncontrado.id,
              destinatario_id: dados.usuarioId,
            },
          ],
        },
      });

      if (amizade?.status == "pendente") {
        throw new ErroValidacao("Solicitação pendente.", 409, {
          pedidoJaRealizadoErro: true,
        });
      }
      if (amizade?.status == "aceito") {
        throw new ErroValidacao("Usuário ja adicionado.", 409, {
          usuarioJaAdicionadoErro: true,
        });
      }
      if (!amizade) {
        await db[this.model].create({
          remetente_id: dados.usuarioId,
          destinatario_id: usuarioEncontrado.id,
          status: "pendente",
        });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AmizadeServices();
