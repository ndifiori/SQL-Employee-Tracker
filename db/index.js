
// here in our DB file 
// we have created our db in sql and created our connection to it in our connection.js file
// here we need to bring in our connection file

// now we need to create a class that we can grab functions off of
  // 1. we need to find all the information that the user wants from the database
  // 2. THEN in our index.js MAIN file we need to present this data

const connection = require('./connection');

class DB {

  // this will maintain and store our connection to our database to use in our later functions
  constructor(connection) {
    this.connection = connection;
  }

  // this will connect with the viewEmployees fxn
    // we are going to use our connectino and chain methods to it
    // our .promise method returns a promise that is resolved once all actions have ended 
    // our .query takes our SQL query input and returns our results as the output

  // in our query we are using a dot notation to get the column names from our employee table
    // concat will join the two columns together
    // as renames the column
    // left join will join the columns from the table and matching the columns on the right table

  findAllEmployees() {
    return this.connection.promise().query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, LEFT JOIN role on employee.role_id = role.id LEFT JOIN deparment on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
    );
  }

  // TODO: add the rest of the functions
  




}

