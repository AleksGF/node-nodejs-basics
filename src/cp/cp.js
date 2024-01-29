import childProcess from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  const folderName = 'files';
  const fileName = 'script.js';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const scriptPath = path.join(__dirname, folderName, fileName);

  const child = childProcess.fork(scriptPath, args);

  child.on('close', (code) => {
    console.log(`\x1b[91mChild process exited with code ${code}\x1b[0m`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
