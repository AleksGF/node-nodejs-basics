import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import readline from 'readline';

const write = async () => {
  const folderName = 'files';
  const fileName = 'fileToWrite.txt';
  const questionText = 'Write something for adding to file (enter "__exit" or press CTRL+C to close):\n';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.join(__dirname, folderName, fileName);

  try {
    const fh = await fsPromises.open(distPath, 'a');
    const ws = fh.createWriteStream();

    ws.write('>>> Write Stream Started at: ' + new Date().toLocaleString() + '\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const exit = () => {
      ws.write('<<< Write Stream Stopped at: ' + new Date().toLocaleString() + '\n' + '\n');
      rl.close();
      fh.close();
      process.exit(1);
    }

    if (process.platform === "win32") {
      rl.on("SIGINT", () => {
        process.emit("SIGINT");
      })
    }

    process.on('SIGINT', () => {
      exit();
    });

    const ask = (question) => {
      rl.question(question, (answer) => {
        if (answer === '__exit') exit();

        ws.write(answer + '\n');

        ask(question);
      });
    };

    ask(questionText);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await write();
