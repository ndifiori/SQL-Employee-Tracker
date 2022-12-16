
// let's import inquirer and use destructuring to store it
import inquirer from 'inquirer';
const { prompt } = inquirer;


// we are gong to create a function that will create prompts for the user
  // then it will take their answers where we will them in choice = anwers.choice 
// our swith statement will say if our choice variable matches this case then run that function and break 
function createPrompts() { 
    prompt([
      {
        type: 'checkbox',
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
              name: 'Add Employee',
              value: 'ADD_EMPLOYEE'
            },
            {
              name: 'Add Manager',
              value: 'ADD_MANAGER'
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
              name: 'Update Employee Role',
              value: 'UPDATE_EMPLOYEE_ROLE'
            },
            {
              name: 'Update Employee Manager',
              value: 'UPDATE_EMPLOYEE_MANAGER'
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
        case 'ADD_EMPLOYEE':
          addEmployee();
          break;
        case 'ADD_MANAGER':
          addManager();
          break;
        case 'ADD_ROLE':
          addRole();
          break;
        case 'ADD_DEPARTMENT':
          addDepartment();
          break;
        case 'UPDATE_EMPLOYEE_ROLE':
          updateEmployeeRole();
          break;
        case 'UPDATE_EMPLOYEE_MANAGER':
          updateEmployeeMangager();
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
        case 'QUIT':
          quit();
          break;       
      }
    })
}

// TODO: finish writing 16 functions here

function viewEmployees() {

};

function viewEmployeesByManager() {

};

function viewEmployeesByDepartment() {

};

function viewRoles() {
  
};

function viewDepartments() {

};

function viewUtilizedBudgetByDepartment() {

};

function addEmployee() {

};

function addManager() {

};

function addRole() {

};

function addDepartment() {

};

function updateEmployeeRole() {

};

function updateEmployeeMangager() {

};

function removeEmployee() {

};

function removeRole() {

};

function removeDepartment() {

};


 // the process.exit method ends the process 
function quit() {
  console.log('Finished. Have a good day!');
  process.exit();
};

createPrompts();
