const express = require("express");
const router = express.Router();

const passport = require("passport");
const axios = require("axios");
const knex = require("knex")(require("../knexfile.js"));
const SPOTIFY_REFRESH_URL = "https://accounts.spotify.com/api/token";
const CLIENT_URL = process.env.CLIENT_URL;

require("dotenv").config();

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: [
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-library-modify",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
    ],
    showDialog: true,
  })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: CLIENT_URL }),
  (_req, res) => {
    res.redirect(CLIENT_URL);
  }
);

router.get("/profile", (req, res) => {
  if (req.user == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json(req.user);
});

router.get("/refresh", (req, res) => {
  if (req.user == null) {
    res.status(401).send("No refresh token provided");
  } else {
    const { refresh_token } = req.user;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const buffer = Buffer.from(`${clientId}:${clientSecret}`);
    const secretIdBase64 = buffer.toString("base64");

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refresh_token);

    axios
      .post(`${SPOTIFY_REFRESH_URL}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${secretIdBase64}`,
        },
      })
      .then((response) => {
        knex("users")
          .update({ access_token: response.data.access_token })
          .where({ spotify_id: req.user.spotify_id })
          .then(() => {
            res.json(response.data);
          })
          .catch((err) => {
            return err;
          });
      });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  delete req.session;
  res.redirect(CLIENT_URL);
});

module.exports = router;
