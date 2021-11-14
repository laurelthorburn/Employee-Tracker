//dependencies 

const inquirer = require('inquirer');
const mysql = require('mysql2');
const figlet = require("figlet"); // text ary

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

//word art
figlet.text(
  `Employee Tracker
  by: Laurel Thorburn`, function (err, data){
  console.log(data)

  //begin function with manager questions
promptOptions()

 });


//manager questions built into a function
function promptOptions() {

  return inquirer.prompt([
    {
        type: "list",
        name: "displayOptions",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "View Employees by Manager", "View Employees by Department", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Update Employee's Manager", "Delete Department", "Delete Role", "Delete Employee", "View Department Budget"]
    }
  ])
 
  .then((answers) => {
 
      // console.log(answers); //{ displayOptions: 'Add Department' }
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
    if (answers.displayOptions === "View Employees by Manager"){
        viewEmployeesByManager();
        // console.log("View All Employees was selected");
    }
    if (answers.displayOptions === "View Employees by Department"){
        viewEmployeesByDepartment();
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
    if (answers.displayOptions === "Update Employee's Manager"){
        updateManager();
    }
    if (answers.displayOptions === "Delete Department"){
        deleteDepartment();
    }
    if (answers.displayOptions === "Delete Role"){
        deleteRole();
    }
    if (answers.displayOptions === "Delete Employee"){
        deleteEmployee();
    }
    if (answers.displayOptions === "View Department Budget"){
        viewBudget();
    }
  })
};

// ---------------------------------------- ADDING DEPARTMENT/ROLE/EMPLOYEE -----------------------------------------
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
    // console.log(answer.departmentName);
    db.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, results) { // working, the placeholder needed to be in ()
    })
    // console.log("Added " + answers.departmentName + " to departments"); //works
    promptOptions();
  })
};

//Add a Role Prompts and need to add to database once entered -- change to choices?
function addRole(){

  //add department list here
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    let departmentArray = [];
  results.forEach(result => departmentArray.push({name: result.name, value: result.id}));
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
      type: "list",
      name: "roleDepartment",
      message: "What department is the role in?",
      choices: departmentArray
    },

  ])
  .then((answers) => {
    //add to database here
    // console.log(answers.roleName); //works
    // console.log(answers.roleSalary); //works
    // console.log(answers.roleDepartment); //works
    //need to add to the database

    db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleName, answers.roleSalary, answers.roleDepartment], function (err, results) { // working, the placeholder needed to be in ()
      console.log(err);
    })
    promptOptions();
  })
})
};

//Add a Employee Prompts and need to add to database once entered
function addEmployee(){
  //add list for role and then manager
  
  //add role list here
  db.query('SELECT * FROM employeetracker_db.role;', function (err, results) {
    let roleArray = [];
  results.forEach(result => roleArray.push({name: result.title, value: result.id}));
  // console.log(roleArray);
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
      type: "list",
      name: "employeeRole",
      message: "What is the employee's role?",
      choices: roleArray
    },
  ])
  .then((answers) => {
    // console.log("BLAH: " + answers.employeeRole); // i work
    //add to the database
    let newFirstName = answers.employeeFirstName;
    let newLastName = answers.employeeLastName;
    let newEmployeeRole = answers.employeeRole; 
    // console.log(newEmployeeRole); //works

    db.query('SELECT * FROM employeetracker_db.employee;', function (err, results) {
      let employeeNameArray = [];
    results.forEach(result => employeeNameArray.push({name: result.first_name + ' ' + result.last_name, value: result.id}));

    return inquirer.prompt([
      {
        type: "list",
        name: "employeeManager",
        message: "Who is the employee's manager?",
        choices: employeeNameArray
      },
    ])
    .then((answers) => {
    let managerOptions = answers.employeeManager;
    // console.log(newEmployeeRole); //works
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [newFirstName, newLastName, newEmployeeRole, managerOptions], function (err, results) { // working, the placeholder needed to be in ()
      // console.table(results);
      console.log(err);
    })
    promptOptions();
  })
})})})
};

// --------------------------------------- VIEWING DEPARTMENT/ROLE/EMPLOYEE -----------------------------------------
function viewDepartments(){
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    console.table(results);
    promptOptions();
  });

    // console.log("You are viewing all of the departments :)");
};

function viewEmployees(){

  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, results) {
    console.table(results);
    promptOptions();

    // console.log("You are viewing all of the employees :)");
})
};

function viewRoles(){
    // console.log("You are viewing all of the roles :)");

    db.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", function (err, results) {
      console.table(results);
      if(err){
        console.log(err);
      };
      promptOptions();
    })
};

function viewEmployeesByManager(){
  db.query('SELECT * FROM employeetracker_db.employee WHERE manager_id IS NULL;', function (err, results) {
    let managerNameArray = [];
    results.forEach(result => managerNameArray.push({name: result.first_name + ' ' + result.last_name, value: result.id}));
    // console.log(managerNameArray)
    return inquirer.prompt([
      {
        type: "list",
        name: "managerNames",
        message: "Which employee would you like to change managers?",
        choices: managerNameArray
      },
          
   ])
  .then((answer) => {
   let manager = answer.managerNames;
   db.query('SELECT CONCAT(first_name, " ", last_name) AS employees FROM employee WHERE manager_id = ?', [manager], function (err, results) {
   console.table(results);
    promptOptions();
     })
})
})
};

function viewEmployeesByDepartment(){
  db.query('SELECT * FROM department', function (err, results) {
    let departmentNameArray = [];
    results.forEach(result => departmentNameArray.push({name: result.name, value: result.id}));
    // console.log(departmentNameArray)
    return inquirer.prompt([
      {
        type: "list",
        name: "departmentNames",
        message: "Which department employees would you like to view?",
        choices: departmentNameArray
      },
          
   ])
  .then((answer) => {
   let department = answer.departmentNames;
  //  console.log(department)
   db.query('SELECT CONCAT(first_name, " ", last_name) AS employees FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?', [department], function (err, results) {
   console.table(results);
    promptOptions();
     })
})
})
};

// --------------------------------------- UPDATING EMPLOYEE -----------------------------------------
function updateEmployee(){
  db.query('SELECT * FROM employeetracker_db.employee;', function (err, results) {
    let employeeNameArray = [];
  results.forEach(result => employeeNameArray.push({name: result.first_name + ' ' + result.last_name, value: result.id})); //name value is special keyword in obj. for inquirer, same with value.  returns value
    return inquirer.prompt([
      {
        type: "list",
        name: "updateEmployee",
        message: "Which employee would you like to update?",
        choices: employeeNameArray
      },
      
    ])
    .then((answer) => {
    // console.log("Employee's ID: " + answer.updateEmployee); //logs employee's custom ID #
      let employeeID = answer.updateEmployee;
    db.query('SELECT * FROM employeetracker_db.role;', function (err, results) {
      // console.table(results); //logs role table, id is referencing roles
      let roleOptions = [];
    results.forEach(result => roleOptions.push({name: result.title, value: result.id}));

        return inquirer.prompt([
          {
            type: "list",
            name: "updateRole",
            message: "What is the employee's new role?",
            choices: roleOptions
          },
        ])
    .then((answer) => {
      let roleID = answer.updateRole; //roleID and employeeID
      // write employee update db.query with selected role value

      // UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
      db.query('UPDATE employeetracker_db.employee SET role_id = ? WHERE id = ?', [roleID, employeeID], function (err, results) {
        // console.log("Employee has been updated");
        // console.table(results);
        promptOptions();
      })
    })
})
})
})
};

function updateManager(){
  db.query('SELECT * FROM employeetracker_db.employee WHERE manager_id IS NOT NULL;', function (err, results) {
    let employeeNameArray = [];
  results.forEach(result => employeeNameArray.push({name: result.first_name + ' ' + result.last_name, value: result.id})); //name value is special keyword in obj. for inquirer, same with value.  returns value
    return inquirer.prompt([
      {
        type: "list",
        name: "updateEmployee",
        message: "Which employee would you like to change managers?",
        choices: employeeNameArray
      },
      
    ])
    .then((answer) => {
    // console.log("Employee's ID: " + answer.updateEmployee); //logs employee's custom ID #
      let employeeID = answer.updateEmployee;
      db.query('SELECT * FROM employeetracker_db.employee WHERE manager_id IS NULL;', function (err, results) {
        let managerNameArray = [];
      results.forEach(result => managerNameArray.push({name: result.first_name + ' ' + result.last_name, value: result.id})); //name value is special keyword in obj. for inquirer, same with value.  returns value
      // console.log(managerNameArray)
        return inquirer.prompt([
          {
            type: "list",
            name: "updateManager",
            message: "Who is the employee's new manager?",
            choices: managerNameArray
          },
          
        ])
      .then((answer) => {
        let manager = answer.updateManager;
        // console.log("Employee: " + employeeID + " Manager: " + manager); //employee works but manager was undefined
        db.query('UPDATE employeetracker_db.employee SET manager_id = ? WHERE id = ?', [manager, employeeID], function (err, results) {
          // console.log("Employee has been updated");
          // console.table(results);
          promptOptions();
        })
      })
  })
  })
  })
};

// --------------------------------------- DELETING -----------------------------------------
function deleteDepartment(){
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    // console.table(results); //logs role table, id is referencing roles
    let departmentOptions = [];
  results.forEach(result => departmentOptions.push({name: result.name, value: result.id}));

      return inquirer.prompt([
        {
          type: "list",
          name: "deleteDepartment",
          message: "Which department would you like to delete?",
          choices: departmentOptions
        },
      ])
  .then((answer) => {
    let departmentID = answer.deleteDepartment;
    // console.log(departmentID)
    db.query('DELETE FROM department WHERE id = ?', [departmentID], function (err, results) {
      promptOptions();
    })
  })
})};
function deleteRole(){
  db.query('SELECT * FROM employeetracker_db.role;', function (err, results) {
    // console.table(results); //logs role table, id is referencing roles
    let roleOptions = [];
  results.forEach(result => roleOptions.push({name: result.title, value: result.id}));

      return inquirer.prompt([
        {
          type: "list",
          name: "deleteRole",
          message: "Which role would you like to delete?",
          choices: roleOptions
        },
      ])
  .then((answer) => {
    let roleID = answer.deleteRole;
    // console.log(roleID)
    db.query('DELETE FROM role WHERE id = ?', [roleID], function (err, results) {
      promptOptions();
    })
  })
})};
function deleteEmployee(){
  db.query('SELECT * FROM employeetracker_db.employee;', function (err, results) {
    // console.table(results); //logs employee table, id is referencing employees
    let employeeOptions = [];
  results.forEach(result => employeeOptions.push({name: result.first_name + ' ' + result.last_name, value: result.id}));
// console.log(employeeOptions);
      return inquirer.prompt([
        {
          type: "list",
          name: "deleteEmployee",
          message: "Which employee would you like to fire/delete?",
          choices: employeeOptions
        },
      ])
  .then((answer) => {
    let employeeID = answer.deleteEmployee;
    // console.log(employeeID)
    db.query('DELETE FROM employee WHERE id = ?', [employeeID], function (err, results) {
      promptOptions();
    })
  })
})};

// --------------------------------------- BUDGET -----------------------------------------
function viewBudget(){
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    // console.table(results); //logs role table, id is referencing roles
    let departmentOptions = [];
  results.forEach(result => departmentOptions.push({name: result.name, value: result.id}));

      return inquirer.prompt([
        {
          type: "list",
          name: "viewDepartment",
          message: "Which department's budget would you like to view?",
          choices: departmentOptions
        },
      ])
  .then((answer) => {
    let departmentID = answer.viewDepartment;
    db.query('SELECT SUM(role.salary) AS department_budget from employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?', [departmentID], function (err, results) {
      console.table(results)
      promptOptions();
    })
  })
})};
