const controller = require("../controller");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../middlewares/isAdmin");

module.exports = new (class extends controller {
  async create(req, res) {
    const category = new this.Category({
      name: req.body.name,
    });
    if (req.file) {
      category.image = req.file.path;
    }
    category
      .save()
      .then(() => {
        this.response({
          res,
          message: "successfuly create category",
        });
      })
      .catch((e) => {
        this.response({
          res,
          message: "failed to create check the field you sent",
          data: e,
        });
      });
  }

  async getall(req, res) {
    if (req.query.name) {
      const product = await this.Category.find({ name: req.query.name });
      this.response({
        res,
        message: "successful",
        data: product,
      });
    } else if (req.query.id) {
      const product = await this.Category.find({ id: req.query.id });
      this.response({
        res,
        message: "successful",
        data: product,
      });
    } else {
      const allProduct = await this.Category.find();
      this.response({
        res,
        message: "successful",
        data: allProduct,
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;

    const prouduct = await this.Prouduct.findById(id);

    await prouduct
      .save()
      .then((data, error) => {
        this.response({
          res,
          message: "successful",
          data: data,
        });
      })
      .catch(() => {
        this.response({
          res,
          message: "somthing wrong",
        });
      });
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
      .catch(() => {
        this.response({
          res,
          message: "somthing wrong",
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
