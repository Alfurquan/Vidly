const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://alfur:alfur123@ds333238.mlab.com:33238/vidly")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log("could not connect"));

app.use(cors());
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3900;
app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
