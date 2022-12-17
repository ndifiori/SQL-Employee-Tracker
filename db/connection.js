
// let's bring in mysql2
const mysql = require('mysql2');

// let's create our connection to our local database
const connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password: 'Hu3nt!ngton',
  database: 'employees',
});

connection.connect(function (err) {
  if (err) throw err;
});

// let's export our connection to use in our index js file in our db folder
module.exports = connection; 
