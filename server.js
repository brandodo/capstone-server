const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const knex = require("knex")(require("./knexfile.js"));
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "connect-src": [
        "'self'",
        "https://*.spotify.com",
        "https://www.google-analytics.com",
        "https://*.ingest.sentry.io/",
        "https://stats.g.doubleclick.net/j/*",
      ],
    },
  })
);

app.use(
  cors({
    origin: [
      "https://aim-beats-game.herokuapp.com",
      "https://aim-beats-game.herokuapp.com/",
    ],
    credentials: true,
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept",
    ],
  })
);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
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

app.use("/auth", authRoutes);
app.use("/score", scoreRoute);

app.listen(PORT, () => {
  console.log(`Server initialized on port ${PORT} 🚀`);
});
