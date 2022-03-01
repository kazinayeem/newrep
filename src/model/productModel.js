const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  order: {
    type: String,
    enum: ["panding", "done", "ongoing"],
  },
  date: {
    type: String,
    required: true,
    default: new Date().toString(),
  },
  price: {
    type: Number,
    required: true,
  },

  user: {
    required: true,
    ref : "user",
    type: mongoose.Schema.Types.ObjectId
  }, 
},{
  timestamps : true
});

const productModel =new mongoose.model("product", productschema);
module.exports = productModel;
