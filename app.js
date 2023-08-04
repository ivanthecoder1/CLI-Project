// Imports
import chalk from "chalk";
import inquirer from "inquirer"; // For user prompts
import chalkAnimation from "chalk-animation";
import fs from 'fs'; // Interact with file system


//helper to resolve animations
//ms = 2000 miliseconds, after 2 seconds, the promise will resolve
const resolveAnimations = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

// Displays welcome message and instructions
async function start() {
    // Welcome title
    const welcomeMsg = chalkAnimation.rainbow(`Readme.md Generator \n`);
    await resolveAnimations();
    welcomeMsg.stop();

    // Instructions
    console.log(`
    ${chalk.blue('Instructions')}
    Input information about your project (Title, Description, Technologies, Etc)
    Then a README.md will be generated based on your input}
    `);
};

// Question prompts to get information from user
const questions = [ // array of object, with each object representing a question, will be used with inqurier
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project: ',
        validate: (value) => { // Reprompt user if input is empty
            if (value.trim().length > 0) { // remove whitespace from input, and check that its not empty
                return true;
            } else {
                return 'Please enter a valid title.';
            }
        },
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a short description of your project: ',
        validate: (value) => {
            if (value.trim().length > 0) { 
                return true;
            } else {
                return 'Please enter a valid description.';
            }
        },
    },
    {
        type: 'input',
        name: 'technologies',
        message: 'Enter all the technologies that you used: ',
        validate: (value) => {
            if (value.trim().length > 0) {
                return true;
            } else {
                return 'Please enter at least one technology used.';
            }
        },
    },
    // Optional
    {
        type: 'input',
        name: 'image',
        message: 'Enter the image url (empty space if none): ',
    },
];

// Generate the read me file using the user's inputs
const generateReadme = (answers) => {
    const { title, description, technologies, image } = answers;

    // Readme.md format: customizable 
    return `# ${title}
    
## ${description}
  
#### Technologies used: ${technologies}
    
${image ? `<img src='${image}' alt='project image' />` : ''}
  `;
};

async function main() {
    try {
        await start(); // Prints title and instructions
        const answers = await inquirer.prompt(questions); // Get user input
        const readmeContent = generateReadme(answers); // Use the input above to create readme
        fs.writeFileSync('README.md', readmeContent, 'utf8'); // Write the readme to the readme.md file
        console.log('README.md successfully generated!');
    } catch (error) { // handle any error
        console.error('An error occurred:', error);
    }
}

main();

