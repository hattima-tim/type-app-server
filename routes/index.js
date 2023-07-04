var express = require('express');
var router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/* GET home page. */
router.get('/books', async function(req, res, next) {
  const allBooks= await prisma.books.findMany()
  
  res.json(allBooks)
});

module.exports = router;
