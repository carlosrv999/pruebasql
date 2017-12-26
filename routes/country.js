var express = require('express');
var router = express.Router();
const Country = require('../controllers/country');

/* GET users listing. */
router.route('/')
  .get(Country.get)
  .post(Country.create)

router.route('/:id')
  .get(Country.getById)
  .patch(Country.update)

router.route('/:id/ports')
  .get(Country.getPorts)

module.exports = router;
