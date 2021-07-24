//Entry point into backend server

const express = require("express");
const cors = require("cors");

//App config
const app = express();
const port = process.env.PORT || 5000; //Runs on localhost port 5000 if env port not found

//middleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//Student Dashboard route
app.use("/studentDashboard", require("./routes/studentDashboard"));

//Admin Dashboard Route
app.use("/adminDashboard", require("./routes/adminDashboard"));

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
