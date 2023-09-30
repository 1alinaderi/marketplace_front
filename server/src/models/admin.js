const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

InvitedPeopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wallet: { type: String, required: true },
});
const AdminSchema = new mongoose.Schema({
  password: { type: String, required: true },
  wallet: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  wallet: { type: String, required: true },
  refCode: { type: String, required: true, unique: true },
  inviteCode: { type: String },
  packageID: { type: Number },
  InvitedPeople: [InvitedPeopleSchema],
  withdrawTime: { type: Number },
  UraBalance: { type: Number },
  withdrawBalance: { type: Number },
});
UserSchema.plugin(timestamp);

const PackageSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  id: { type: Number, required: true },
  time: { type: String, required: true },
  benfit: { type: Number, required: true },
});

const WebsiteSchema = new mongoose.Schema({
  visitors: [{type : String , unique : true}],
  aboutText: { type: String },
  Commitment: { type: String },
  whatIsUra: { type: String },
  whyBuyUra: { type: String },
  twiteer: { type: String },
  facebook: { type: String },
  youtube: { type: String },
  tiktok: { type: String },
  telegram: { type: String },
  instagram: { type: String },
});

const User = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Package = mongoose.model("Package", PackageSchema);
const WebsiteData = mongoose.model("WebsiteData", WebsiteSchema);

module.exports = { User, Package, Admin, WebsiteData };
