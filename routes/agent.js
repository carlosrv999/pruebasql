var express = require('express');
var router = express.Router();
const Agent = require('../controllers/agent');

/* GET users listing. */
router.route('/')
  .get(Agent.get)
  .post(Agent.create)

router.route('/:id')
  .get(Agent.getById)
  .patch(Agent.update)

module.exports = router;
