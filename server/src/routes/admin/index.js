const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifyToken } = require("../../middlewares/auth");

router.get("/:id", controller.getById);

router.post("/sign", controller.validate, controller.sign);

router.post("/login", controller.validate, controller.login);

router.post(
  "/forget_password",
  verifyToken,
  controller.validate,
  controller.forget_password
);

router.post(
  "/change_password",
  verifyToken,
  controller.validate,
  controller.change_password
);

module.exports = router;
