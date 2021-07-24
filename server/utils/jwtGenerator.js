//For generation of JWT token

const jwt = require("jsonwebtoken");
require("dotenv").config(); // allow access to all environment variables

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" }); //Signs the token. Times out in 1hr
}

module.exports = jwtGenerator;
