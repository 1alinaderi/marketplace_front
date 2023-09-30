const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { isAdmin } = require("../../middlewares/isAdmin");

router.get("/data", controller.validate, controller.getData);

router.post("/add", controller.validate, isAdmin, controller.addData);

router.get("/getUser", controller.validate, isAdmin, controller.alluser);

module.exports = router;
