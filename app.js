const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();
app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.options("*", cors());
app.use(express.json());

//routes import
const authorizationRoute = require("./routes/userRoute");

app.use("/api/user/v1", authorizationRoute);

module.exports = app;
