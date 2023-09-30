const controller = require("../controller");
const refrallCode = require("referral-codes");

module.exports = new (class extends controller {
  async getAll(req, res) {
    if (req?.query?.id) {
      const packages = await this.Package.findOne({ id: req.query.id });
      this.response({
        res,
        message: "succesfull",
        code: 200,
        data: packages,
      });
    } else {
      const packages = await this.Package.find();

      this.response({
        res,
        message: "succesfull",
        code: 200,
        data: packages,
      });
    }
  }

  async add(req, res) {
    const packagee = new this.Package({
      price: req.body.price,
      id: req.body.id,
      time: req.body.time,
      benfit: req?.body?.benfit,
    });

    await packagee
      .save()
      .then(() => {
        this.response({
          res,
          message: "package created",
          code: 201,
          data: packagee,
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

  async updateBenfit(req, res) {
    const { id, benfit } = req.body;

    const packagee = await this.Package.findOneAndUpdate(
      { id: id },
      { benfit: benfit }
    );

    await packagee
      .save()
      .then(() => {
        this.response({
          res,
          message: "package updated",
          code: 200
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

  async updatePrice(req, res) {
    const { id,  price } = req.body;

    const packagee = await this.Package.findOneAndUpdate(
      { id: id },
      { price: price }
    );

    await packagee
      .save()
      .then(() => {
        this.response({
          res,
          message: "package updated",
          code: 200
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
})();
