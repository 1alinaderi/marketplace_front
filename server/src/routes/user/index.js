const express = require("express");
const router = express.Router();
const controller = require("./controller")


router.post("/sign" ,
    controller.validate,
    controller.sign
)

router.post("/login" ,
    controller.validate,
    controller.login
)



router.post("/forget_password" ,
    controller.validate,
    controller.forget_password
)

router.post("/change_password" ,
    controller.validate,
    controller.change_password
)

router.post("/buyPackage",
 controller.validate,
 controller.buyPackage 
)

router.post("/addPeople",
 controller.validate,
 controller.addPeople 
)

router.post("/withdraw",
 controller.validate,
 controller.withdraw 
)

router.get("/getUser",
 controller.validate,
 controller.getuser 
)

module.exports = router