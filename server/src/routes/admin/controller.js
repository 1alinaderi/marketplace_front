const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async login(req, res) {
    const { wallet, password } = req.body;

    const user = await this.Admin.findOne({ wallet: wallet });

    // const salt = await bcrypt.genSalt(10);
    // const rftgyhujiko = await bcrypt.hash("1203Urameta", salt);

    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));

    if (user) {
      await bcrypt.compare(password, user.password).then((data) => {
        if (data) {
          this.response({
            res,
            message: "Successfull",
            code: 200,
            data: { token },
          });
        } else {
          this.response({
            res,
            message: "Wrong Password",
            code: 400,
          });
        }
      });
    } else {
      this.response({
        res,
        message: "User Not Found",
        code: 400,
      });
    }
  }

  async islogined(req, res) {
    const token = req.header("x-auth-token");
    if (!token) res.status(401).send("access denied");
    try {
      const decoded = jwt.verify(token, config.get("jwt_key"));
      const adminss = await this.Admin.findById(decoded._id);
      res.status(201).send("successfull");
    } catch (ex) {
      res.status(400).send("invalid token");
    }
  }
})();
