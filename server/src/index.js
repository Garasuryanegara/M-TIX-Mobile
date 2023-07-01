const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");
const verify = require("./middlewares/verify");
const Movies = db.Movie;
// const User = db.User;
// Movies.sync();
// db.sequelize.sync({ alter: true }).then(() => console.log("Sync Completed"));
app.use("/avatar", express.static(`${__dirname}/public/avatar`));
app.use(express.json());
app.use(cors());
app.use(verify);
app.use("/user", routes.userRouter);
app.use("/movie", routes.movieRouter);
app.use("/city", routes.cityRouter);
app.get("/", (req, res) => res.send("sequelize"));

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
