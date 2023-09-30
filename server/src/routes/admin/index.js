const express = require("express");
const router = express.Router();
const controller = require("./controller")




router.post("/login" ,
    controller.validate,
    controller.login
)

router.post("/islogined" ,
    controller.validate,
    controller.islogined
)



module.exports = router