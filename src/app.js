const { registrarEventos } = require("./events");
//const db = require("../src/models/index.js");
const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

registrarEventos(io);

module.exports = { server, io };
