const express = require("express");
const cors = require("cors");
const http = require("http");
const pool = require("./db");

//App config
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//studentDashboard route
app.use("/studentDashboard", require("./routes/studentDashboard"));

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
