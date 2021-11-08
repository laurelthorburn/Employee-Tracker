//enter all prompts here

const inquirer = require('inquirer');

// const employeeArray = [];

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
    //   console.log(answers); //{ displayOptions: 'Add Department' }
    if (answers.displayOptions === "View All Departments"){
        console.log("View All Departments was selected");
    }
    if (answers.displayOptions === "View All Roles"){
        console.log("View All Roles was selected");
    }
    if (answers.displayOptions === "View All Employees"){
        console.log("View All Employees was selected");
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
        console.log("Update Employee Role was selected");
    }
  })
};

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

// //intern prompt questions built into a function
// function promptIntern(){
//   return inquirer.prompt([
// {
//   type: "input",
//   name: "internName",
//   message: "What is the intern's name?"
// },
// {
//   type: "input",
//   name: "internID",
//   message: "What is the team intern's employee ID?"
// },
// {
//   type: "input",
//   name: "internEmail",
//   message: "What is the intern's email address?"
// },
// {
//   type: "input",
//   name: "school",
//   message: "What is the intern's school?"
// },
// ])
// .then((answers) => {
//   const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.school);
//   employeeArray.push(intern);
//   console.log("welcome to the team, intern");
//   promptContinue();
// })
// };

// // User choice path
// function promptContinue(){
//     return inquirer.prompt([
//     {
//       type: "list",
//       name: "job", 
//       choices: ["Engineer", "Intern", "Finish building my team."]
//     },
//   ])
//   .then((answers) => {
//     if(answers.job === "Engineer"){
//       promptEngineer();
//     } else if (answers.job === "Intern"){
//       promptIntern();
//     } else {
//       //calling file and then calling function w/in said file
//       generate.generateHTML(employeeArray);
//       console.log("Great job building your team!")
//     }
//   })
//   };
