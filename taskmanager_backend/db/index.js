const { Pool } = require('pg');

const pool = new Pool({
  user: 'taskmanager_fnha_user', 
  host: 'dpg-ct69i2bqf0us738dg0s0-a',
  database: 'taskmanager_fnha',
  password: 'nN9w67XM5zi1lqoQcmH2tbgwGMvNbccW', 
  port: 5432,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database:', res.rows[0]);
  }
});

module.exports = { pool };
