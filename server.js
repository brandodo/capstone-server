const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const knex = require("knex")(require("./knexfile.js"));
const knexSessionStore = require("connect-session-knex")(expressSession);
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const sessionOptions = {
  store: new knexSessionStore({
    knex: knex,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 31556952000,
  }),
};

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionOptions.store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_REDIRECT_URL,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      knex("users")
        .select("spotify_id")
        .where({ spotify_id: profile.id })
        .then((user) => {
          if (user.length) {
            done(null, user[0]);
          } else {
            knex("users")
              .insert({
                spotify_id: profile.id,
                photo: profile.photos[0].value,
                username: profile.username,
                display_name: profile.displayName,
                country: profile.country,
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expires_in,
              })
              .then((userId) => {
                done(null, { spotify_id: userId[0] });
              })
              .catch((err) => {
                console.log("Error creating a user", err);
              });
          }
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser (user object):", user);

  done(null, user.spotify_id);
});

passport.deserializeUser((userId, done) => {
  knex("users")
    .where({ spotify_id: userId })
    .then((user) => {
      done(null, user[0]);
    })
    .catch((err) => {
      console.log("Error finding user", err);
    });
});

const authRoutes = require("./routes/auth");
const scoreRoute = require("./routes/score");
const { session } = require("passport");

app.use("/auth", authRoutes);
app.use("/score", scoreRoute);

app.listen(PORT, () => {
  console.log(`Server initialized on port ${PORT} 🚀`);
});
