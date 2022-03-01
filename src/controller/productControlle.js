const productModel = require("../model/productModel");
const userModel = require("../model/userModel.js");
const path = require("path");
const fs = require("fs");

const addproduct = async (req, res) => {
  const file = req.files.photo;
  const fileext = path.extname(file.name);
  const filename =
    file.name.replace(fileext, "").toLowerCase().split(" ").join("_") +
    "-" +
    Date.now();
  const orginalfilename = filename + fileext;

  const product = new productModel({
    ...req.body,
    user: req.user.id,
    photo: orginalfilename,
  });

  try {
    const pr = await product.save();
    await userModel.updateOne(
      { _id: req.user.id },
      {
        $push: {
          userproduct: pr._id,
        },
      }
    );

    file.mv(`${__dirname}/images/${orginalfilename}`, (error) => {
      if (error) {
        res.send(error);
      } else {
        res.status(200).json({message : "product create"});
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json({
      message: "product create no successfull",
    });
  }
};

const deleteproduct = async (req, res) => {
  // const id = req.params.id;
  try {
    const product = await productModel.find({ _id: req.params.id });
    const photodelete = product[0].photo;
    const id = product[0]._id;

    await productModel.deleteOne({ _id: id });
    fs.unlink(`${__dirname}/images/${photodelete}`, (error) => {
      if (error) {
        res.send("error");
      } else {
        res.send("delete");
      }
    });
  } catch (error) {
    res.send("error");
  }
};

// const allproduct = (req,res) => {
//    productModel.find({})
//    .populate("user")
//    .select({
//        __v : 0
//    })
//    .exec((err,data) => {
//        if(err){
//            console.log(err);
//        }else{
//            res.send(data)
//        }
//    })
// }

const allproduct = async (req, res) => {
 
  try {
    const product = await productModel
      .find({})

      .populate("user", "name email  -_id ")

      .select({
        __v: 0,
      });

    // console.log(product.populate("user"));
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "product not found" });
  }
};


const userproducts = async (req, res) => {

  const id = req.user.id
  try {
    const product = await productModel
      .find({user : id})

      .populate("user", "name email  -_id ")

      .select({
        __v: 0,
      });

    // console.log(product.populate("user"));
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "product not found" });
  }
};
module.exports = {
  addproduct,
  deleteproduct,
  allproduct,
  userproducts
};
