require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
function validaToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}

module.exports = validaToken;
