const fs = require('fs');
const { execSync } = require('child_process');

const customScript = '<scrip src="https://cdn.tailwindcss.com"></script>';

const installVanillaJs = () => {
    console.log("Installing tailwindcss...");

    execSync('npm install -D tailwindcss');
    // Check if tailwindcss binary exists in local node_modules
    const isTailwindInstalled = fs.existsSync('./node_modules/.bin/tailwindcss');

    if (isTailwindInstalled) {
        console.log('Running npx tailwindcss init...');
        execSync('npx tailwindcss init -p');
        console.log('Tailwind CSS initialized successfully.');
    } else {
        console.error('Error: tailwindcss binary not found in local node_modules. Please check the installation.');
    }

    configureTailwind();
}

const configureTailwind = () => {
    const configContent = `
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          "./index.html",
          "./src/**/*.{html,js}"
        ],
        plugins: [],
      }`;
  
      const mainContent = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;`;

      const html =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            ${customScript}
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>this is me</h1>
        </body>
        </html>`;
  
    fs.writeFileSync('tailwind.config.js', configContent);
    fs.writeFileSync('./style.css', mainContent, { flag: 'w' });
    fs.writeFileSync('./index.html', html, { flag: 'w' });
  
    console.log('tailwind.config.js, style.css created and configured.');
  };

module.exports = installVanillaJs;
