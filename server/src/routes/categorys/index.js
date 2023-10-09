const express = require("express");
const { isAdmin } = require("../../middlewares/isAdmin");
const upload = require("../../middlewares/upload");
const router = express.Router();
const controller = require("./controller");

router.post(
  "/create",
  // isAdmin ,
  controller.validate,
  upload.single("image"),
  controller.create
);

router.get(
  "/",
  // isAdmin ,
  controller.getall
);


module.exports = router;
