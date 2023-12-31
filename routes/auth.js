const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

router.post("/sign-up", async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await prisma.users.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        wpm: 0,
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
