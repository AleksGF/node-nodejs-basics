import path from 'path';
import {fileURLToPath} from 'url';
import fsPromises from 'fs/promises';

const copy = async () => {
  const srcFolder = 'files';
  const distFolder = 'files_copy';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, srcFolder);
  const distPath = path.join(__dirname, distFolder);

  const copyFolder = async (srcPath, distPath) => {
    await fsPromises.mkdir(distPath);

    const files = await fsPromises.readdir(srcPath);

    for (const file of files) {
      const stats = await fsPromises.stat(`${srcPath}/${file}`);

      const srcFilePath = path.join(srcPath, file);
      const distFilePath = path.join(distPath, file);

      if (stats.isDirectory()) {
        await copyFolder(srcFilePath, distFilePath);
      } else {
        await fsPromises.copyFile(srcFilePath, distFilePath);
      }
    }
  };

  try {
    await copyFolder(srcPath, distPath);
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await copy();
