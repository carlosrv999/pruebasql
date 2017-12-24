const { pool } = require('../config/db');
const Curso = require('../models/curso');

exports.save = async (req, res) => {
  try {
    let curso = await Curso.getById(pool, req.params.id);
    if (!curso) return res.status(404).send({ msg: "not found" });
    let toUpdate = new Curso(curso);
    toUpdate.name = req.body.name;
    let updated = await toUpdate.save(pool);
    console.log("updated:", updated);
    return res.status(200).send({ status: 'ok', updated });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.get = async (req, res) => {
  try {
    let result = await Curso.get(pool);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Curso.getById(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newCurso = new Curso(req.body);
    let result = await Curso.create(pool, newCurso);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getPruebas = async (req, res) => {
  try {
    let cursos = await Curso.getPruebas(pool, req.params.id);
    return res.status(200).send(cursos);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.assignPrueba = async (req, res) => {
  try {
    let assignResult = await Curso.assignPrueba(pool, req.params.id, req.params.fk);
    return res.status(200).send(assignResult);
  } catch (error) {
    return res.status(500).send(error);
  }
}

