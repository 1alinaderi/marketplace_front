const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async getData(req, res) {
    const userIP = req.headers["x-real-ip"];

    const websiteData = await this.WebsiteData.findOne();

    let newIp = true;
    await websiteData?.visitors.map((e) => {
      if (e === userIP) {
        newIp = false;
      }
    });

    const buyedpackage = await this.User.count({'packageID': {$ne : "" }})



    if (newIp && userIP != null) {
      await websiteData.visitors.push(userIP);
      await websiteData.save().then(() => {
        this.response({
          res,
          message: "successfull",
          code: 200,
          data: {websiteData , buyedpackage},
        });
      });
    } else {
      this.response({
        res,
        message: "successfull",
        code: 200,
        data: {websiteData , buyedpackage},
      });
    }
  }

  async addData(req, res) {
    const body = req.body;

    const websiteData = await this.WebsiteData.findOneAndUpdate(
      { _id: "64f3313e3dc8451076f4cc3f" },
      body
    );

    await websiteData
      .save()
      .then(() => {
        this.response({
          res,
          message: "successfull",
          code: 200,
        });
      })
      .catch(() => {
        this.response({
          res,
          message: "error",
          code: 400,
        });
      });
  }

  async alluser(req, res) {
    const users = await this.User.find();

    if (users) {
      this.response({
        res,
        message: "successfull",
        code: 200,
        data: users,
      });
    } else {
      this.response({
        res,
        message: "error",
        code: 400,
      });
    }
  }
})();
