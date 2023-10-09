const config = require("config");
const jwt = require("jsonwebtoken");
const { Admin } = require("./../models/admin");
const nodemailer = require("nodemailer");

async function isAdmin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("access denied");
  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const adminss = await Admin.findById(decoded._id);
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

async function sendEmail(code, to) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("dealerInfo.email"),
      pass: config.get("dealerInfo.password"),
    },
  });

  var mailOptions = {
    from: "alinaderideveloper1@gmail.com",
    to: to,
    subject: "Auth for Website",
    html: `<h1  style="text-align: center;" >Welcome to Website <br/> This is Your Code : <br/> ${code}</h1>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { isAdmin, sendEmail };
