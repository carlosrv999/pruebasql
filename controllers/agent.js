const { pool } = require('../config/db');
const Agent = require('../models/agent');

exports.update = async (req, res) => {
  try {
    let agent = await Agent.getById(pool, req.params.id);
    if (!agent) return res.status(404).send({ msg: "not found" });
    let toUpdate = new Agent(agent);
    toUpdate.name = req.body.name;
    let updated = await toUpdate.save(pool);
    return res.status(200).send({ status: 'ok', updated });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.get = async (req, res) => {
  try {
    let result = await Agent.get(pool);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Agent.getById(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newAgent = new Agent(req.body);
    let result = await Agent.create(pool, newAgent);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
