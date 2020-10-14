const express = require("express");
const app = express();

const sequelize = require("./utils/database");
const bodyParser = require("body-parser");

const userRouter = require("./Routes/user");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(expressLayouts);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/user", userRouter);

const Trainee = require("./Models/user.model.js");
(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();
// sequelize.sync({ force: true }).then((result) => {});

app.listen(5000, () => {
  console.log(`server is listening at my port 5000`);
});