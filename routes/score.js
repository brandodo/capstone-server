const express = require("express");
const { postScore } = require("../controllers/scoreController");
const router = express.Router();

router.route("/").post(postScore);

module.exports = router;
