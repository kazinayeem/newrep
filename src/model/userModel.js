const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userproduct: [{
    
      ref: "product",
      type: mongoose.Schema.Types.ObjectId,
    }],
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model("user", userschema);
module.exports = userModel;
