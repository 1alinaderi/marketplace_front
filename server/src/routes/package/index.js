const express = require("express");
const router = express.Router();
const controller = require("./controller")



router.get("/",
 controller.validate,
 controller.getAll
)

router.post("/add",
 controller.validate,
 controller.add
)

router.post("/updateBenfit",
 controller.validate,
 controller.updateBenfit
)

router.post("/updatePrice",
 controller.validate,
 controller.updatePrice
)

module.exports = router