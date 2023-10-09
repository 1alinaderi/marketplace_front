const path = require("path")
const multer = require("multer")
const { createBrotliCompress } = require("zlib")

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null , "uploads")
    },
    filename: function (req,file,cb){
        cb(null , "market" + Date.now() + file.originalname)
    }
})

const upload = multer({
    storage:storage,
    fileFilter: function(req, file , callback){
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            callback(null , true)
        }else {
            console.log("only png and jpg file")
            callback(null , false)
        }
    },
    limits:{
       fileSize : 1024 * 1024 * 2 ,
    } 
})

module.exports = upload 