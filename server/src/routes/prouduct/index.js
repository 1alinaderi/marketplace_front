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

router.get("/", controller.getall);
router.get("/discount", controller.discount);
router.get("/mostVisited", controller.mostVisited);

router.get("/:id", controller.getById);
router.get("/addVisit/:id", controller.addVisit);


module.exports = router;
