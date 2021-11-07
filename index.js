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
    const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
    //want to push little manager storing in an mega array and then later will pull from the mega array to create the cards

    //pushing the manager into the mega array named employeeArray
    employeeArray.push(manager)
    console.log("welcome to the team, manager")
    promptContinue();

  })
// };

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

