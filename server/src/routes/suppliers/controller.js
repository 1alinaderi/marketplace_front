const controller = require("../controller");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../middlewares/isAdmin");

module.exports = new (class extends controller {
  async create(req, res) {
    const supplier = new this.Supplier({
      name: req.body.name,
      bio: req.body.bio,
    });
    if (req.file) {
      supplier.image = req.file.path;
    }
    supplier
      .save()
      .then(() => {
        this.response({
          res,
          message: "successfuly create supplier",
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

  async getBest(req, res) {
    const suppliers = await this.Supplier.find().sort({ soldCount: -1 });

    if (suppliers) {
      this.response({
        res,
        message: "successfull",
        data: suppliers,
      });
    } else {
      this.response({
        res,
        message: "failed",
      });
    }
  }

  async getProuducts(req, res) {
    const supplierName = req.params.name;

    const prouducts = await this.Prouduct.find({ owner: supplierName });

    if (prouducts) {
      this.response({
        res,
        message: "successfull",
        data: prouducts,
      });
    } else {
      this.response({
        res,
        message: "failed",
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;

    await this.Supplier.findById(id)
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

  async getAll(req, res) {
    await this.Supplier.find()
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
})();
