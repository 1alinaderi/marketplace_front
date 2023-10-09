const express = require("express");
const { isAdmin } = require("../../middlewares/isAdmin");
const upload = require("../../middlewares/upload");
const router = express.Router();
const controller = require("./controller");
const { verifyToken } = require("../../middlewares/auth");

router.post("/create", verifyToken, controller.validate, controller.create);
router.get("/:id", controller.getById);
router.get("/", controller.getall);

// router.get("/", controller.getall);
// router.get("/discount", controller.discount);
// router.get("/mostVisited", controller.mostVisited);

// router.get("/addVisit/:id", controller.addVisit);

module.exports = router;
