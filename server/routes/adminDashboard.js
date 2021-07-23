// For client-admin
const pool = require("../db");
const router = require("./jwtAuth");

router.get("/", authorization, async (req, res) => {
  try {
    const currSchool = await pool.query(
      "SELECT school_id FROM school_relations WHERE user_id = '$1'",
      [req.user]
    ); //84159fc5-6d07-4c53-a6ab-3c8735f8b166

    const totalStudents = await pool.query(
      "SELECT COUNT(DISTINCT user_id) FROM school_relations WHERE school_id = '4cc70458-2265-41f5-9e1e-e24b8e5f4f89'",
      [currSchoo.school_id]
    );

    const totalRespondedToday = await pool.query(
      "SELECT COUNT(DISTINCT users.user_id) FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = '$1' AND date_time BETWEEN '2021-07-23' AND '2021-07-24'",
      [currSchool.school_id]
    );

    const overallResponse = await pool.query(
      "SELECT users.user_name, schools.school_name, answers.answer1, answers.answer2, answers.answer3, answers.answer4, answers.answer5, answers.date_time FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = '$1' AND date_time BETWEEN '2021-07-23' AND '2021-07-24'",
      [currSchool.school_id]
    );

    const toReturn = {
      totalStudents: totalStudents,
      totalRespondedToday: totalRespondedToday,
      overallResponse: JSON.stringify(overallResponse),
    };

    res.json(toReturn);
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
