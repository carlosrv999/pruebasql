const pg = require('knex')({ client: 'pg' });

const tabla = 'curso';

module.exports = class Curso {
  constructor(obj) {
    this.id = obj && obj.id || undefined;
    this.name = obj && obj.name || undefined;
  };

  save(client) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).where('id', this.id).update(this).returning('*').toString();
        let result = await client.query(query);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

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

  static getPruebas(client, id_curso) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).join('prueba_curso', `${tabla}.id`, `prueba_curso.id_curso`)
          .join('prueba', 'prueba_curso.id_prueba', 'prueba.id')
          .where(`${tabla}.id`, id_curso)
          .select('prueba.id', 'prueba.name').toString();
        let results = await client.query(query);
        resolve(results.rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  static assignPrueba(client, id, fk) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg('prueba_curso').insert({ id_curso: id, id_prueba: fk }).returning('*').toString();
        let results = await client.query(query);
        resolve(results.rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}