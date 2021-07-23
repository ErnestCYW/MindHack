const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, username, email, password, password2 } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists!"); //see 401 and 403 codes!
    }

    const existingUsername = await pool.query(
      "SELECT * FROM user_username WHERE username = $1",
      [username]
    );

    if (existingUsername.rows.length !== 0) {
      return res.status(401).json("Username is taken!");
    }

    //3. Bcrypt the user password (see npm bcrypt documentation)

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound); //note: await is for async functions

    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter the new user inside our database

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const newUsername = await pool.query(
      "INSERT INTO user_username (user_id, username) VALUES ($1, $2)",
      [newUser.rows[0].user_id, username]
    );

    //5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Login route
router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    let errors = {};

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      errors.email = "No user found";
      return res.json(errors);
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      errors.password = "Incorrect password";
    }

    if (Object.keys(errors).length !== 0) {
      return res.json(errors);
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Private Routes
router.get("/is-verify", authorization, async (req, res) => {
  try {
    //Because of timeout may need to relogin to reverify
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
