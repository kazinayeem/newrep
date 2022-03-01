const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const db = require("./config/db");
const expressfile = require("express-fileupload");
const parser = require("body-parser");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(expressfile());
app.use(express.static(__dirname+ "/controller/"))
// database
db();

app.use("/", userRouter);
app.use("/product/", productRouter);

app.listen(process.env.PORT);
