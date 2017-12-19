const { pool } = require('../config/db');
const pg = require('knex')({client: 'pg'});

const tabla = 'curso';

exports.create = (curso) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg(tabla).insert(curso).returning('*').toString();
      let results = await pool.query(query);
      resolve(results)
    } catch (error) {
      reject(error);
    }
  });
}

exports.get = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg(tabla).select().toString();
      let results = await pool.query(query);
      resolve(results.rows);
    } catch (error) {
      reject(error);
    }
  });
}

exports.getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg(tabla).select().where('id', id).toString();
      let results = await pool.query(query);
      resolve(results.rows);
    } catch (error) {
      reject(error);
    }
  });
}

exports.getPruebas = (id_curso) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg(tabla).join('prueba_curso', `${tabla}.id`, `prueba_curso.id_curso`)
                    .join('prueba', 'prueba_curso.id_prueba', 'prueba.id')
                    .where(`${tabla}.id`, id_curso)
                    .select('prueba.id', 'prueba.name').toString();
      let results = await pool.query(query);
      resolve(results.rows);
    } catch (error) {
      reject(error);
    }
  });
}

exports.assignPrueba = (id, fk) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg('prueba_curso').insert({id_curso: id, id_prueba: fk}).returning('*').toString();
      let results = await pool.query(query);
      resolve(results.rows);
    } catch (error) {
      reject(error);
    }
  });
}

