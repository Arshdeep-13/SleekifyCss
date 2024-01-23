// index.js

const inquirer = require('inquirer');
const installTailwind = require('./tailwindcss/index')
const installTailwindAndMaterialUi = require("./tailwindcss + materialui/index")
const installVanillaJs = require("../SleekifyCSS/vanillaJs/index")

async function installPackage() {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'language',
        message: 'Which language do you want?',
        choices: ['Vanilla/JS', 'Vite+React', 'TailWind + MaterialUi']
    });

    switch (answer.language) {
        case 'Vanilla/JS':
            installVanillaJs();
            break;

        case 'Vite+React':
            installTailwind();
            break;

        case 'TailWind + MaterialUi':
            installTailwindAndMaterialUi();
            break;


        default:
            console.error('Invalid choice. Please choose a valid option.');
    }
}

module.exports = installPackage;
