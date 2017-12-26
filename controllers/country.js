const { pool } = require('../config/db');
const Country = require('../models/country');

exports.update = async (req, res) => {
  try {
    let country = await Country.getById(pool, req.params.id);
    if (!country) return res.status(404).send({ msg: "not found" });
    let toUpdate = new Country(country);
    toUpdate.name = req.body.name;
    let updated = await toUpdate.save(pool);
    return res.status(200).send({ status: 'ok', updated });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.get = async (req, res) => {
  try {
    let result = await Country.get(pool);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getById = async (req, res) => {
  try {
    let result = await Country.getById(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.getPorts = async (req, res) => {
  try {
    let country = await Country.getById(pool, req.params.id);
    if(!country) return res.status(404).send({ 'msg': 'no encontrado' });
    let result = await Country.getPorts(pool, req.params.id);
    if (result) return res.status(200).send(result);
    else return res.status(404).send({ 'msg': 'no encontrado' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    let newCountry = new Country(req.body);
    let result = await Country.create(pool, newCountry);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
