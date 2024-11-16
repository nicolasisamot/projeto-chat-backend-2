const usuarioServices = require("../services/UsuarioServices");
const gerenciarErros = require("../utils/gerenciadorErros");

function UsuarioEventos(socket) {
  socket.on("cadastrar_usuario", async (dados) => {
    try {
      await usuarioServices.cadastrarUsuario(dados);
      socket.emit("cadastrar_usuario_sucesso_interface", dados);
    } catch (error) {
      const erro = gerenciarErros(error);
      socket.emit("cadastrar_usuario_erro_interface", erro);
    }
  });
  socket.on("fazer_login", async (dados) => {
    try {
      const token = await usuarioServices.fazerLogin(dados);
      socket.emit("fazer_login_sucesso_interface", { token });
    } catch (error) {
      const erro = gerenciarErros(error);
      socket.emit("fazer_login_erro_interface", erro);
    }
  });
}
module.exports = UsuarioEventos;
