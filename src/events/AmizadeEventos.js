//const usuarioServices = require("../services/UsuarioServices");
const amizadeServices = require("../services/AmizadeServices");
const mensagemServices = require("../services/MensagemServices");
const gerenciarErros = require("../utils/gerenciadorErros");

function AmizadeEventos(socket, io) {
  socket.on("cadastrar_amizade", async (dados) => {
    try {
      await amizadeServices.cadastrarAmizade(dados);
      //socket.emit("cadastrar_usuario_sucesso_interface", dados);
    } catch (error) {
      const erro = gerenciarErros(error);
      //socket.emit("cadastrar_usuario_erro_interface", erro);
    }
  });

  socket.on("pegar_conversas", async () => {
    try {
      const id = socket.usuarioId;
      const amigos = await amizadeServices.pegarAmigos(id);
      const conversasIds = amigos.map((amigo) => amigo.conversa_id);
      const conversas = await mensagemServices.pegarConversas(conversasIds);
      for (let i = 0; i < conversas.length; i++) {
        for (let j = 0; j < amigos.length; j++) {
          if (amigos[j].conversa_id == conversas[i].conversa_id) {
            amigos[j].mensagens.push(conversas[i]);
            break;
          }
        }
      }

      socket.emit("pegar_conversas_sucesso_interface", amigos);
    } catch (error) {
      const erro = gerenciarErros(error);
      socket.emit("pegar_conversas_erro_interface", erro);
    }
  });

  socket.on("enviar_solicitacao_amizade", async (dados) => {
    try {
      dados.usuarioId = socket.usuarioId;
      await amizadeServices.enviarSolicitacaoAmizade(dados);
      socket.emit("enviar_solicitacao_amizade_sucesso_interface", dados);
    } catch (error) {
      const erro = gerenciarErros(error);

      socket.emit("enviar_solicitacao_amizade_erro_interface", erro);
    }
  });
}
module.exports = AmizadeEventos;
