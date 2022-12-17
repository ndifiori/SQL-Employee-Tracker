
// let's import inquirer and use destructuring to store it
// import inquirer from 'inquirer';
const { prompt } = require('inquirer');

// let's bring in our db foler which has our connection file, our index file that has our functions that will allow us to search our database, our schema that will create our database, and the initial data for our database

// this will render a splash screen that is visually appealing to the users
const logo = require('asciiart-logo');

// let's bring in our database queries and connections
const db = require('./db');

// this will allow us to pass strings and array in to a console.table call that will then be formatted and printed on a new line
require('console.table');

// let's start our program that will display 
initialize();

// logo will be what our app displays when it runs aka our program name
// render is the method that writes out to the console
function initialize() {
  const logoText = logo({ name: 'Employee Tracker' }).render();
  console.log(logoText);
  createPrompts();
}

// we are gong to create a function that will create prompts for the user
  // then it will take their answers where we will them in choice = anwers.choice 
// our swith statement will say if our choice variable matches this case then run that function and break 
function createPrompts() { 
    prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            {
              name: 'View All Employees',
              value: 'VIEW_EMPLOYEES'
            },
            {
              name: 'View All Employees By Manager',
              value: 'VIEW_EMPLOYEES_BY_MANAGER'
            },
            {
              name: 'View All Employees By Department',
              value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
            },
            {
              name: 'View All Roles',
              value: 'VIEW_ROLES'
            },
            {
              name: 'View All Departments',
              value: 'VIEW_DEPARTMENTS'
            },
            {
              name: 'View Total Utilized Budget By Department',
              value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT'
            },
            {
              name: 'Update Employee Role',
              value: 'UPDATE_EMPLOYEE_ROLE'
            },
            {
              name: 'Update Employee Manager',
              value: 'UPDATE_EMPLOYEE_MANAGER'
            },
            {
              name: 'Add Employee',
              value: 'ADD_EMPLOYEE'
            },
            {
              name: 'Add Role',
              value: 'ADD_ROLE'
            },
            {
              name: 'Add Department',
              value: 'ADD_DEPARTMENT'
            },
            {
              name: 'Remove Employee',
              value: 'REMOVE_EMPLOYEE'
            },
            {
              name: 'Remove Role',
              value: 'REMOVE_ROLE'
            },
            {
              name: 'Remove Department',
              value: 'REMOVE_DEPARTMENT'
            },
            {
              name: 'Quit',
              value: 'QUIT'
            }
          ]
        }
      ]).then( answer => {
      let choice = answer.choice;
      switch (choice) {
        case 'VIEW_EMPLOYEES':
          viewEmployees();
          break;
        case 'VIEW_EMPLOYEES_BY_MANAGER':
          viewEmployeesByManager();
          break;
        case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
          viewEmployeesByDepartment();
          break;
        case 'VIEW_ROLES':
          viewRoles();
          break;
        case 'VIEW_DEPARTMENTS':
          viewDepartments();
          break;
        case 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT':
          viewUtilizedBudgetByDepartment();
          break;
        case 'UPDATE_EMPLOYEE_ROLE':
          updateEmployeeRole();
          break;
        case 'UPDATE_EMPLOYEE_MANAGER':
          updateEmployeeMangager();
          break;
        case 'ADD_EMPLOYEE':
          addEmployee();
          break;
        case 'ADD_ROLE':
          addRole();
          break;
        case 'ADD_DEPARTMENT':
          addDepartment();
          break;
        case 'REMOVE_EMPLOYEE':
          removeEmployee();
          break;
        case 'REMOVE_ROLE':
          removeRole();
          break;
        case 'REMOVE_DEPARTMENT':
          removeDepartment();
          break;
        default:
          quit();      
      }
    })
}

// let's create a function to render all employees
// have we run that we are going to chain a then statement to it where we pass our queried result as an array
//  reassign our results to  employee 
// then we will give a line break for visual purposes
// then we will print out the table with our data
function viewEmployees() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    console.log('\n');
    console.table(employees);
  }).then (() => createPrompts);
}

// let's create a function that will show what employees are under specific managers
// building on the process to our first function except this time
// we are creating a constant and we are going to use an array method called map that should return a new array
// we are going to use a function within our map method
// within this function we are passing an object as our parameter
// and we are going to return our parameters by using template literals to access the data we stored in our manager variable
// then we want to use inquirer to ask which employee they would like to see reports for 
// again, using the constant we created for the choices for inquirer
// then let us chain a resolve arrow function to use our database query that let's us find employees by manager
// then we can display the data
  // if the data doesn't pass our if check then log a message
function viewEmployeesByManager(){
  db.findAllEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({name: `${first_name} ${last_name}`,
    value: id}));
    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which manager would you like to see the employees working under them for?",
        choices: managerChoices
      }
    ]).then(res => db.findAllEmployeesByManager(res.managerId)).then(([rows]) => {
      let employees = rows;
      console.log("\n");
      if (employees.length === 0) {
        console.log("The selected manager has no direct employees working under them.");
      } else {
        console.table(employees);
      }
    }).then(() => createPrompts())
  });
}

// let's create a function that will show which employees work in a specific department
// we will follow the similar process as the viewemployeebymanager function


// TODO: FIX THIS FUNCTION
// function viewEmployeesByDepartment(){
//   db.findAllEmployeesByManager().then(([rows]) => {
//     let departments = rows;
//     const departmentChoices = departments.map(({ id, name }) => ({ name: name, value: id }));
    
//     prompt([
//       {
//         type: "list",
//         name: "departmentId",
//         message: "Which department would you like to see employees for?",
//         choices: departmentChoices
//       }
//     ]).then(res => db.findAllEmployeesByDepartment(res.departmentId)).then(([rows]) => {
//       let employees = rows;
//       console.log("\n");
//       console.table(employees);
//     }).then(() => createPrompts())
//   });
// }
// TODO: FIX ABOVE

// let's create a function to view the available roles 
// let's create this exactly like we did the view employees function
function viewRoles(){
  db.findAllRoles()
  .then(([rows]) => {
    let roles = rows;
    console.log("\n");
    console.table(roles);
  })
  .then(() => createPrompts());
}

function viewDepartments(){
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    console.log("\n");
    console.table(departments);
  })
  .then(() => createPrompts());
};

// TODO: finish writing functions here

// function viewUtilizedBudgetByDepartment();

// function updateEmployeeRole();

// function updateEmployeeMangager();

// function addEmployee();

// function addRole();

// function addDepartment();

// function removeEmployee();

// function removeRole();

// function removeDepartment();

//  the process.exit method ends the process 
function quit() {
  console.log('Finished. Have a good day!');
  process.exit();
};


