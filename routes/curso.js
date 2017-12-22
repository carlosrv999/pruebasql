var express = require('express');
var router = express.Router();
const Curso = require('../controllers/curso');

/* GET users listing. */
router.route('/')
  .get(Curso.get)
  .post(Curso.create)

router.route('/:id')
  .get(Curso.getById)
  .patch(Curso.save)

router.route('/:id/pruebas')
  .get(Curso.getPruebas)

router.route('/:id/pruebas/rel/:fk')
  .put(Curso.assignPrueba)

module.exports = router;
