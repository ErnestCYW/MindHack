//Checks if JWT token is valid in order to access private routes

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token"); //from client side

    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    //one line to check if jwtToken is valid
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize");
  }

  next();
};
