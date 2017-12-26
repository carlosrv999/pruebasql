const { Pool } = require('pg')

const pool = new Pool({
  user: 'dev_cgl',
  host: 'localhost',
  database: 'db_cgl',
  password: 'lt2M886a7bTAuEK',
  port: 5432,
});


module.exports = {
  testConnection: async (cb) => {
    try {
      let connection = await pool.connect();
      cb(null, pool);
    } catch (error) {
      cb(error);
    }
  },
  pool,
}