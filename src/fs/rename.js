import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const rename = async () => {
  const folderName = 'files';
  const srcFileName = 'wrongFilename.txt';
  const distFileName = 'properFilename.md';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, folderName, srcFileName);
  const distPath = path.join(__dirname, folderName, distFileName);

  const isFileExist = async (filePath) => {
    try {
      await fsPromises.access(filePath);
    } catch (error) {
      return false;
    }

    return true;
  };

  try {
    const isDestFileExist = await isFileExist(distPath);
    if (isDestFileExist) {
      const err = new Error('Destination file already exists');
      err.code = 'ENOENT';
      throw err;
    }

    await fsPromises.rename(srcPath, distPath);
    console.log('File renamed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await rename();
