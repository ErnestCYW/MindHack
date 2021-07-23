// For students (questions)
const pool = require("../db");
const authorization = require("../middleware/authorization");
const router = require("./jwtAuth");

router.get("/", async (req, res) => {
  console.log("hello");
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    const messages = await pool.query(
      "SELECT school_message_board.message_content, school_message_board.date_time, schools.school_name FROM school_message_board\
            LEFT JOIN schools ON school_message_board.school_id = schools.school_id\
            LEFT JOIN school_relations ON school_relations.school_id = school_message_board.school_id\
            WHERE school_relations.user_id = $1",
      [req.user]
    );

    const quotes = await pool.query("SELECT author_name, content FROM quotes");
    const quote = quotes.rows[Math.floor(Math.random() * quotes.rows.length)];

    /*
        const declaration_time = await pool.query(
            "SELECT author_name, content FROM question ORDER BY date_time DESC \
            WHERE user_id = $1",
            [req.user]
        );
        */

    const toReturn = {
      user_name: user.rows[0].user_name,
      messages: JSON.stringify(messages.rows),
      has_done_daily_declaration: true,
      quote: JSON.stringify(quote),
    };

    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

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
