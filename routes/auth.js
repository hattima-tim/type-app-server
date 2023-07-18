var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const prisma = new PrismaClient();

router.post("/sign-up", async (req, res, next) => {
  try {
    await prisma.users.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });

    res.redirect("http://localhost:3001");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3001",
    failureRedirect: "http://localhost:3001/authentication/log-in",
  })
);

router.post("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.sendStatus(200);
  });
});

module.exports = router;
