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
        console.log("Add Department was selected");
    }
    if (answers.displayOptions === "Add Role"){
        console.log("Add Role was selected");
    }
    if (answers.displayOptions === "Add Employee"){
        console.log("Add Employee was selected");
    }
    if (answers.displayOptions === "Update Employee Role"){
        console.log("Update Employee Role was selected");
    }
  })
};

// //engineer prompt questions built into a function
// function promptEngineer(){
//   return inquirer.prompt([
// {
//       type: "input",
//       name: "engName",
//       message: "What is the engineer's name?"
//     },
//     {
//       type: "input",
//       name: "engID",
//       message: "What is the team engineer's employee ID?"
//     },
//     {
//       type: "input",
//       name: "engEmail",
//       message: "What is the engineer's email address?"
//     },
//     {
//       type: "input",
//       name: "engGit",
//       message: "What is the engineer's github username?"
//     },
//   ])
//   .then((answers) => {
//     const engineer = new Engineer(answers.engName, answers.engID, answers.engEmail, answers.engGit);
//     employeeArray.push(engineer);
//     console.log("welcome to the team, engineer");
//     promptContinue();
//   })
// };

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
