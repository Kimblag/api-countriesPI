var express = require('express');
const { getCountries, getCountryById } = require('../controllers/country.controller');
var router = express.Router();

router.get('/', getCountries);
router.get('/:id', getCountryById);

module.exports = router;