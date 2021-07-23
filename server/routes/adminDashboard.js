// For client-admin
const pool = require("../db");
const router = require("./jwtAuth");

router.get("/", async (req, res) => {
  try {
    const question1 = await pool.query(
      "SELECT users.user_name, schools.school_name, question1.score1, question1.date_time FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN question1 ON question1.user_id = users.user_id WHERE schools.school_id = '4cc70458-2265-41f5-9e1e-e24b8e5f4f89'"
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

    const allQuestion1 = await pool.query(
      "SELECT * FROM question1 WHERE user_id = '$1' ORDER BY date_time DESC",
      [user_id]
    );

    const allQuestion2 = await pool.query(
      "SELECT * FROM question2 WHERE user_id = '$1' ORDER BY date_time DESC",
      [user_id]
    );

    const allQuestion3 = await pool.query(
      "SELECT * FROM question3 WHERE user_id = '$1' ORDER BY date_time DESC",
      [user_id]
    );

    const allQuestion4 = await pool.query(
      "SELECT * FROM question4 WHERE user_id = '$1' ORDER BY date_time DESC",
      [user_id]
    );

    const allQuestion5 = await pool.query(
      "SELECT * FROM question5 WHERE user_id = '$1' ORDER BY date_time DESC",
      [user_id]
    );

    // RETURN ALL
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
