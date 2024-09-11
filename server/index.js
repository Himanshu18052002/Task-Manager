const express = require("express");
const cors = require("cors");
const connection = require("./model/connection.js");
const dotenv = require("dotenv");
dotenv.config();

var whitelist = ["http://localhost:4200", "http://localhost:8000"];
var corsOptions = {
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: "*",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 3000;

connection();

app.use("/api/v1", require("./routes/userRoutes"));
app.use("/api/v1", require("./routes/taskRoutes.js"));
app.use("/api/v1", require("./routes/categoryRoutes.js"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
