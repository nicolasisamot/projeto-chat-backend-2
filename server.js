require("dotenv").config();
const { server } = require("./src/app.js");
const port = process.env.PORT;

server.listen(port, () => {
  console.log("Server rodando na porta", port);
});
