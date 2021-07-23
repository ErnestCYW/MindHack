// For students (questions)
const e = require("express");
const pool = require("../db");
const authorization = require("../middleware/authorization");
const router = require("./jwtAuth");

router.get("/", authorization, async (req, res) => {
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

        const quotes = await pool.query(
            "SELECT author_name, content FROM quotes"
        );
        const quote = quotes.rows[Math.floor(Math.random()*quotes.rows.length)];

        const declaration_time = await pool.query(
            "SELECT date_time FROM answers \
            WHERE user_id = $1 ORDER BY date_time DESC LIMIT 1",
            [req.user]
        );
        const currentdate = new Date();
        let has_done_daily_declaration = false;
        if (declaration_time.rows[0].date_time.getFullYear() === currentdate.getFullYear() && declaration_time.rows[0].date_time.getMonth() === currentdate.getMonth() && declaration_time.rows[0].date_time.getDate() === currentdate.getDate()) {
            has_done_daily_declaration = true;
        } else {
            has_done_daily_declaration = false;
        }

        const toReturn = {
            user_name: user.rows[0].user_name,
            messages: JSON.stringify(messages.rows),
            has_done_daily_declaration: has_done_daily_declaration,
            quote: JSON.stringify(quote)
        };

        res.json(toReturn);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;
