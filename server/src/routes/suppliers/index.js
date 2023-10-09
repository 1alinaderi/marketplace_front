const express = require("express");
const { isAdmin } = require("../../middlewares/isAdmin");
const upload = require("../../middlewares/upload");
const router = express.Router();
const controller = require("./controller");

router.post(
  "/create",
  isAdmin ,
  controller.validate,
  upload.single("image"),
  controller.create
);

router.get("/prouducts/:name", controller.getProuducts);
router.get("/best", controller.getBest);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);


module.exports = router;
