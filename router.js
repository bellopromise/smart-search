const express = require('express');
const SearchController = require('./controllers/search-controller');

const router = express.Router();

router.get('/search', (req, res) => SearchController.search(req, res));

module.exports = router;
