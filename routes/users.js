var express = require("express");
var router = express.Router();
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
module.exports = router;
