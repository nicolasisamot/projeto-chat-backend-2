//const usuarioServices = require("../services/UsuarioServices");
const mensagemServices = require("../services/MensagemServices");
const gerenciarErros = require("../utils/gerenciadorErros");
const { obterSocketPorId } = require("../events/usuariosConectados");

function MensagemEventos(socket, io) {
  socket.on("cadastrar_mensagem", async (dados) => {
    try {
      const id = socket.usuarioId;
      dados.remetente_id = id;
      const novaMensagem = await mensagemServices.cadastrarMensagem(dados);
      const socketDestinatario = obterSocketPorId(dados.destinatario_id);
      if (socketDestinatario) {
        io.to(socketDestinatario).emit(
          "nova_mensagem_sucesso_interface",
          novaMensagem
        );
      }
      socket.emit("nova_mensagem_sucesso_interface", novaMensagem);
    } catch (error) {
      console.log(error);
      const erro = gerenciarErros(error);
      //socket.emit("cadastrar_usuario_erro_interface", erro);
    }
  });
}
module.exports = MensagemEventos;
