const controller = require("../controller");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../middlewares/isAdmin");

module.exports = new (class extends controller {
  async create(req, res) {
    const { userId, prouductId, amount } = req.body;

    try {
      const user = await this.User.findById(userId);
      const prouduct = await this.Prouduct.findById(prouductId);

      if (user && prouduct) {
        const order = await this.Order.create({
          userId: userId,
          prouductId: prouductId,
          status: "In Progres",
          payed: true,
          amount: Number(amount),
        });

        prouduct.balance = prouduct.balance - amount;
        prouduct.soldCount = prouduct.soldCount + amount;

        await prouduct.save();

        this.response({
          res,
          message: "successfuly create order",
          data: order,
        });
      }
    } catch (error) {
      this.response({
        res,
        message: "failed to create check the field you sent",
        data: error,
      });
    }
  }

  async paying(req, res) {
    const orderId = req.params.id;

    try {
      const order = await this.Order.findOneAndUpdate(
        { _id: orderId },
        { payed: true, status: "Ready To Send" }
      );

      await order.save();

      this.response({
        res,
        message: "successfuly payed",
      });
    } catch (error) {
      this.response({
        res,
        message: "failed to create check the field you sent",
        data: error,
      });
    }
  }

  async getall(req, res) {
    const allProduct = await this.Order.find().populate("userId").populate("prouductId");
    this.response({
      res,
      message: "successful",
      data: allProduct,
    });
  }

  async getById(req, res) {
    const userId = req.params.id;

    try {
      const order = await this.Order.find({ userId: userId })
        .populate("userId", "-password")
        .populate("prouductId");

      this.response({
        res,
        message: "successful",
        data: order,
      });
    } catch (error) {
      this.response({
        res,
        message: "somthing wrong",
      });
    }
  }

  async addVisit(req, res) {
    const id = req.params.id;
    const prouduct = await this.Prouduct.findById(id);

    prouduct.visit = prouduct.visit + 1;

    await prouduct
      .save()
      .then((data, error) => {
        this.response({
          res,
          message: "successful",
          data: data,
        });
      })
      .catch((error) => {
        this.response({
          res,
          message: "somthing wrong",
          data: error,
        });
      });
  }

  async discount(req, res) {
    const prouduct = await this.Prouduct.find({ specialPrice: { $gt: 1 } });

    if (prouduct) {
      this.response({
        res,
        message: "successful",
        data: prouduct,
      });
    } else {
      this.response({
        res,
        message: "somthing wrong",
      });
    }
  }

  async mostVisited(req, res) {
    const prouduct = await this.Prouduct.find({ visit: { $gt: 1 } });

    if (prouduct) {
      this.response({
        res,
        message: "successful",
        data: prouduct,
      });
    } else {
      this.response({
        res,
        message: "somthing wrong",
      });
    }
  }
})();
