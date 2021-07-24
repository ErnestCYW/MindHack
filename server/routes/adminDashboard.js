// For client-admin
const pool = require("../db");
const router = require("express").Router();
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // SQL query to get user name
    const user_name = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    // SQL query to get school name / id of current user
    const currSchool = await pool.query(
      "SELECT schools.school_id, schools.school_name FROM school_relations LEFT JOIN schools ON school_relations.school_id = schools.school_id WHERE school_relations.user_id = $1",
      [req.user]
    );

    // SQL queries to get school's information
    const totalStudents = await pool.query(
      "SELECT COUNT(DISTINCT user_id) FROM school_relations WHERE school_id = $1 ",
      [currSchool.rows[0].school_id]
    );
    const totalRespondedToday = await pool.query(
      "SELECT COUNT(DISTINCT users.user_id) FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = $1 AND date_time::date = CURRENT_DATE",
      [currSchool.rows[0].school_id]
    );
    const overallResponse = await pool.query(
      "SELECT users.user_name, schools.school_name, answers.answer1, answers.answer2, answers.answer3, answers.answer4, answers.answer5, answers.date_time FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = $1 AND date_time::date = CURRENT_DATE",
      [currSchool.rows[0].school_id]
    );
    const dangerStudents = await pool.query(
      "SELECT users.user_name, answers.answer1 + answers.answer2 + answers.answer3 + answers.answer4 + answers.answer5 AS total_score FROM users LEFT JOIN school_relations ON users.user_id = school_relations.user_id LEFT JOIN schools ON school_relations.school_id = schools.school_id LEFT JOIN answers ON answers.user_id = users.user_id WHERE schools.school_id = $1 AND date_time::date = CURRENT_DATE AND (answers.answer1 + answers.answer2 + answers.answer3 + answers.answer4 + answers.answer5) < 10 ORDER BY total_score",
      [currSchool.rows[0].school_id]
    );

    //Return information to client side
    const toReturn = {
      user_name: user_name.rows[0].user_name,
      school: currSchool.rows[0].school_name,
      totalStudents: totalStudents.rows[0].count,
      totalRespondedToday: totalRespondedToday.rows[0].count,
      overallResponse: JSON.stringify(overallResponse.rows),
      dangerStudents: JSON.stringify(dangerStudents.rows),
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
    //Gets particular users daily quiz answers
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

module.exports = router;
