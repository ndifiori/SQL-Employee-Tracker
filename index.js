
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
function viewEmployeesByDepartment(){
  db.findAllDepartments().then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like to see employees for?",
          choices: departmentChoices
        }
      ]).then(res => db.findAllEmployeesByDepartment(res.departmentId)).then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        }).then(() => createPrompts())
    });
}
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

// let's write a function that follows the same logic as our view employees function
function viewDepartments(){
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    console.log("\n");
    console.table(departments);
  })
  .then(() => createPrompts());
}

// let's write a function that follows the same logic as our view employees function
function viewUtilizedBudgetByDepartment(){
  db.viewDepartmentBudgets()
  .then(([rows]) => {
    let departments = rows;
    console.log("\n");
    console.table(departments);
  })
  .then(() => createPrompts());
}


// let's create a function to update an employee's role
// this function will be similar to our viewemployeesbymanager fxn

// first we are going to run our query to find all employees
// next, let's pass that data as an array and save that as the variable employee
// next, we will create a variable called employee choices which will store our data with a map method which returns a new array
// in this map mehtod we are passing an object as a parameter and returning an object with template literals to access our resulted data from the first query we had in this function

// next, we will use inquirer to present the information that we stored in our employee choices constant
// then we chain a second part to this
// now we need to present the user with new roles choices

// we store our user result into a new variable called employeeid
// we are going to run our query to find all roles
// pass that result as an arrray in an arrow function
// create a new variable that will have a map method run on it to produce a new array

// after we will use inquirer again to ask the user questions based on our stored variable
// once, we have what role they want to assign we need to run our updateemployeerole query and pass in our employee id and role id to store
function updateEmployeeRole(){
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]).then(res => {
      let employeeId = res.employeeId;
      db.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: `${title}`,
          value: id
        }));
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
          }
        ]).then(res => db.updateEmployeeRole(employeeId, res.roleId)).then(() => console.log("Updated employee's role")).then(() => createPrompts())
      });
    });
  })
}

// this function will update our employee manager
// it will have the same logic as our updateEmployeeRole function
function updateEmployeeMangager(){
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices
      }
    ]).then(res => {
      let employeeId = res.employeeId
      db.findAllPossibleManagers(employeeId).then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
        prompt([
          {
            type: "list",
            name: "managerId",
            message:
            "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices
          }
        ]).then(res => db.updateEmployeeManager(employeeId, res.managerId)).then(() => console.log("Updated employee's manager")).then(() => createPrompts())
      })
    })
  })
}

// let's create a function that allows the user to add an employee
// we need to take into account that employees can have different roles

// let's start with an inquirer prompt
// we need to know the employees name
// then we will store the users results into variables to do later

// then we will access or db query to find all roles
// we run a map method on our results to display the results in our next inquirer where we ask the user what the employees role is

// then we will take our users answer and store it as variable BEFORE
// we run our next database query to find all employees 
// now, we will run another map method on our previous results 
// the unshift method will allow us to add values to the beginning of the array

// then we need to ask if the employee has a manager
// now, let's store the users result in a variable 
// and pass that variable into the create employee query

function addEmployee(){
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]).then(res => {
    let firstName = res.first_name;
    let lastName = res.last_name;
    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));
      prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
      }).then(res => {
        let roleId = res.roleId;
        db.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(({ id, first_name, last_name }) => ({name: `${first_name} ${last_name}`, value: id}));
          managerChoices.unshift({ name: "None", value: null });
          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices
          }).then(res => {
            let employee = {
              manager_id: res.managerId,
              role_id: roleId,
              first_name: firstName,
              last_name: lastName
            } 
            db.createEmployee(employee);}).then(() => console.log(`Added ${firstName} ${lastName} to the database`)).then(() => createPrompts())
          })
        })
      })
    })
  }
  
  // let's create a function to add a role
  // let's run the find department query 
  // again let's create a variable of the result that was stored in an array
  // now we need to ask the user what is the role they want to add along with it's assumed salary and what department the role will belong to
  // this is where we will use our variable we created at the beginning
  // then, we will we use those results and use our createrole query 
  function addRole(){
    db.findAllDepartments().then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt([
        {
          name: "title",
          message: "What is the name of the role?"
        },
        {
          name: "salary",
          message: "What is the salary of the role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: departmentChoices
        }
      ]).then(role => {
        db.createRole(role).then(() => console.log(`Added ${role.title} to the database`)).then(() => createPrompts())
      })
    })
  }
  
  // let's create our function to add a department to the company
  // we will use inquirer to ask for the department we want to create
  // then we will pass that result into our db createDepartment function with our result as our parameter
  function addDepartment(){
    prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ]).then(res => {
      let name = res;
      db.createDepartment(name).then(() => console.log(`Added ${name.name} to the database`)).then(() => createPrompts())
    })
  }

  // let's create a function to remove an employee
  // first we need to find all the employees 
  // then store the result into a variable and run an array map method which we will use for the inquirer prompt to ask the user questions
  // now we pass the user answers into the query removeemployee 
  function removeEmployee(){
    db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: employeeChoices
        }
      ]).then(res => db.removeEmployee(res.employeeId)).then(() => console.log("Removed employee from the database")).then(() => createPrompts())
    })
  }

  
  // let's add a function to remove roles 
  // this will follow the same logic as our remove employee funciton
  function removeRole(){
    db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));
      
      prompt([
        {
          type: "list",
          name: "roleId",
          message:
          "Which role do you want to remove? (Warning: This will also remove employees)",
          choices: roleChoices
        }
      ])
      .then(res => db.removeRole(res.roleId))
      .then(() => console.log("Removed role from the database"))
      .then(() => createPrompts())
    })
  }

// let's create a function to remove deparments
  // this will follow the same logic as our remove employee function as well
function removeDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt({
        type: "list",
        name: "departmentId",
        message:
          "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
        choices: departmentChoices
      })
        .then(res => db.removeDepartment(res.departmentId))
        .then(() => console.log(`Removed department from the database`))
        .then(() => createPrompts())
    })

}

//  the process.exit method ends the process 
function quit() {
  console.log('Finished. Have a good day!');
  process.exit();
}


