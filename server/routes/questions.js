const router = require("express").Router();
const pool = require("../db");

router.post("/submit", async (req, res) => {
  try {
    const addScore1 = await pool.query(
      "INSERT INTO question1 (user_id, date_time, score) VALUES ($1, NOW(), $2)",
      [req.user, req.score1]
    );

    const addScore2 = await pool.query(
      "INSERT INTO question2 (user_id, date_time, score) VALUES ($1, NOW(), $2)",
      [req.user, req.score2]
    );

    const addScore3 = await pool.query(
      "INSERT INTO question3 (user_id, date_time, score) VALUES ($1, NOW(), $2)",
      [req.user, req.score3]
    );

    const addScore4 = await pool.query(
      "INSERT INTO question4 (user_id, date_time, score) VALUES ($1, NOW(), $2)",
      [req.user, req.score4]
    );

    const addScore5 = await pool.query(
      "INSERT INTO question5 (user_id, date_time, score) VALUES ($1, NOW(), $2)",
      [req.user, req.score5]
    );
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
