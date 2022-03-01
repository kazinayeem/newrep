const express = require("express");
const { signup, login, getuser } = require("../controller/userController.js");
const router = express.Router();
const checklogin = require("../middleware/checklogin");
//router.get("/",)
router.post("/signup", signup);
router.post("/login", login);
router.get("/user",getuser);

module.exports = router;
