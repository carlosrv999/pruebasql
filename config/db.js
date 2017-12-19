const { Pool } = require('pg')

const pool = new Pool({
  user: 'prueba',
  host: 'localhost',
  database: 'prueba',
  password: 'prueba',
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