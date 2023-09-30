const controller = require("../controller");
const refrallCode = require("referral-codes");

module.exports = new (class extends controller {
  async sign(req, res) {
    const refCode = refrallCode.generate({
      length: 10,
      count: 1,
    });

    const user = new this.User({
      name: req.body.name,
      password: req.body.password,
      wallet: req.body.wallet,
      inviteCode: req?.body?.inviteCode,
      refCode: refCode[0],
    });

    const repateWallet = await this.User.findOne({ wallet: req.body.wallet });

    if (repateWallet) {
      this.response({
        res,
        message: "wallet is already available ",
        code: 400,
      });
    } else {
      await user
        .save()
        .then(() => {
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
    const { wallet, password } = req.body;

    const user = await this.User.findOne({ wallet: wallet });

    if (user) {
      if (user.password === password) {
        this.response({
          res,
          message: "succesfull",
          code: 200,
          data: user,
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
        message: "wallet fild wrong",
        code: 400,
      });
    }
  }

  async forget_password(req, res) {
    const { wallet } = req.body;

    const user = await this.User.findOne({ wallet: wallet });

    if (user) {
      this.response({
        res,
        message: "succesfull",
        code: 200,
        data: user,
      });
    } else {
      this.response({
        res,
        message: "wallet fild wrong",
        code: 400,
      });
    }
  }

  async change_password(req, res) {
    const { wallet, password } = req.body;

    const user = await this.User.findOne({ wallet: wallet });

    if (user) {
      await user
        .updateOne({ password: password })
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
        message: "wallet fild wrong",
        code: 400,
      });
    }
  }

  async buyPackage(req, res) {
    const packagee = await this.User.findOneAndUpdate(
      { wallet: req.body.wallet },
      { packageID: req.body.packageID }
    );
    if (packagee) {
      await packagee
        .save()
        .then(() => {
          this.response({
            res,
            message: "Package Added",
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
  }

  async addPeople(req, res) {
    const refCodeBody = req.body.refCode;

    if (refCodeBody) {
      const user = await this.User.findOne({ wallet: req.body.wallet });

      const invitedPeopleSchema = {
        name: user.name,
        wallet: user.wallet,
      };

      const invitedUserWas = await this.User.findOneAndUpdate(
        { wallet: req.body.wallet },
        { inviteCode: refCodeBody }
      );
      if (!invitedUserWas) {
        return this.response({
          res,
          message: "Wrong Wallet",
          code: 400,
        });
      }

      const invitedUser = await this.User.findOne({ refCode: refCodeBody });
      if ((invitedUser.wallet = invitedUserWas.wallet)) {
        return this.response({
          res,
          message: "this your ref Code",
          code: 400,
        });
      }
      if (invitedUser) {
        const repeatWallet = await invitedUser.InvitedPeople.find((people) => {
          if (people.wallet === req.body.wallet) {
            return true;
          }
        });
        if (repeatWallet) {
          return this.response({
            res,
            message: "repeat Wallet",
            code: 400,
          });
        }
        await invitedUser.InvitedPeople.push(invitedPeopleSchema);
        await invitedUserWas
          .save()
          .then(async () => {
            await invitedUser
              .save()
              .then(() => {
                this.response({
                  res,
                  message: "refCode Added",
                  code: 201,
                  data: invitedUserWas,
                });
              })
              .catch((error) => {
                this.response({
                  res,
                  message: "something Wrong",
                  code: 400,
                  data: error,
                });
              });
          })
          .catch((error) => {
            this.response({
              res,
              message: "something Wrong",
              code: 400,
              data: error,
            });
          });
      } else {
        this.response({
          res,
          message: "refCode Wrong",
          code: 400,
        });
      }
    } else {
      this.response({
        res,
        message: "check fild",
        code: 400,
      });
    }
  }

  async withdraw(req, res) {
    const { wallet, withdrawTime, UraBalance , withdrawBalance} = req.body;

    const user = await this.User.findOneAndUpdate(
      { wallet: wallet },
      { withdrawTime: withdrawTime, UraBalance: UraBalance , withdrawBalance : withdrawBalance}
    );
    if (user) {
      await user
        .save()
        .then(() => {
          this.response({
            res,
            message: "successfull",
            code: 201,
          });
        })
        .catch(() => {
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
        message: "something wrong",
        code: 400,
        data: e,
      });
    }
  }

  async getuser(req, res) {
    const walletQuery = req.query.wallet;

    const user = await this.User.findOne({ wallet: walletQuery });

    if (user) {
      this.response({
        res,
        message: "succesfull",
        code: 200,
        data: user,
      });
    } else {
      this.response({
        res,
        message: "wrong wallet",
        code: 400,
      });
    }
  }


  
})();
