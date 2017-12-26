const { pool } = require('../config/db');
const Port = require('../models/port');

exports.update = async (req, res) => {
  try {
    let port = await Port.getById(pool, req.params.id);
    if (!port) return res.status(404).send({ msg: "not found" });
    let toUpdate = new Port(port);
    toUpdate.name = req.body.name;
    let updated = await toUpdate.save(pool);
    return res.status(200).send({ status: 'ok', updated });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.get = async (req, res) => {
  try {
    let result;
    if(req.query.include == 'country') result = await Port.getIncludeCountries(pool);
    else result = await Port.get(pool);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Port.getById(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newPort = new Port(req.body);
    let result = await Port.create(pool, newPort);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
