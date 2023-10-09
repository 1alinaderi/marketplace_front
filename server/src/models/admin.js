const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  acceptCode: { type: Number, required: true },
  status: { type: Boolean, required: true },
  address: { type: String },
  VIP: { type: Boolean, required: true },
});
UserSchema.plugin(timestamp);

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  prouductId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Prouduct",
  },
  status: { type: String, required: true },
  payed: { type: Boolean, required: true },
  amount: { type: Number, required: true },
});
OrderSchema.plugin(timestamp);

const ProuductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  owner: { type: String, required: true },
  specialPrice: { type: Number },
  category: { type: mongoose.Types.ObjectId, required: true, ref: "Category" },
  soldCount: { type: Number, required: true, default: 0 },
  balance: { type: Number, required: true },
  image: { type: String },
  visit: { type: Number, required: true, default: 0 },
});
ProuductSchema.plugin(timestamp);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
});

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  image: { type: String },
  soldCount: { type: Number, required: true, default: 0 },
});
SupplierSchema.plugin(timestamp);

const Order = mongoose.model("Order", OrderSchema);
const User = mongoose.model("User", UserSchema);
const Supplier = mongoose.model("Supplier", SupplierSchema);
const Prouduct = mongoose.model("Prouduct", ProuductSchema);
const Category = mongoose.model("Category", CategorySchema);
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = { User, Prouduct, Supplier, Category, Order, Admin };
