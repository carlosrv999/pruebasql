const dsCurso = require('../datasource/curso');
const Curso = require('../models/curso');

exports.get = async (req, res) => {
  try {
    let result = await dsCurso.get();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await dsCurso.getById(req.params.id);
    if(result.length > 0) return res.status(200).send(result[0]);
    else return res.status(404).send({'msg': 'no encontrado'});
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newCurso = new Curso(req.body);
    let result = await dsCurso.create(newCurso);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getPruebas = async (req, res) => {
  try {
    let cursos = await dsCurso.getPruebas(req.params.id);
    return res.status(200).send(cursos);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.assignPrueba = async (req, res) => {
  try {
    let assignResult = await dsCurso.assignPrueba(req.params.id, req.params.fk);
    return res.status(200).send(assignResult);
  } catch (error) {
    return res.status(500).send(error);
  }
}

