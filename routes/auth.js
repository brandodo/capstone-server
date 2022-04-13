const express = require("express");
const router = express.Router();

const passport = require("passport");

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
    ],
    showDialog: true,
  })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: `${process.env.CLIENT_URL}/auth-fail`,
  }),
  (_req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/profile", (req, res) => {
  if (req.user === undefined)
    return res.status(401).json({ message: "Unauthorized" });

  res.status(200).json(req.user);
});

module.exports = router;
