const usuariosConectados = new Map();

const conectarUsuaio = (id, socketId) => {
  usuariosConectados.set(id, socketId);
};

const desconectarUsuaio = (id) => {
  usuariosConectados.delete(id);
};

const obterSocketPorId = (id) => {
  return usuariosConectados.get(id);
};
module.exports = {
  usuariosConectados,
  conectarUsuaio,
  desconectarUsuaio,
  obterSocketPorId,
};
