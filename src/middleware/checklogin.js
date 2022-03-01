const jwt = require("jsonwebtoken");
const checklogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decode = jwt.verify(authorization, "token");
    req.user = decode;
    next();
  } catch (error) {
  
    res.status(201).json({
      message: "authorization failure",
    });
  }
};

module.exports = checklogin;
