var express = require('express');
var router = express.Router();
const Port = require('../controllers/port');

/* GET users listing. */
router.route('/')
  .get(Port.get)
  .post(Port.create)

router.route('/:id')
  .get(Port.getById)
  .patch(Port.update)

module.exports = router;
