const { spawn } = require('child_process');
const fs = require('fs')

//this script can accept a --dev flag to run this in development mode
const args = process.argv.slice(2);

// build the client in the appropriate mode
const isDevMode = args.includes('--dev');
const webpackCommand = isDevMode ?
  './node_modules/.bin/webpack-dev-server' :
  './node_modules/.bin/webpack';
const buildWebpack = (!isDevMode && !fs.existsSync('/dist/bundle.js')) ||
  isDevMode;
startSocketServer();

if (buildWebpack){
  const webpackProcess = spawn(webpackCommand);
  webpackProcess.on('error', (err) => {
    console.error(`${err.message}`)
  })
  webpackProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  webpackProcess.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  webpackProcess.on('close', (code) => {
    if (code === 0){
      const outputString = isDevMode ?
        'webpack dev server loaded, listening on http:\/\/localhost:8080' :
        'webpack completed!'
    } else {
      console.error('webpack failed');
    }
  });
}

// start the server
function startSocketServer(){
  const serverProcess = spawn('./node_modules/.bin/babel-node', ['app/server/index.js']);
  serverProcess.on('error', (err) => {
    console.error(`${err.message}`)
  })
  serverProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
