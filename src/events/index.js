const UsuarioEventos = require("./UsuarioEventos");
const validaToken = require("../utils/validaToken");
const AmizadeEventos = require("./AmizadeEventos");
const MensagemEventos = require("./MensagemEventos");
const {
  usuariosConectados,
  conectarUsuaio,
  desconectarUsuaio,
} = require("../events/usuariosConectados");

require("dotenv").config();

function registrarEventos(io) {
  io.on("connection", (socket) => {
    const token = validaToken(socket.handshake.auth.token);
    if (token) {
      const { id } = token.usuario;
      socket.usuarioId = id;
      conectarUsuaio(id, socket.id);
      console.log("usuario conectado", id);
    }

    AmizadeEventos(socket, io);
    UsuarioEventos(socket, io);
    MensagemEventos(socket, io);

    socket.on("disconnect", () => {
      const id = socket.usuarioId;
      if (id) {
        desconectarUsuaio(id);
        console.log("usuario desconectado", id);
      }
    });
  });
}

module.exports = { registrarEventos };
