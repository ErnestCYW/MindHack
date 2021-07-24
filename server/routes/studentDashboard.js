// For client
const pool = require("../db");
const router = require("./jwtAuth");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // SQL query to get user name
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    // SQL query to get messages from schools user is a part of
    const messages = await pool.query(
      "SELECT school_message_board.message_content, school_message_board.date_time, schools.school_name FROM school_message_board\
            LEFT JOIN schools ON school_message_board.school_id = schools.school_id\
            LEFT JOIN school_relations ON school_relations.school_id = school_message_board.school_id\
            WHERE school_relations.user_id = $1",
      [req.user]
    );

    // SQL query to get a random quote
    const quotes = await pool.query("SELECT author_name, content FROM quotes");
    const quote = quotes.rows[Math.floor(Math.random() * quotes.rows.length)];

    // SQL query and function to determine if the user has declared at least once per day
    const declaration_time = await pool.query(
      "SELECT date_time FROM answers \
            WHERE user_id = $1 ORDER BY date_time DESC LIMIT 1",
      [req.user]
    );
    const currentdate = new Date();
    let has_done_daily_declaration = false;
    if (
      declaration_time.rows.length > 0 &&
      declaration_time.rows[0].date_time.getFullYear() ===
        currentdate.getFullYear() &&
      declaration_time.rows[0].date_time.getMonth() ===
        currentdate.getMonth() &&
      declaration_time.rows[0].date_time.getDate() === currentdate.getDate()
    ) {
      has_done_daily_declaration = true;
    } else {
      has_done_daily_declaration = false;
    }

    //Return information to client side
    const toReturn = {
      user_name: user.rows[0].user_name,
      messages: JSON.stringify(messages.rows),
      has_done_daily_declaration: has_done_daily_declaration,
      quote: JSON.stringify(quote),
    };

    res.json(toReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/submitAnswers", authorization, async (req, res) => {
  try {
    //Add answers into database
    await pool.query(
      "INSERT INTO answers (user_id, date_time, answer1, answer2, answer3, answer4, answer5) VALUES ($1, DEFAULT, $2, $3, $4, $5, $6)",
      [
        req.user,
        req.header("answer1"),
        req.header("answer2"),
        req.header("answer3"),
        req.header("answer4"),
        req.header("answer5"),
      ]
    );
    
    res.json("Answers Submitted!");
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/submitMessage", authorization, async (req, res) => {
  try {
    //Add message into database
    const member_of_school = await pool.query (
      "SELECT school_id FROM school_relations WHERE user_id = $1",
      [req.user]
    )
    await pool.query(
      "INSERT INTO school_message_board (school_id, user_id, message_content, date_time) VALUES ($1, $2, $3, DEFAULT)",
      [member_of_school.rows[0].school_id,req.user,req.header("newMessage")]
    );
    
    res.json("Message Submitted!");
  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;
