const { pool } = require('../config/db');
const pg = require('knex')({ client: 'pg' });

const tabla = 'curso';

module.exports = class Curso {
  constructor(obj) {
    console.log('constructor: ',obj);
    this.id = obj && obj.id || undefined;
    this.name = obj && obj.name || undefined;
  };

  save() {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).where('id', this.id).update(this).returning('*').toString();
        let result = await pool.query(query);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static create(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).insert(obj).returning('*').toString();
        let results = await pool.query(query);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  }

  static get() {
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

  static getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).select().where('id', id).toString();
        let results = await pool.query(query);
        resolve(results.rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getPruebas(id_curso) {
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

  static assignPrueba(id, fk) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg('prueba_curso').insert({ id_curso: id, id_prueba: fk }).returning('*').toString();
        let results = await pool.query(query);
        resolve(results.rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}