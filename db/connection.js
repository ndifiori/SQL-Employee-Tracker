
// let's bring in mysql2
const mysql = require('mysql2');

// let's create our connection to our local database
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  // TODO: add password try to make it a different one
  password: ''
  database: 'employees'
});

connection.connect(function (error) {
  if (error) throw error;
});

// let's export our connection to use in our index js file in our db folder
module.exports = connection; 
