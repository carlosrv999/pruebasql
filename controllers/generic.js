const { pool } = require('../config/db');
const Model = require('../models/instance');

exports.update = async (req, res) => {
  try {
    let instance = await Model.getById(pool, req.params.id);
    if (!instance) return res.status(404).send({ msg: "not found" });
    let toUpdate = new Model(instance);
    toUpdate.name = req.body.name;
    let updated = await toUpdate.save(pool);
    return res.status(200).send({ status: 'ok', updated });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.get = async (req, res) => {
  try {
    let result = await Model.get(pool);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Model.getById(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newModel = new Model(req.body);
    let result = await Model.create(pool, newModel);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
