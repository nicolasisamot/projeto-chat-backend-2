"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Amizade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Amizade.belongsTo(models.Usuario, {
        foreignKey: "remetente_id",
        as: "Remetente",
      });
      Amizade.belongsTo(models.Usuario, {
        foreignKey: "destinatario_id",
        as: "Destinatario",
      });
    }
  }
  Amizade.init(
    {
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["pendente", "aceito", "negado"]],
            msg: "Campo status deve ser pendente, pendente e negado.",
          },
          notNull: {
            msg: "Campo status é obrigatório.",
          },
          notEmpty: {
            msg: "Campo status não pode ser vazio.",
          },
        },
      },
      data_ultima_mensagem: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: "Amizade",
      tableName: "amizades",
      timestamps: true,
      paranoid: true,
    }
  );
  return Amizade;
};
