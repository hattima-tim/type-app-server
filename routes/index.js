var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const {PrismaClient} = require('@prisma/client');
  const prisma = new PrismaClient();

  const allBooks= await prisma.books.findMany()
  
  res.json(allBooks)
});

module.exports = router;
