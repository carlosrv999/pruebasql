const { pool } = require('../config/db');
const pg = require('knex')({client: 'pg'});

const tabla = 'prueba';

exports.create = (prueba) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg(tabla).insert(prueba).returning('*').toString();
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

exports.getCursos = (id_prueba) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg(tabla).join('prueba_curso', `${tabla}.id`, `prueba_curso.id_prueba`)
                            .join('curso', 'prueba_curso.id_curso', 'curso.id')
                            .where(`${tabla}.id`, id_prueba)
                            .select('curso.id', 'curso.name').toString();
      let results = await pool.query(query);
      resolve(results.rows);
    } catch (error) {
      reject(error);
    }
  });
}

exports.assignCurso = (id, fk) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = pg('prueba_curso').insert({id_curso: fk, id_prueba: id}).returning('*').toString();
      let results = await pool.query(query);
      resolve(results.rows);
    } catch (error) {
      reject(error);
    }
  });
}