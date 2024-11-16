"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mensagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mensagem.belongsTo(models.Usuario, {
        foreignKey: "remetente_id",
        as: "Remetente",
      });
      Mensagem.belongsTo(models.Usuario, {
        foreignKey: "destinatario_id",
        as: "Destinatario",
      });
    }
  }
  Mensagem.init(
    {
      conversa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo conversa_id é obrigatório.",
          },
          notEmpty: {
            msg: "Campo conversa_id pode ser vazio.",
          },
        },
      },
      mensagem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo mensagem é obrigatório.",
          },
          notEmpty: {
            msg: "Campo mensagem pode ser vazio.",
          },
        },
      },

      remetente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo remetente_id é obrigatório.",
          },
          notEmpty: {
            msg: "Campo remetente_id pode ser vazio.",
          },
        },
      },
      destinatario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo destinatario_id é obrigatório.",
          },
          notEmpty: {
            msg: "Campo destinatario_id pode ser vazio.",
          },
        },
      },
    },

    {
      sequelize,
      modelName: "Mensagem",
      tableName: "mensagens",
      timestamps: true,
      paranoid: true,
    }
  );
  return Mensagem;
};
