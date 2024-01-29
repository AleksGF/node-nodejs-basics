import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const create = async () => {
  const distFolder = 'files';
  const fileName = 'fresh.txt';
  const content = 'I am fresh and young';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathToFile = path.join(__dirname, distFolder, fileName);

  try {
    await fsPromises.writeFile(pathToFile, content, { flag: 'wx' });
    console.log('File created');
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await create();
