require("dotenv").config();
const config = {
  development: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB,
    dialectOptions: {
      connectTimeout: 60000, // Definir o timeout para 60 segundos
    },
  },
};

module.exports = config;
