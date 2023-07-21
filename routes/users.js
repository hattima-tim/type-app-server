const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/leaderboard", async (req, res, next) => {
  const users = await prisma.users.findMany({
    select: {
      username: true,
      wpm: true,
    },
    orderBy: {
      wpm: "desc",
    },
  });

  res.json(users);
});

router.post("/user/wpm", async (req) => {
  if (req.user) {
    const userWpm = req.body.wpm;

    try {
      await prisma.users.update({
        where: {
          id: req.user.id,
        },
        data: {
          wpm: userWpm,
        },
      });
    } catch (err) {
      console.log(err);
    }

    prisma.$disconnect();
  }
});
module.exports = router;
