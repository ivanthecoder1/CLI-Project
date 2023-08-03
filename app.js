// Creating a read me generator 

// Need to get user prompt on the project title, description, technologies used, and an image

// Packages needed: inquier for 

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import fs from 'fs';


const resolveAnimations = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function start() {
    //welcome msg
    const welcomeMsg = chalkAnimation.rainbow(`Readme.md Generator \n`);
    //call helper
    await resolveAnimations();
    //stop the animation
    welcomeMsg.stop();

    // Instructions
    console.log(`
    ${chalk.blue('Instructions')}
    Input information about your project (Title, Description, Technologies, Etc)
    Then a README.md will be generated based on your input}
    `);
};

const questions = [
    // Add error handling if users don't write anything, basically reprompt them
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project: ',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a short description of your project: ',
    },
    {
        type: 'input',
        name: 'technologies',
        message: 'Enter all the technologies that you used: ',
    },
    // // I want to make this optional
    // {
    //     type: 'input',
    //     name: 'image',
    //     message: 'Enter the image url if you have any: ',
    // },

];

// Generate the read me file using the inputs
const generateReadme = (answers) => {
    const { title, description, technologies } = answers;

    return `# ${title}
  
  ## Description
  ${description}
  
  ## Technologies
  ${technologies}
  
  `;
};

async function main() {
    await start();
    inquirer.prompt(questions).then((answers) => {
        const readmeContent = generateReadme(answers);
        fs.writeFileSync('README.md', readmeContent, 'utf8');
        console.log('README.md successfully generated!');
    });
}

main()

