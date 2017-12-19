var express = require('express');
var router = express.Router();
const Prueba = require('../controllers/prueba');

/* GET users listing. */
router.route('/')
  .get(Prueba.get)
  .post(Prueba.create)

router.route('/:id')
  .get(Prueba.getById)

router.route('/:id/cursos')
  .get(Prueba.getCursos)

router.route('/:id/cursos/rel/:fk')
  .put(Prueba.assignCurso)

module.exports = router;
