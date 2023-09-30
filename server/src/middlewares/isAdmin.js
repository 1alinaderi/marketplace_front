const config = require("config");
const jwt = require("jsonwebtoken");
const { Admin } = require("./../models/admin");

async function isAdmin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("access denied");
  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const adminss = await Admin.findById(decoded._id);
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

module.exports = { isAdmin };
