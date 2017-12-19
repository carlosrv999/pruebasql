const dsPrueba = require('../datasource/prueba');
const Prueba = require('../models/prueba');

exports.get = async (req, res) => {
  try {
    let result = await dsPrueba.get();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await dsPrueba.getById(req.params.id);
    if(result.length > 0) return res.status(200).send(result[0]);
    else return res.status(404).send({'msg': 'no encontrado'});
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newPrueba = new Prueba(req.body);
    let result = await dsPrueba.create(newPrueba);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getCursos = async (req, res) => {
  try {
    let cursos = await dsPrueba.getCursos(req.params.id);
    return res.status(200).send(cursos);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.assignCurso = async (req, res) => {
  try {
    let result = await dsPrueba.assignCurso(req.params.id, req.params.fk);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}