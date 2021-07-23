const router = require("express").Router();
const pool = require("../db");

router.post("/submit", async (req, res) => {
  try {
    const response = await pool.query(
      "INSERT INTO answers (user_id, date_time, answer1, answer2, answer3, answer4, answer5) VALUES ($1, NOW(), $2, $3, $4, $5,6)",
      [
        req.user,
        req.answer1,
        req.answer2,
        req.answer3,
        req.answer4,
        req.answer5,
      ]
    );
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
