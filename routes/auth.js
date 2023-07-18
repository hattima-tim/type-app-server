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

module.exports = router;
