const express = require("express");
const app = express();
const cors = require("cors");
const requestIp = require("request-ip");

const mongoose = require("mongoose");
const config = require("config");
const router = require("./src/routes");

const corsOptions = {
  // origin: "https://urameta.net",
  origin: "http://localhost:3001",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.set('trust proxy', true)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  console.log(req.headers['x-real-ip'])
  res.send(`Welcome to Urameta Api `);
});

mongoose
  .connect(config.get("db.address"))
  .then(() => console.log("conntect to mongodb"))
  .catch((e) => console.log(`could not connect ${e}`));

app.use("/api", router);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listinig on port ${port}`));
