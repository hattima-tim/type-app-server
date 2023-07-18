var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }

  res.json(null);
});

module.exports = router;
