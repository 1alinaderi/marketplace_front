const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifyToken } = require("../../middlewares/auth");

router.get("/:id", controller.getById);
router.get("/", controller.getAll);

router.post("/sign", controller.validate, controller.sign);
router.post("/VIP", verifyToken, controller.VIP);
router.post(
  "/addAddress",
  verifyToken,
  controller.validate,
  controller.addAddress
);

router.post("/sign/accept", controller.validate, controller.accept);
router.post("/sign/google", controller.validate, controller.signGoogle);

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
