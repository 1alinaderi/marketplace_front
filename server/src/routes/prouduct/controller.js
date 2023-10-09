const controller = require("../controller");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../middlewares/isAdmin");
const { default: mongoose } = require("mongoose");

module.exports = new (class extends controller {
  async create(req, res) {
    const product = new this.Prouduct({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      owner: req.body.owner,
      specialPrice: req.body.specialPrice ? req.body.specialPrice : 0,
      category: req.body.category,
      balance: req.body.balance,
    });
    if (req.file) {
      product.image = req.file.path;
    }
    product
      .save()
      .then(() => {
        this.response({
          res,
          message: "successfuly create product",
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
    const query = req.query;

    if (req.query.category) {
      const categories = query.category.split(",");
      const categoryDataBase = await this.Category.find();
      const allProduct = await this.Prouduct.find();

      let data = [];

      await categories.map((category) => {
        for (let index1 = 0; index1 < categoryDataBase.length; index1++) {
          if (categoryDataBase[index1].name == category) {
            for (let index = 0; index < allProduct.length; index++) {
              console.log(
                categoryDataBase[index1].id,
                allProduct[index].category.cacheHexStrin
              );
              if (categoryDataBase[index1].equals(allProduct[index].category)) {
                data.push(allProduct[index]);
              }
            }
          }
        }
      });

      this.response({
        res,
        message: "successful",
        data: data,
      });
    } else {
      const allProduct = await this.Prouduct.find();
      this.response({
        res,
        message: "successful",
        data: allProduct,
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;

    try {
      const prouduct = await this.Prouduct.findById(id);

      this.response({
        res,
        message: "successful",
        data: prouduct,
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
