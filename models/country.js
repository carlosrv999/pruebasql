const pg = require('knex')({ client: 'pg' });

const tabla = 'cgl_country';

module.exports = class Country {
  constructor(obj) {
    this.id = obj && obj.id || undefined;
    this.code = obj && obj.code || undefined;
    this.name = obj && obj.name || undefined;
    this.status = obj && obj.status || undefined;
    this.description = obj && obj.description || undefined;
  };

  save(client) {
    return new Promise(async (resolve, reject) => {
      try {
        let updated = new Country(this);
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

  static getPorts(client, id) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = pg(tabla).join('cgl_port', `${tabla}.id`, 'cgl_port.countryId').select('cgl_port.*').where(`${tabla}.id`, id).toString();
        console.log(query);
        let results = await client.query(query);
        resolve(results.rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}