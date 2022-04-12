const express = require("express");

const expressSession = require("express-session");

const cors = require("cors");

const helmet = require("helmet");

const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const knex = require("knex")(require("./knexfile.js").development);

const app = express();
const PORT = process.env.PORT || 8080;

require("dotenv").config();

app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.listen(PORT, () => {
  console.log("Server initialized 🚀");
});
