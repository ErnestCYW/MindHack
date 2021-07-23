// For client-admin
const pool = require("../db");
const router = require("./jwtAuth");

router.get("/", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT users.user_name, schools.school_name, answers.answer1, answers.answer2, answers.answer3, answers.answer4, answers.answer5, answers.date_time FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = '4cc70458-2265-41f5-9e1e-e24b8e5f4f89'"
    );
  } catch (err) {
    console.error(err.message);
  }
});

// Use http://localhost:5000/adminDashboard/?id=placeholder
// Get all records from a single individual
router.get("/individual", async (req, res) => {
  try {
    const { user_id } = req.query;

    const response = await pool.query(
      "SELECT * FROM answers WHERE user_id = '$1' ORDER BY date_time DESC",
      [user_id]
    );

    res(response.json);
  } catch (err) {
    console.error(err.message);
  }
});

// 1 - 5
// 5 being good, 1 being bad
//

// Highlight certain individuals

//

//Get number of people who have responded the form

//Get number of

module.exports = router;
