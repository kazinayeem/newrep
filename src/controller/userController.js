const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getuser = async (req, res) => {
  try {
    const result = await userModel
      .find({})
      .populate("userproduct", "-_id -__v -updatedAt -createdAt");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
const signup = async (req, res) => {
  const password = req.body.password;

  try {
    const hash_password = await bcrypt.hash(password, 10);

    // check user
    const alreadyexit = await userModel.find({ email: req.body.email });

    if (alreadyexit.length > 0) {
      res.status(201).json({
        message: "user already exit please try another email",
      });
    } else {
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hash_password,
      });

      await user.save();
      res.status(200).json({
        message: "user signup successfull",
      });
    }
  } catch (error) {
    res.status(201).json({
      message: "server error sv",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkuser = await userModel.find({ email: email });
    if (checkuser.length > 0) {
      const checkpass = await bcrypt.compare(password, checkuser[0].password);
      if (checkpass) {
        const token = jwt.sign(
          {
            name: checkuser[0].name,
            email: checkuser[0].email,
            id: checkuser[0]._id,
          },
          "token",
          {
            expiresIn: "10h",
          }
        );

        res.status(200).json({
          message: "user login successfull",
          token: token,
        });
      } else {
        res.status(201).json({
          message: "password is wrong !",
        });
      }
    } else {
      res.status(201).json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(201).json({
      message: "server error",
    });
  }
};

module.exports = {
  signup,
  login,
  getuser,
};
