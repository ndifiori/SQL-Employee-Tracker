
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
    // we are going to use our connection and chain methods to it
    // our .promise method returns a promise that is resolved once all actions have ended 
    // our .query takes our SQL query input and returns our results as the output

  // in our query we are using a dot notation to get the data stored under the column names 
    // concat will join the two columns together
    // as renames the column
    // left join will join the columns from the table and matching the columns on the right table 
  
  // this will find all the employees 
    // we will then join that with the roles 
    // we will then join that with the department
    // will then join that with the manager

  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // here we are finding employees by manager by passing the manager id as the parameter
  findAllEmployeesByManager(managerId) {
    return this.connection.promise().query(
      'SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;', managerId)
  }

  // let's create a function to find all employees in a given department
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }
  
  // the ? in our query states select all employees except the one the user selected 
    // they can't be their own manager
  findAllPossibleManagers(employeeID) {
    return this.connection.promise().query(
      'SELECT id, first_name, last_name FROM employee where id != ?', employeeID );
  }

  // find departments and give id and name
  findAllDepartments() {
    return this.connection.promise().query(
      'SELECT department.id, department.name FROM department;');
  }

  // since we have a many to many relation (like above) using the dot notation will filter down the tables to access the data we want 
  
  // let's create a function that will return all the roles and join them with the department
  findAllRoles() {
    return this.connection.promise().query(
      'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;');
  }

  //  this will view all of the available departments and sum up their respective budgets
  viewDepartmentBudgets() {
    return this.connection.promise().query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }

  // let's create a function that takes in two parameters
    // the first parameter is our designated employee and the second is the new role id we want
  // using the set keyword to update our employee table
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      'UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }

  // let's create a function that will take in 2 parameters the emplpyee id and the manager id 
    // then we will use the set keyword again to update our employee table
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.promise().query(
      'UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);
  }

  // let's create function to allow us to add an employee into our employee table
  createEmployee(employee) {
    return this.connection.promise().query(
      'INSERT INTO employee SET ?', employee);
  }

  // let's create a function that will set our parameter into the role table
  createRole(role) {
    return this.connection.promise().query(
      'INSERT INTO role SET ?', role);
  }

  // let's create a function that that will create a new department and add it to our department table
  createDepartment(department) {
    return this.connection.promise().query(
      'INSERT INTO department SET ?', department);
  }

  // let's create a function that will remove the employee from our employee table where the id matches the parameter passed 
  removeEmployee(employeeId) {
    return this.connection.promise().query(
      'DELETE FROM employee WHERE id = ?', employeeId);
  }

  // let's create a function that will remove the role from our role table where the id matches
  removeRole(roleId) {
    return this.connection.promise().query(
      'DELETE FROM role WHERE id = ?', roleId);
  }

  // let's create a function to delete a department from the department table
  removeDepartment(departmentId) {
    return this.connection.promise().query(
      'DELETE FROM department WHERE id = ?', departmentId);
  }
}

// we need to export it to be able to use it in our main index js file
module. exports = new DB(connection);

