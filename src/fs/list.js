import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const list = async () => {
  const folderName = 'files';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, folderName);

  try {
    const list =await fsPromises.readdir(srcPath);
    console.log(list);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await list();
