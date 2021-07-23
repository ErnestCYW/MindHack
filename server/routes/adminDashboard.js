// For client-admin
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const question1 = await pool.query(
      "SELECT * FROM question1 LEFT JOIN users ON question1.user_id = users.user_id LEFT JOIN school_relations ON users.user_id = school_relations.user_id;"
    );
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
