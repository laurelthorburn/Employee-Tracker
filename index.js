//enter all prompts here

const inquirer = require('inquirer');
const mysql = require('mysql2');

// -----------------------------------
// const mysql = require('mysql2');
require('dotenv').config() //connecting our .env


// create the connection to database
const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employeetracker_db database.`)
  );

  db.connect( (err) => {
    if (err){
      throw error;
    }
  });


// ------------------------------------------


//begin function with manager questions
promptOptions()

//manager questions built into a function
function promptOptions() {

  return inquirer.prompt([
    {
        type: "list",
        name: "displayOptions",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
    }
  ])
 
  .then((answers) => {
 
      console.log(answers); //{ displayOptions: 'Add Department' }
    if (answers.displayOptions === "View All Departments"){
        viewDepartments();
        // console.log("View All Departments was selected");
    }
    if (answers.displayOptions === "View All Roles"){
        viewRoles();
        // console.log("View All Roles was selected");
    }
    if (answers.displayOptions === "View All Employees"){
        viewEmployees();
        // console.log("View All Employees was selected");
    }
    if (answers.displayOptions === "Add Department"){
        addDepartment();
        // console.log("Add Department was selected");
    }
    if (answers.displayOptions === "Add Role"){
        addRole();
        // console.log("Add Role was selected");
    }
    if (answers.displayOptions === "Add Employee"){
        addEmployee();
        // console.log("Add Employee was selected");
    }
    if (answers.displayOptions === "Update Employee Role"){
        updateEmployee();
        // console.log("Update Employee Role was selected");
    }
  })
};

// ------------------------------------------------------------------ ADDING DEPARTMENT/ROLE/EMPLOYEE -----------------------------------------
//Add a Department Prompts and need to add to database once entered
function addDepartment(){
  return inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the department?"
    },

  ])
  .then(function (answer) {
    //add to database here
    console.log(answer.departmentName);
    db.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, results) { // working, the placeholder needed to be in ()
    })
    // console.log("Added " + answers.departmentName + " to departments"); //works
    promptOptions();
  })
};

//Add a Role Prompts and need to add to database once entered -- change to choices?
function addRole(){
  return inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the name of the role?"
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary of the role?"
    },
    {
      type: "input",
      name: "roleDepartment",
      message: "What is the department of the role?"
    },

  ])
  .then((answers) => {
    //add to database here
    console.log(answers.roleName); //works
    console.log(answers.roleSalary); //works
    console.log(answers.roleDepartment); //works
    //need to add to the database

    db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleName, answers.roleSalary, answers.roleDepartment], function (err, results) { // working, the placeholder needed to be in ()
      console.log(err);
    })
    promptOptions();
  })
};

//Add a Employee Prompts and need to add to database once entered
function addEmployee(){
  return inquirer.prompt([
    {
      type: "input",
      name: "employeeFirstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "What is the employee's last name?"
    },
    {
      type: "input",
      name: "employeeRole",
      message: "What is the employee's role?"
    },
    {
      type: "input",
      name: "employeeManager",
      message: "Who is the employee's manager?"
    },

  ])
  .then((answers) => {
    //add to database here
    console.log(answers.employeeFirstName); //works
    console.log(answers.employeeLastName); //works
    console.log(answers.employeeRole); //works
    console.log(answers.employeeManager); //works
    //add to the database
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager], function (err, results) { // working, the placeholder needed to be in ()
      console.log(err);
    })
    promptOptions();
  })
};

// ------------------------------------------------------------------ VIEWING DEPARTMENT/ROLE/EMPLOYEE -----------------------------------------
function viewDepartments(){
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    console.table(results);
    promptOptions();
  });

    console.log("You are viewing all of the departments :)");
};

function viewEmployees(){

  db.query('SELECT * FROM employeetracker_db.employee;', function (err, results) {
    console.table(results);
    promptOptions();

    console.log("You are viewing all of the employees :)");
})
};

function viewRoles(){
    console.log("You are viewing all of the roles :)");

    db.query('SELECT * FROM employeetracker_db.role;', function (err, results) {
      console.table(results);
      promptOptions();
    })
};

// ------------------------------------------------------------------ UPDATING EMPLOYEE -----------------------------------------
function updateEmployee(){
  db.query('SELECT * FROM employeetracker_db.employee;', function (err, results) {
    let employeeNameArray = [];
  results.forEach(result => employeeNameArray.push({name: result.first_name + ' ' + result.last_name, value: result.id})); //look into map
    return inquirer.prompt([
      {
        type: "list",
        name: "updateEmployee",
        choices: employeeNameArray
      },
    ])
    .then((answer) => {

      // so now i need to get the employee's id based off the name selected and then i need to write an update that updates the role where the id = that employee's id
      //there is the LIKE operator
    console.log(answer.updateEmployee); // i display the name Robert Parsons
      db.query('SELECT * FROM employeetracker_db.employee WHERE first_name LIKE "%?%"', answer.updateEmployee, function (err, results) {
        // console.table(results);
    //     let roleArray = [];
    //     results.forEach(result => roleArray.push(result.title));
    //     return inquirer.prompt([
    //       {
    //         type: "list",
    //         name: "updateEmployee",
    //         choices: roleArray
    //       },
    //     ])
    // .then((answer) => {
    //   console.log("Employee has been updated")
    //   promptOptions();
    // })
})
})
})};