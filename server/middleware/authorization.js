//Middleware to check if JWT token is valid in order to access private routes

const jwt = require("jsonwebtoken");
require("dotenv").config(); //allows access to environment variable in server/.env

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token"); //from client side

    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    //verify token using JWT and env variable hashing
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    //store payload information in req.user
    req.user = payload.user;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize");
  }

  next();
};
