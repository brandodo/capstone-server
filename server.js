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
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      connectSrc: [
        "'self'",
        "'https://stats.g.doubleclick.net/j/collect?t=dc&aip=1&_r=3&v=1&_v=j96&tid=UA-5784146-31&cid=1621880410.1611552505&jid=1487827398&gjid=2043681754&_gid=1987416524.1650598599&_u=QCCAiEABBAAAAE~&z=1253668311'",
        "'https://*.spotify.com'",
        "'https://www.google-analytics.com'",
        "'https://*.ingest.sentry.io/'",
      ],
    },
  })
);

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
