const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/books", async function (req, res, next) {
  const allBooks = await prisma.books.findMany();

  res.json(allBooks);
});

router.get("/books/:id", async function (req, res, next) {
  const id = req.params.id;
  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  });

  res.json(book);
});

router.get("/books/:id/pages/:pageNumber", async function (req, res, next) {
  const id = req.params.id;
  const pageNumber = req.params.pageNumber;

  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  });

  const pageToReturn = book.pages[pageNumber];
  res.json(pageToReturn);
});

module.exports = router;
