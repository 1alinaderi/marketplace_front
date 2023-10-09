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
    const adminId = req.params.id;

    const productCount = await this.Prouduct.count();
    const userCount = await this.User.count();
    const suppllierCount = await this.Supplier.count();
    const orderCount = await this.Order.count();
    const soldedProduct = await this.Prouduct.find({ soldCount: { $gt: 0 } });
    let soldValue = 0;

    soldedProduct?.map((item) => {
      const value = item.price * item.soldCount;
      soldValue = soldValue + value;
    });

    try {
      const user = await this.Admin.findById(adminId);

      if (user) {
        this.response({
          res,
          message: "success",
          code: 200,
          data: { productCount, userCount, suppllierCount, orderCount , soldValue },
        });
      }
    } catch (error) {
      this.response({
        res,
        message: "can't find user ",
      });
    }
  }

  async sign(req, res) {
    const user = new this.User({
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      status: false,
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

  async login(req, res) {
    const { email, password } = req.body;

    const admin = await this.Admin.findOne({ email: email });

    const token = jwt.sign(buildToken(admin), config.get("jwt_key"));

    if (admin) {
      const isValid = await bcrypt.compare(password, admin.password);
      if (isValid) {
        this.response({
          res,
          message: "succesfull",
          code: 200,
          data: getUserDict(token, admin),
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
