"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Amizade, {
        foreignKey: "remetente_id",
        allowNull: true,
      });
      Usuario.hasMany(models.Amizade, {
        foreignKey: "destinatario_id",
        allowNull: true,
      });
    }
  }
  Usuario.init(
    {
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo usuario é obrigatório.",
          },
          notEmpty: {
            msg: "Campo usuario não pode ser vazio.",
          },
        },
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo senha é obrigatório.",
          },
          notEmpty: {
            msg: "Campo senha não pode ser vazio.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo email é obrigatório.",
          },
          notEmpty: {
            msg: "Campo email não pode ser vazio.",
          },
        },
      },
      ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuarios",
      timestamps: true,
      paranoid: true,
    }
  );
  return Usuario;
};
