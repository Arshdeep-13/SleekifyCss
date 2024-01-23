// index.js
const fs = require('fs');
const { execSync } = require('child_process');

const installTailwindAndMaterialUi = () => {
  console.log('Installing Tailwind CSS locally...');
  execSync('npm install -D tailwindcss postcss autoprefixer');
  console.log('Tailwind CSS installed locally.');

  // Check if tailwindcss binary exists in local node_modules
  const isTailwindInstalled = fs.existsSync('./node_modules/.bin/tailwindcss');

  if (isTailwindInstalled) {
    console.log('Running npx tailwindcss init...');
    execSync('npx tailwindcss init -p');
    console.log('Tailwind CSS initialized successfully.');
  } else {
    console.error('Error: tailwindcss binary not found in local node_modules. Please check the installation.');
  }

  // Automatically create and configure tailwind.config.js
  configureTailwind();

  console.log('Installing Material Ui locally...');
  execSync('npm install @mui/material @emotion/react @emotion/styled');
  execSync('npm install @mui/icons-material');
  console.log('Material Ui installed locally.');
};

const configureTailwind = () => {
  const configContent = `
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      plugins: [],
    }`;

    const mainContent = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;`;

  fs.writeFileSync('tailwind.config.js', configContent);
  fs.writeFileSync('./src/index.css', mainContent, { flag: 'w' });

  console.log('tailwind.config.js, index.css created and configured.');
};

module.exports = installTailwindAndMaterialUi;
