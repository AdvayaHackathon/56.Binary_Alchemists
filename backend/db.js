const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vr_player'
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = connection;
