const { pool } = require('../config/db');
const Prueba = require('../models/prueba');

exports.get = async (req, res) => {
  try {
    let result = await Prueba.get(pool);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Prueba.getById(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newPrueba = new Prueba(req.body);
    let result = await Prueba.create(pool, newPrueba);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getCursos = async (req, res) => {
  try {
    let cursos = await Prueba.getCursos(pool, req.params.id);
    return res.status(200).send(cursos);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.assignCurso = async (req, res) => {
  try {
    let result = await Prueba.assignCurso(pool, req.params.id, req.params.fk);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}