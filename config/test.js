const pg = require('knex')({ client: 'pg' });
const { pool } = require('../config/db');

const table = 'cgl_country';
const foreignTable = 'cgl_port';
// left join tipo include
let query1 = async () => {
  try {
    let query = pg(table)
      .leftJoin(foreignTable, `${table}.id`, `${foreignTable}.countryId`)
      .groupBy(`${table}.id`)
      .select(`${table}.*`, pg.raw(`json_agg(${foreignTable}.*) as ports`)).toString();
    console.log(query);
    let result = await pool.query(query);
    console.log(result.rows);
  } catch (error) {
    console.log(error);
  }
};

let query2 = async () => {
  try {
    let query = pg(foreignTable)
      .join(table, `${foreignTable}.countryId`, `${table}.id`)
      .select(`${foreignTable}.*`, pg.raw(`to_json(${table}.*) as country`)).toString();
    console.log(query);
    let result = await pool.query(query);
    console.log(result.rows);
  } catch (error) {
    console.log(error);
  }
}

query2();