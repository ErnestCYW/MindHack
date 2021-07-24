const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    //Destructure request
    const { email, password, name, school } = req.body;

    //Checks if user with the same email already exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists!"); //see 401 and 403 codes!
    }

    //Bcrypt the user password (see npm bcrypt documentation)
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //Enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const getSchoolId = await pool.query(
      "SELECT school_id FROM schools WHERE school_name = $1",
      [school]
    );
    const updateSchoolRelation = await pool.query(
      "INSERT INTO school_relations (school_id, user_id) VALUES ($1, $2)",
      [getSchoolId.rows[0].school_id, newUser.rows[0].user_id]
    );

    //Generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    //Return token to client side
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    //Destructure request & initialise errors
    const { email, password } = req.body;
    let errors = {};

    //Find user in database using email
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    //Return error if no user is found
    if (user.rows.length === 0) {
      errors.email = "No user found";
      return res.json(errors);
    }

    //Compare password if it is same as entered
    //NOTE: JWT encrypts the password before storing in database, we do not know the actual password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      errors.password = "Incorrect password";
    }

    //Checks if there are no errors
    if (Object.keys(errors).length !== 0) {
      return res.json(errors);
    }

    //Generates JWT token
    const token = jwtGenerator(user.rows[0].user_id);

    //Return token to client side
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Private routes not accessible by client
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
