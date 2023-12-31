const jwt = require("jsonwebtoken");
const config = require("config");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    console.log(token);

    if (!token) {
      throw new Error("No token provided");
    }

    const { userId } = jwt.verify(token, config.get("jwt_key"));

    req.body = {
      ...req.body,
      userId,
    };

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const optionallyVerifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return next();

    const decoded = jwt.verify(token, config.get("jwt_key"));
    req.body.userId = decoded.userId;

    next();
  } catch (err) {
    return next();
  }
};

module.exports = { verifyToken, optionallyVerifyToken };
