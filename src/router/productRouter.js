const express = require("express");
const { addproduct,deleteproduct,allproduct,userproducts} = require("../controller/productControlle");
const router = express.Router();
const checklogin = require("../middleware/checklogin");



router.post("/addproduct",checklogin, addproduct);
router.delete("/:id",checklogin, deleteproduct);
router.get("/",checklogin,allproduct);
router.get("/userproducts",checklogin,userproducts);




module.exports = router;
