const Curso = require('../models/curso');

exports.save = async (req, res) => {
  try {
    console.log('entrar a save');
    let curso = await Curso.getById(req.params.id);
    console.log("buscado:", curso);
    if (!curso) return res.status(404).send({ msg: "not found" });
    let toUpdate = new Curso(curso);
    console.log("toUpdate", toUpdate);
    toUpdate.name = req.body.name;
    console.log("toUpdate 2", toUpdate);
    let updated = await toUpdate.save();
    console.log("updated:", updated);
    return res.status(200).send({ status: 'ok', updated });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.get = async (req, res) => {
  try {
    let result = await Curso.get();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Curso.getById(req.params.id);
    if (result.length > 0) return res.status(200).send(result[0]);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newCurso = new Curso(req.body);
    let result = await Curso.create(newCurso);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getPruebas = async (req, res) => {
  try {
    let cursos = await Curso.getPruebas(req.params.id);
    return res.status(200).send(cursos);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.assignPrueba = async (req, res) => {
  try {
    let assignResult = await Curso.assignPrueba(req.params.id, req.params.fk);
    return res.status(200).send(assignResult);
  } catch (error) {
    return res.status(500).send(error);
  }
}

