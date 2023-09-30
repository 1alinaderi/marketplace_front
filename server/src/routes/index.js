const express = require('express')
const router = express.Router();
const userRouter = require("./user")
const packageRouter = require("./package")
const adminRouter = require("./admin")
const websiteRouter = require("./website")


router.use("/user" , userRouter);
router.use("/package" , packageRouter);
router.use("/admin" , adminRouter);
router.use("/website" , websiteRouter);

module.exports = router