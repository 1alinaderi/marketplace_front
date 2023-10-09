const controller = require("../controller");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../middlewares/isAdmin");

const buildToken = (user) => {
  return {
    userId: user._id,
  };
};

const getUserDict = (token, user) => {
  return {
    token,
    name: user.name,
    email: user.email,
    _id: user._id,
    image: user.image,
    status: user.status,
  };
};

module.exports = new (class extends controller {
  async getById(req, res) {
    const userId = req.params.id;

    try {
      const user = await this.User.findById(userId);

      if (user) {
        this.response({
          res,
          message: "success",
          code: 200,
          data: user,
        });
      }
    } catch (error) {
      this.response({
        res,
        message: "can't find user ",
      });
    }
  }

  async getAll(req, res) {
    try {
      const user = await this.User.find();

      if (user) {
        this.response({
          res,
          message: "success",
          code: 200,
          data: user,
        });
      }
    } catch (error) {
      this.response({
        res,
        message: "can't find user ",
      });
    }
  }

  async VIP(req, res) {
    const { userId } = req.body;

    try {
      const user = await this.User.findByIdAndUpdate(userId, { VIP: true });
      this.response({
        res,
        message: "Suucessfull",
      });
    } catch (error) {
      this.response({
        res,
        message: "error ",
        data: error,
      });
    }
  }

  async sign(req, res) {
    const user = new this.User({
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      status: false,
      VIP: false,
    });

    const ran = Math.round(Math.random() * 10000);

    const repateWallet = await this.User.findOne({ email: req.body.email });

    if (repateWallet) {
      this.response({
        res,
        message: "email is already available ",
        code: 400,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user.acceptCode = ran;

      await user
        .save()
        .then(() => {
          sendEmail(ran, req.body.email);
          this.response({
            res,
            message: "user created",
            code: 201,
            data: user,
          });
        })
        .catch((e) => {
          this.response({
            res,
            message: "something wrong",
            code: 400,
            data: e,
          });
        });
    }
  }

  async addAddress(req, res) {
    const { address, userId } = req.body;
    try {
      const user = await this.User.findOneAndUpdate(
        { _id: userId },
        { address: address }
      );

      await user.save();

      this.response({
        res,
        message: "success",
        code: 200,
        data: user,
      });
    } catch (error) {
      this.response({
        res,
        message: "can't find user ",
        data: error,
      });
    }
  }

  async accept(req, res) {
    const { email, code } = req.body;

    const user = await this.User.findOne({ email: email });

    const token = jwt.sign(buildToken(user), config.get("jwt_key"));

    if (user.acceptCode == code) {
      user.status = true;
      await user
        .save()
        .then(() => {
          this.response({
            res,
            message: "successfull",
            code: 201,
            data: getUserDict(token, user),
          });
        })
        .catch((e) => {
          this.response({
            res,
            message: "something wrong",
            code: 400,
            data: {},
          });
        });
    } else {
      this.response({
        res,
        message: "code is wrong",
        code: 400,
        data: {},
      });
    }
  }

  async signGoogle(req, res) {
    const { email } = req.body;

    try {
      const user = await this.User.findOne({ email: email })
        .select("-acceptCode")
        .select("-password");

      if (user) {
        const token = jwt.sign(buildToken(user), config.get("jwt_key"));
        this.response({
          res,
          message: "successfull",
          code: 200,
          data: getUserDict(token, user),
        });
      } else {
        const newUser = await this.User.create({
          email: req.body.email,
          name: req.body.name,
          status: true,
        });
        const token = jwt.sign(buildToken(newUser), config.get("jwt_key"));

        this.response({
          res,
          message: "successfull",
          code: 200,
          data: getUserDict(token, newUser),
        });
      }
    } catch (error) {
      this.response({
        res,
        message: "error",
        code: 400,
        data: error.message,
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await this.User.findOne({ email: email }).select(
      "-acceptCode"
    );

    const token = jwt.sign(buildToken(user), config.get("jwt_key"));

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        this.response({
          res,
          message: "succesfull",
          code: 200,
          data: getUserDict(token, user),
        });
      } else {
        this.response({
          res,
          message: "password fild wrong",
          code: 400,
        });
      }
    } else {
      this.response({
        res,
        message: "user not exist",
        code: 400,
      });
    }
  }

  async forget_password(req, res) {
    const { email } = req.body;

    const user = await this.User.findOne({ email: email });
    const ran = Math.round(Math.random() * 10000);

    if (user) {
      sendEmail(ran, email);
      user.acceptCode = ran;
      await user
        .save()
        .then(() => {
          this.response({
            res,
            message: "succesfull",
            code: 200,
            data: {},
          });
        })
        .catch((e) => {
          this.response({
            res,
            message: "something wrong",
            code: 400,
            data: e,
          });
        });
    } else {
      this.response({
        res,
        message: "user not exist",
        code: 400,
      });
    }
  }

  async change_password(req, res) {
    const { email, password, code } = req.body;

    const user = await this.User.findOne({ email: email });

    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);

    if (user.acceptCode !== code) {
      this.response({
        res,
        message: "wrong code",
        code: 400,
      });
    }

    if (user) {
      await user
        .updateOne({ password: newpassword })
        .then(() => {
          this.response({
            res,
            message: "succesfull",
            code: 200,
            data: user,
          });
        })
        .catch((error) => {
          this.response({
            res,
            message: "cant change password",
            code: 400,
          });
        });
    } else {
      this.response({
        res,
        message: "user is not exist",
        code: 400,
      });
    }
  }
})();
