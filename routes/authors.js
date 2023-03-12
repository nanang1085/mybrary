const express = require('express');
const Author = require('../models/author');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('authors/index');
});

router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

router.post('/', (req, res) => {
  try {
    const _author = new Author({name: req.body.name});
    _author.save();
    res.send('ok')
  } catch (err) {
    res.send('error')
  }
});

module.exports = router;