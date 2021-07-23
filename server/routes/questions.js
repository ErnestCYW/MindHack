const router = require("express").Router();
const pool = require("../db");

router.post("/submit", async (req, res) => {
  try {
    const addScore1 = await pool.query(
      "INSERT INTO question1 (user_id, date_time, score) VALUES ($1, NOW(), $2)",
      [req.user, req.score1]
    );
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
