const { pool } = require('../config/db');
const Line = require('../models/line');

exports.update = async (req, res) => {
  try {
    let line = await Line.getById(pool, req.params.id);
    if (!line) return res.status(404).send({ msg: "not found" });
    let toUpdate = new Line(line);
    toUpdate.name = req.body.name;
    let updated = await toUpdate.save(pool);
    return res.status(200).send({ status: 'ok', updated });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.get = async (req, res) => {
  try {
    let result = await Line.get(pool);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Line.getById(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newLine = new Line(req.body);
    let result = await Line.create(pool, newLine);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
