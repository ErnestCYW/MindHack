// For students (questions)
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

        const toReturn = {
            user_name: user.rows[0].user_name,
            messages: JSON.stringify(messages.rows)
        }

        res.json(toReturn);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;
