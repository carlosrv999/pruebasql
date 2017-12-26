var express = require('express');
var router = express.Router();
const Line = require('../controllers/line');

/* GET users listing. */
router.route('/')
  .get(Line.get)
  .post(Line.create)

router.route('/:id')
  .get(Line.getById)
  .patch(Line.update)

module.exports = router;
