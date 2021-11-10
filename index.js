//enter all prompts here

const inquirer = require('inquirer');
const mysql = require('mysql2');
// const db = require('./db/config'); //jumps prompt

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
  .then((answers) => {
    //add to database here
    console.log(answers.departmentName); //works
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
    promptOptions();
  })
};

// ------------------------------------------------------------------ VIEWING DEPARTMENT/ROLE/EMPLOYEE -----------------------------------------
function viewDepartments(){
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    console.log(results);
    promptOptions();
  });

    console.log("You are viewing all of the departments :)");
};

function viewEmployees(){

  db.query('SELECT * FROM employeetracker_db.employee;', function (err, results) {
    console.log(results);
    promptOptions();

    console.log("You are viewing all of the employees :)");
})
};

function viewRoles(){
    console.log("You are viewing all of the roles :)");

    db.query('SELECT * FROM employeetracker_db.role;', function (err, results) {
      console.log(results);
      promptOptions();
    })
};

// ------------------------------------------------------------------ UPDATING EMPLOYEE -----------------------------------------
function updateEmployee(){
    console.log("You are updating employee,, please consider a pay increase O:-)");
};