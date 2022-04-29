const knex = require("knex")(require("../knexfile.js"));

exports.postScore = (req, res) => {
  if (
    !req.body.player_id ||
    !req.body.song ||
    !req.body.artist ||
    !req.body.score ||
    !req.body.max_combo
  ) {
    return res
      .status(400)
      .send("Player ID, Song, Artist, or Score information was not provided");
  }

  knex("scores")
    .insert(req.body)
    .then(() => {
      knex("scores")
        .where({ song: req.body.song, artist: req.body.artist })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
