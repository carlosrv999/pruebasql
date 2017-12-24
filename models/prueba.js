const { client } = require('../config/db');
const pg = require('knex')({ client: 'pg' });

const tabla = 'prueba';

module.exports = class Prueba {
  constructor(obj) {
    this.id = obj.id ? obj.id : undefined;
    this.name = obj.name ? obj.name : undefined;
  };

  static create(client, obj) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).insert(obj).returning('*').toString();
        let results = await client.query(query);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  }

  static get(client) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).select().toString();
        let results = await client.query(query);
        resolve(results.rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getById(client, id) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).select().where('id', id).toString();
        let results = await client.query(query);
        if (results.rows.length > 0) resolve(results.rows[0]);
        else resolve(null);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getCursos(client, id_prueba) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).join('prueba_curso', `${tabla}.id`, `prueba_curso.id_prueba`)
          .join('curso', 'prueba_curso.id_curso', 'curso.id')
          .where(`${tabla}.id`, id_prueba)
          .select('curso.id', 'curso.name').toString();
        let results = await client.query(query);
        resolve(results.rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  static assignCurso(client, id, fk) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg('prueba_curso').insert({ id_curso: fk, id_prueba: id }).returning('*').toString();
        let results = await client.query(query);
        resolve(results.rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}