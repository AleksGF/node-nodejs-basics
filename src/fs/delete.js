import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const remove = async () => {
  const folderName = 'files';
  const fileName = 'fileToRemove.txt';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, folderName, fileName);

  try {
    await fsPromises.rm(srcPath);
    console.log('File removed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await remove();
