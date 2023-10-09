const express = require('express')
const router = express.Router();
const userRouter = require("./user")
const prouductRouter = require("./prouduct")
const categoryRouter = require("./categorys")
const suppliersRouter = require("./suppliers")
const orderRouter = require("./order")
const adminRouter = require("./admin")


router.use("/user" , userRouter);
router.use("/prouduct" , prouductRouter);
router.use("/suppliers" , suppliersRouter);
router.use("/categorys" , categoryRouter);
router.use("/order" , orderRouter);
router.use("/admin" , adminRouter);

module.exports = router