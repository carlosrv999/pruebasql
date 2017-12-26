const pg = require('knex')({ client: 'pg' });

const tabla = 'table_name';

module.exports = class Tabla {
  constructor(obj) {
    this.id = obj && obj.id || undefined;
    this.name = obj && obj.name || undefined;
  };

  save(client) {
    return new Promise(async (resolve, reject) => {
      try {
        let updated = new Tabla(this);
        delete updated.id;
        let query = pg(tabla).where('id', this.id).update(updated).returning('*').toString();
        let result = await client.query(query);
        resolve(result.rows[0]);
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
        resolve(results.rows[0]);
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
}